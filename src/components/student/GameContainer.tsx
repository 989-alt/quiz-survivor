import { useEffect, useRef, useState } from 'react';
import { usePhaser } from '../../hooks/usePhaser';
import { QuizOverlay } from './QuizOverlay';
import { UpgradeSelect } from './UpgradeSelect';
import { GameHUD } from './GameHUD';
import { MobileControls } from './MobileControls';
import { PostGameOverlay } from './PostGameOverlay';
import { useQuizStore } from '../../stores/quizStore';
import { EventBus, GameEvents } from '../../game/utils/EventBus';
import type { Grade, Semester } from '../../data/units';

interface GameContainerProps {
  unitId: string;
  nickname: string;
  grade: Grade;
  semester: Semester;
  onExit: () => void;
  onShowLeaderboard: () => void;
}

export function GameContainer({
  unitId,
  nickname,
  grade,
  semester,
  onExit,
  onShowLeaderboard,
}: GameContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnsweredCorrectly, setQuizAnsweredCorrectly] = useState<boolean | null>(null);
  const [filteredUpgrades, setFilteredUpgrades] = useState<any[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const {
    isReady,
    levelUpData,
    finishData,
    selectUpgrade,
    pauseGame,
    resumeGame,
    restartGame,
    sendJoystickInput,
  } = usePhaser('game-container', {
    isSolo: true,
    playerName: nickname,
  });

  const { loadUnitQuizzes, getCurrentQuiz, submitAnswer, nextQuiz } = useQuizStore();

  useEffect(() => {
    loadUnitQuizzes(unitId);
  }, [unitId, loadUnitQuizzes]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (levelUpData) {
      const quiz = getCurrentQuiz();
      if (quiz) {
        setShowQuiz(true);
        setQuizAnsweredCorrectly(null);
        pauseGame();
      } else {
        setFilteredUpgrades(levelUpData.upgrades);
        setQuizAnsweredCorrectly(true);
        EventBus.emit(GameEvents.QUIZ_RESULT, { correct: true });
      }
    }
  }, [levelUpData]);

  const handleQuizAnswer = (selectedIndex: number, isCorrect: boolean) => {
    submitAnswer(selectedIndex, 0);
    setShowQuiz(false);
    setQuizAnsweredCorrectly(isCorrect);
    nextQuiz();

    if (levelUpData) {
      if (isCorrect) {
        // 정답: 업그레이드 선택 UI 표시
        setFilteredUpgrades(levelUpData.upgrades);
        EventBus.emit(GameEvents.QUIZ_RESULT, { correct: true });
      } else {
        // 오답: 레벨업 취소. 게임 재개·다음 퀴즈는 GameScene이 책임짐
        setFilteredUpgrades([]);
        EventBus.emit(GameEvents.QUIZ_RESULT, { correct: false });
      }
    }
  };

  const handleUpgradeSelect = (type: string, id: string) => {
    selectUpgrade(type, id);
    setFilteredUpgrades([]);
    setQuizAnsweredCorrectly(null);
  };

  const handleRestart = () => {
    // React state 모두 초기화
    setShowQuiz(false);
    setFilteredUpgrades([]);
    setQuizAnsweredCorrectly(null);
    // 퀴즈 풀 다시 로드 (셔플)
    loadUnitQuizzes(unitId);
    // GameScene 리셋 트리거
    restartGame();
  };

  const handleJoystickMove = (x: number, y: number) => sendJoystickInput(x, y);

  const showUpgradeSelect = levelUpData && !showQuiz && filteredUpgrades.length > 0;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', background: '#0a0a0f', overflow: 'hidden' }}>
      <div
        id="game-container"
        ref={containerRef}
        tabIndex={0}
        style={{ width: '100%', height: '100%', outline: 'none' }}
        onMouseDown={(e) => e.currentTarget.focus()}
      />

      {isReady && !finishData && <GameHUD />}

      {isMobile && isReady && !levelUpData && !showQuiz && !finishData && (
        <MobileControls onMove={handleJoystickMove} />
      )}

      {showQuiz && getCurrentQuiz() && (
        <QuizOverlay quiz={getCurrentQuiz()!} timeLimit={15} onAnswer={handleQuizAnswer} />
      )}

      {showUpgradeSelect && !finishData && (
        <UpgradeSelect
          upgrades={filteredUpgrades.map((u: any) => ({
            ...u,
            name: u.nameKo || u.name,
            description: u.descriptionKo || u.description,
            icon: u.icon || '⚡',
          }))}
          onSelect={handleUpgradeSelect}
          quizResult={quizAnsweredCorrectly}
        />
      )}

      {finishData && (
        <PostGameOverlay
          unitId={unitId}
          nickname={nickname}
          grade={grade}
          semester={semester}
          finish={finishData}
          onRestart={handleRestart}
          onExit={onExit}
          onShowLeaderboard={onShowLeaderboard}
        />
      )}

      {!isReady && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0a0a0f',
            gap: 24,
          }}
        >
          <div className="dot-spinner">
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
          </div>
          <div style={{ color: '#71717a', fontSize: 14, fontWeight: 500 }}>게임 로딩 중...</div>
        </div>
      )}
    </div>
  );
}
