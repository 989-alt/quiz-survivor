import { useState, useCallback } from 'react';
import { Timer } from '../shared/Timer';
import type { Quiz } from '../../types/quiz';

interface QuizOverlayProps {
  quiz: Quiz;
  timeLimit: number;
  onAnswer: (index: number, isCorrect: boolean) => void;
}

export function QuizOverlay({ quiz, timeLimit, onAnswer }: QuizOverlayProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const optionLabels = ['A', 'B', 'C', 'D'];
  const optionColors = ['#f43f5e', '#6366f1', '#f59e0b', '#10b981'];

  const handleSelect = useCallback((index: number) => {
    if (isAnswered) return;
    setSelectedIndex(index);
    setIsAnswered(true);
    setShowResult(true);

    setTimeout(() => {
      onAnswer(index, index === quiz.correctIndex);
    }, 2000);
  }, [isAnswered, quiz.correctIndex, onAnswer]);

  const handleTimeUp = useCallback(() => {
    if (!isAnswered) {
      setIsAnswered(true);
      setShowResult(true);
      setTimeout(() => onAnswer(-1, false), 2000);
    }
  }, [isAnswered, onAnswer]);

  const getOptionStyle = (index: number): React.CSSProperties => {
    if (!isAnswered) {
      return {
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
      };
    }
    if (index === quiz.correctIndex) {
      return {
        background: 'rgba(16, 185, 129, 0.15)',
        border: '1px solid rgba(16, 185, 129, 0.5)',
        boxShadow: '0 0 24px rgba(16, 185, 129, 0.2)',
      };
    }
    if (index === selectedIndex) {
      return {
        background: 'rgba(244, 63, 94, 0.15)',
        border: '1px solid rgba(244, 63, 94, 0.5)',
      };
    }
    return {
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.04)',
      opacity: 0.4,
    };
  };

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(10, 10, 15, 0.9)',
      backdropFilter: 'blur(8px)',
      zIndex: 50,
      padding: 'clamp(16px, 4vw, 48px)',
    }}>
      <div
        className="animate-scale-in"
        style={{
          width: '100%',
          maxWidth: 'clamp(380px, 55vw, 720px)',
        }}
      >
        {/* Timer */}
        <div style={{ marginBottom: 'clamp(16px, 2.5vw, 28px)' }}>
          <Timer duration={timeLimit} onComplete={handleTimeUp} isRunning={!isAnswered} size="md" />
        </div>

        {/* Question */}
        <div
          className="glass-panel"
          style={{
            padding: 'clamp(20px, 3vw, 32px)',
            marginBottom: 'clamp(16px, 2.5vw, 28px)',
          }}
        >
          <h2 style={{
            fontSize: 'clamp(14px, 1.6vw, 20px)',
            fontWeight: 600,
            color: '#fafafa',
            lineHeight: 1.7,
          }}>
            {quiz.question}
          </h2>
        </div>

        {/* Options */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
          {quiz.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={isAnswered}
              style={{
                ...getOptionStyle(index),
                padding: 'clamp(14px, 2vw, 22px) clamp(18px, 2.5vw, 28px)',
                borderRadius: 14,
                textAlign: 'left',
                cursor: isAnswered ? 'not-allowed' : 'pointer',
                transition: 'all 0.25s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              {/* Option dot indicator */}
              <div style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: `${optionColors[index]}20`,
                border: `2px solid ${optionColors[index]}50`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: optionColors[index],
                }}>
                  {optionLabels[index]}
                </span>
              </div>
              <span style={{
                fontSize: 'clamp(13px, 1.3vw, 16px)',
                fontWeight: 500,
                color: '#e4e4e7',
              }}>
                {option}
              </span>
            </button>
          ))}
        </div>

        {/* Result */}
        {showResult && (
          <div
            className="animate-slide-up"
            style={{
              marginTop: 'clamp(16px, 2.5vw, 28px)',
              padding: 'clamp(16px, 2vw, 24px)',
              borderRadius: 16,
              textAlign: 'center',
              background: selectedIndex === quiz.correctIndex
                ? 'rgba(16, 185, 129, 0.1)'
                : 'rgba(244, 63, 94, 0.1)',
              border: `1px solid ${selectedIndex === quiz.correctIndex
                ? 'rgba(16, 185, 129, 0.3)'
                : 'rgba(244, 63, 94, 0.3)'}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: selectedIndex === quiz.correctIndex ? '#10b981' : '#f43f5e',
              }} />
              <p style={{
                fontSize: 'clamp(16px, 2vw, 24px)',
                fontWeight: 700,
                color: selectedIndex === quiz.correctIndex ? '#6ee7b7' : '#fda4af',
              }}>
                {selectedIndex === quiz.correctIndex ? '정답입니다!' : '오답입니다'}
              </p>
            </div>
            {quiz.explanation && (
              <p style={{
                fontSize: 'clamp(12px, 1vw, 14px)',
                color: '#a1a1aa',
                lineHeight: 1.7,
              }}>
                {quiz.explanation}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
