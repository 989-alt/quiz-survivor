import { useEffect, useMemo, useState } from 'react';
import {
  getUnitsByGradeSemester,
  SUPPORTED_GRADES,
  SUPPORTED_SEMESTERS,
} from '../../data/units';
import type { Grade, Semester } from '../../data/units';
import {
  ensureAnonymousAuth,
  fetchMyBest,
  fetchTopScores,
  isFirebaseConfigured,
  type ScoreEntryWithMeta,
} from '../../services/firebase';

interface LeaderboardViewProps {
  initial?: { grade?: Grade; semester?: Semester; unitId?: string } | null;
  onBack?: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function LeaderboardView({ initial, onBack }: LeaderboardViewProps) {
  const [grade, setGrade] = useState<Grade>(initial?.grade ?? 5);
  const [semester, setSemester] = useState<Semester>(initial?.semester ?? 1);
  const [unitId, setUnitId] = useState<string>('');
  const [scores, setScores] = useState<ScoreEntryWithMeta[]>([]);
  const [myBest, setMyBest] = useState<ScoreEntryWithMeta | null>(null);
  const [myUid, setMyUid] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const units = useMemo(() => getUnitsByGradeSemester(grade, semester), [grade, semester]);

  useEffect(() => {
    if (initial?.unitId && units.some((u) => u.unitId === initial.unitId)) {
      setUnitId(initial.unitId);
    } else if (units.length > 0) {
      setUnitId(units[0].unitId);
    } else {
      setUnitId('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grade, semester]);

  useEffect(() => {
    if (!unitId) return;
    if (!isFirebaseConfigured()) {
      setErrorMsg('Firebase 환경변수가 설정되지 않았습니다. .env.local을 확인해주세요.');
      setScores([]);
      setMyBest(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setErrorMsg(null);

    (async () => {
      try {
        const user = await ensureAnonymousAuth();
        if (cancelled) return;
        setMyUid(user.uid);

        const [top, mine] = await Promise.all([fetchTopScores(unitId, 100), fetchMyBest(unitId)]);
        if (cancelled) return;
        setScores(top);
        setMyBest(mine);
      } catch (err) {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : '랭킹을 불러오지 못했습니다.';
        setErrorMsg(msg);
        setScores([]);
        setMyBest(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [unitId]);

  const myRank = useMemo(() => {
    if (!myBest) return null;
    const idx = scores.findIndex((s) => s.docId === myBest.docId);
    return idx >= 0 ? idx + 1 : null;
  }, [scores, myBest]);

  const selectedUnit = units.find((u) => u.unitId === unitId);

  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        background: '#0a0a0f',
        position: 'relative',
        padding: 'clamp(20px, 4vw, 56px)',
      }}
    >
      <div className="fantasy-bg-image" />
      <div className="fantasy-aurora" />
      <div className="fantasy-stars" />
      <div className="dot-grid-bg" />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 880, margin: '0 auto' }}>
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 'clamp(22px, 3.5vw, 36px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#fafafa',
              }}
            >
              <span className="gradient-text">랭킹</span>
            </h1>
            <p style={{ fontSize: 13, color: '#71717a', marginTop: 4 }}>
              단원별 상위 100명 (가중점수 기준)
            </p>
          </div>
          {onBack && (
            <button onClick={onBack} className="btn-clean btn-ghost" style={{ padding: '10px 18px', fontSize: 13 }}>
              ← 홈으로
            </button>
          )}
        </header>

        <div className="clean-card" style={{ padding: 16, marginBottom: 16 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, color: '#71717a', marginBottom: 6, fontWeight: 600 }}>학년</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {SUPPORTED_GRADES.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGrade(g)}
                    className={grade === g ? 'btn-clean btn-indigo' : 'btn-clean btn-ghost'}
                    style={{ padding: '8px 14px', fontSize: 13 }}
                  >
                    {g}학년
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 11, color: '#71717a', marginBottom: 6, fontWeight: 600 }}>학기</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {SUPPORTED_SEMESTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSemester(s)}
                    className={semester === s ? 'btn-clean btn-cyan' : 'btn-clean btn-ghost'}
                    style={{ padding: '8px 14px', fontSize: 13 }}
                  >
                    {s}학기
                  </button>
                ))}
              </div>
            </div>

            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ fontSize: 11, color: '#71717a', marginBottom: 6, fontWeight: 600 }}>단원</div>
              <select
                className="clean-input"
                value={unitId}
                onChange={(e) => setUnitId(e.target.value)}
                style={{ padding: '8px 12px', fontSize: 13, width: '100%' }}
              >
                {units.map((u) => (
                  <option key={u.unitId} value={u.unitId}>
                    {u.unitNumber}단원 · {u.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {selectedUnit && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: 12,
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.2)',
              marginBottom: 16,
              fontSize: 13,
              color: '#a5b4fc',
              fontWeight: 600,
            }}
          >
            {selectedUnit.grade}학년 {selectedUnit.semester}학기 · {selectedUnit.unitNumber}단원 {selectedUnit.title}
          </div>
        )}

        {errorMsg && (
          <div
            style={{
              padding: '14px 16px',
              borderRadius: 12,
              background: 'rgba(244,63,94,0.08)',
              border: '1px solid rgba(244,63,94,0.25)',
              color: '#fda4af',
              fontSize: 13,
              marginBottom: 16,
            }}
          >
            {errorMsg}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#71717a' }}>
            <div className="dot-spinner" style={{ display: 'inline-flex' }}>
              <div className="dot" />
              <div className="dot" />
              <div className="dot" />
            </div>
            <div style={{ marginTop: 16, fontSize: 13 }}>불러오는 중...</div>
          </div>
        ) : (
          <>
            {myBest && (
              <div
                className="clean-card"
                style={{
                  padding: 16,
                  marginBottom: 16,
                  border: '1px solid rgba(34,211,238,0.3)',
                  background: 'rgba(34,211,238,0.05)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <div style={{ fontSize: 11, color: '#67e8f9', fontWeight: 700, marginBottom: 4 }}>
                      내 최고 기록
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#e4e4e7' }}>
                      {myBest.nickname} {myRank ? `· Top 100 ${myRank}위` : ''}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#67e8f9' }}>
                      {myBest.weightedScore.toLocaleString()}
                    </div>
                    <div style={{ fontSize: 11, color: '#71717a' }}>
                      점수 {myBest.score} · {formatTime(myBest.survivalTime)} · Lv.{myBest.level}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="clean-card" style={{ padding: 0, overflow: 'hidden' }}>
              {scores.length === 0 ? (
                <div style={{ padding: 60, textAlign: 'center', color: '#71717a', fontSize: 14 }}>
                  아직 등록된 기록이 없습니다.
                  <br />
                  <span style={{ fontSize: 12, color: '#52525b' }}>첫 도전자가 되어보세요!</span>
                </div>
              ) : (
                <div>
                  {scores.map((s, i) => {
                    const isMine = s.authUid === myUid;
                    const rank = i + 1;
                    return (
                      <div
                        key={s.docId}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '48px 1fr auto',
                          gap: 12,
                          padding: '12px 16px',
                          borderBottom: i < scores.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                          background: isMine ? 'rgba(34,211,238,0.06)' : 'transparent',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            fontSize: rank <= 3 ? 22 : 14,
                            fontWeight: 800,
                            color:
                              rank === 1
                                ? '#fbbf24'
                                : rank === 2
                                ? '#cbd5e1'
                                : rank === 3
                                ? '#fb923c'
                                : '#52525b',
                            textAlign: 'center',
                          }}
                        >
                          {rank}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: 14,
                              fontWeight: 700,
                              color: isMine ? '#67e8f9' : '#e4e4e7',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {s.nickname}
                            {isMine && <span style={{ marginLeft: 8, fontSize: 10, color: '#67e8f9' }}>(나)</span>}
                          </div>
                          <div style={{ fontSize: 11, color: '#71717a', marginTop: 2 }}>
                            점수 {s.score.toLocaleString()} · 생존 {formatTime(s.survivalTime)} · Lv.{s.level} · 처치 {s.kills}
                          </div>
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: '#a5b4fc' }}>
                          {s.weightedScore.toLocaleString()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
