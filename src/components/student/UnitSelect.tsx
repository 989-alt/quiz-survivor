import { useEffect, useState } from 'react';
import { getUnitsByGradeSemester, SUPPORTED_GRADES } from '../../data/units';
import type { Grade, Semester } from '../../data/units';

const NICKNAME_KEY = 'sqb:nickname';

interface UnitSelectProps {
  onStart: (config: { unitId: string; nickname: string; grade: Grade; semester: Semester }) => void;
  onOpenLeaderboard?: () => void;
  onBack?: () => void;
}

type Step = 'grade' | 'semester' | 'unit' | 'nickname';

export function UnitSelect({ onStart, onOpenLeaderboard, onBack }: UnitSelectProps) {
  const [step, setStep] = useState<Step>('grade');
  const [grade, setGrade] = useState<Grade | null>(null);
  const [semester, setSemester] = useState<Semester | null>(null);
  const [unitId, setUnitId] = useState<string | null>(null);
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem(NICKNAME_KEY) : null;
    if (saved) setNickname(saved);
  }, []);

  const units = grade && semester ? getUnitsByGradeSemester(grade, semester) : [];
  const selectedUnit = units.find((u) => u.unitId === unitId) ?? null;

  const handleStart = () => {
    if (!grade || !semester || !unitId) return;
    const trimmed = nickname.trim();
    if (!trimmed) {
      setError('닉네임을 입력해주세요!');
      return;
    }
    if (trimmed.length > 12) {
      setError('닉네임은 12자 이하로 입력해주세요!');
      return;
    }
    setError('');
    window.localStorage.setItem(NICKNAME_KEY, trimmed);
    onStart({ unitId, nickname: trimmed, grade, semester });
  };

  const stepIndex = step === 'grade' ? 1 : step === 'semester' ? 2 : step === 'unit' ? 3 : 4;

  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(20px, 5vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
        background: '#0a0a0f',
      }}
    >
      <div className="fantasy-bg-image" />
      <div className="fantasy-aurora" />
      <div className="fantasy-stars" />
      <div className="dot-grid-bg" />

      <div
        className="animate-slide-up"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: 'clamp(340px, 60vw, 720px)',
          textAlign: 'center',
        }}
      >
        <div style={{ marginBottom: 'clamp(24px, 4vh, 48px)' }}>
          <h1
            style={{
              fontSize: 'clamp(24px, 5vw, 56px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginBottom: 12,
            }}
          >
            <span className="gradient-text">시작하기</span>
          </h1>
          <p style={{ fontSize: 'clamp(12px, 1.3vw, 16px)', color: '#71717a', fontWeight: 500 }}>
            {step === 'grade' && '학년을 선택하세요'}
            {step === 'semester' && '학기를 선택하세요'}
            {step === 'unit' && '단원을 선택하세요'}
            {step === 'nickname' && '닉네임을 입력하세요'}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 18 }}>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  width: i <= stepIndex ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i <= stepIndex ? '#6366f1' : 'rgba(255,255,255,0.1)',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>

        {step === 'grade' && (
          <div className="clean-card" style={{ padding: 'clamp(20px, 3.5vw, 36px)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {SUPPORTED_GRADES.map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    setGrade(g);
                    setStep('semester');
                  }}
                  className="clean-card card-indigo"
                  style={{
                    padding: 'clamp(28px, 5vw, 48px)',
                    cursor: 'pointer',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                  }}
                >
                  <div
                    style={{
                      fontSize: 'clamp(28px, 5vw, 56px)',
                      fontWeight: 800,
                      color: '#a5b4fc',
                      marginBottom: 6,
                    }}
                  >
                    {g}
                  </div>
                  <div style={{ fontSize: 14, color: '#a1a1aa', fontWeight: 600 }}>학년</div>
                </button>
              ))}
            </div>
            {onBack && (
              <button
                onClick={onBack}
                className="btn-clean btn-ghost"
                style={{ width: '100%', marginTop: 20, padding: '12px', fontSize: 14 }}
              >
                ← 홈으로
              </button>
            )}
          </div>
        )}

        {step === 'semester' && grade && (
          <div className="clean-card" style={{ padding: 'clamp(20px, 3.5vw, 36px)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {([1, 2] as Semester[]).map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSemester(s);
                    setStep('unit');
                  }}
                  className="clean-card card-cyan"
                  style={{
                    padding: 'clamp(28px, 5vw, 48px)',
                    cursor: 'pointer',
                    border: '1px solid rgba(34, 211, 238, 0.2)',
                  }}
                >
                  <div
                    style={{
                      fontSize: 'clamp(20px, 3vw, 32px)',
                      fontWeight: 800,
                      color: '#67e8f9',
                      marginBottom: 6,
                    }}
                  >
                    {grade}학년
                  </div>
                  <div style={{ fontSize: 'clamp(14px, 1.5vw, 18px)', color: '#a1a1aa', fontWeight: 600 }}>
                    {s}학기
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep('grade')}
              className="btn-clean btn-ghost"
              style={{ width: '100%', marginTop: 20, padding: '12px', fontSize: 14 }}
            >
              ← 뒤로
            </button>
          </div>
        )}

        {step === 'unit' && grade && semester && (
          <div className="clean-card" style={{ padding: 'clamp(20px, 3.5vw, 36px)' }}>
            <div style={{ display: 'grid', gap: 10 }}>
              {units.map((u) => {
                const count = u.quizzes.length;
                return (
                  <button
                    key={u.unitId}
                    onClick={() => {
                      setUnitId(u.unitId);
                      setStep('nickname');
                    }}
                    className="clean-card"
                    disabled={count === 0}
                    style={{
                      padding: '14px 18px',
                      cursor: count === 0 ? 'not-allowed' : 'pointer',
                      opacity: count === 0 ? 0.4 : 1,
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 12,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          background: 'rgba(99,102,241,0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 14,
                          fontWeight: 800,
                          color: '#a5b4fc',
                          flexShrink: 0,
                        }}
                      >
                        {u.unitNumber}
                      </div>
                      <div>
                        <div style={{ fontSize: 'clamp(13px, 1.3vw, 16px)', fontWeight: 700, color: '#e4e4e7' }}>
                          {u.title}
                        </div>
                        <div style={{ fontSize: 12, color: '#71717a', marginTop: 2 }}>{u.description}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 11, color: '#52525b', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {count > 0 ? `${count}문제` : '준비 중'}
                    </div>
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setStep('semester')}
              className="btn-clean btn-ghost"
              style={{ width: '100%', marginTop: 20, padding: '12px', fontSize: 14 }}
            >
              ← 뒤로
            </button>
          </div>
        )}

        {step === 'nickname' && selectedUnit && (
          <div className="clean-card animate-scale-in" style={{ padding: 'clamp(24px, 4vw, 40px)' }}>
            <div
              style={{
                marginBottom: 20,
                padding: '14px 16px',
                borderRadius: 12,
                background: 'rgba(99,102,241,0.08)',
                border: '1px solid rgba(99,102,241,0.2)',
                textAlign: 'left',
              }}
            >
              <div style={{ fontSize: 11, color: '#a5b4fc', fontWeight: 600, marginBottom: 4 }}>선택한 단원</div>
              <div style={{ fontSize: 14, color: '#e4e4e7', fontWeight: 700 }}>
                {selectedUnit.grade}학년 {selectedUnit.semester}학기 · {selectedUnit.unitNumber}단원
              </div>
              <div style={{ fontSize: 13, color: '#a1a1aa', marginTop: 2 }}>{selectedUnit.title}</div>
            </div>

            <label
              style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#a1a1aa', marginBottom: 10, textAlign: 'left' }}
            >
              닉네임 (랭킹에 표시)
            </label>
            <input
              className="clean-input"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력하세요"
              maxLength={12}
              autoFocus
              style={{ fontSize: 'clamp(14px, 1.5vw, 18px)', padding: 'clamp(12px, 1.5vw, 18px)', marginBottom: 14 }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleStart();
              }}
            />

            {error && (
              <div
                className="animate-shake"
                style={{
                  padding: '12px 16px',
                  borderRadius: 12,
                  background: 'rgba(244,63,94,0.1)',
                  border: '1px solid rgba(244,63,94,0.25)',
                  marginBottom: 16,
                  fontSize: 13,
                  color: '#fda4af',
                  fontWeight: 500,
                  textAlign: 'left',
                }}
              >
                {error}
              </div>
            )}

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => setStep('unit')}
                className="btn-clean btn-ghost"
                style={{ flex: 1, padding: '14px', fontSize: 14 }}
              >
                ← 뒤로
              </button>
              <button
                onClick={handleStart}
                className="btn-clean btn-indigo"
                style={{ flex: 1, padding: '14px', fontSize: 14, fontWeight: 700 }}
              >
                게임 시작
              </button>
            </div>
          </div>
        )}

        {onOpenLeaderboard && step === 'grade' && (
          <button
            onClick={onOpenLeaderboard}
            className="btn-clean btn-ghost"
            style={{ marginTop: 24, padding: '12px 24px', fontSize: 13 }}
          >
            전체 랭킹 보기 →
          </button>
        )}
      </div>
    </div>
  );
}
