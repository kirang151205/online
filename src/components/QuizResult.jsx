import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, Clock, RotateCcw, BookOpen, Printer, Share2, HelpCircle, Check, AlertCircle } from 'lucide-react';

export default function QuizResult({ result, onRetakeQuiz, onBackToLibrary }) {
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'correct', 'incorrect', 'unattempted'
  const { quiz, userAnswers, timeSpentSeconds, score, totalQuestions, percentage, grade, passed } = result;

  // Trigger celebration confetti on high score
  useEffect(() => {
    if (percentage >= 70) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback gracefully if canvas is unavailable
      }
    }
  }, [percentage]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    if (mins === 0) return `${remainingSecs}s`;
    return `${mins}m ${remainingSecs}s`;
  };

  // Filtered review questions
  const filteredQuestions = quiz.questions.map((q, idx) => {
    const userChoice = userAnswers[idx];
    const isAttempted = userChoice !== undefined;
    const isCorrect = isAttempted && userChoice === q.correctAnswer;
    return {
      ...q,
      questionIndex: idx,
      userChoice,
      isAttempted,
      isCorrect
    };
  }).filter((item) => {
    if (filterMode === 'correct') return item.isCorrect;
    if (filterMode === 'incorrect') return item.isAttempted && !item.isCorrect;
    if (filterMode === 'unattempted') return !item.isAttempted;
    return true;
  });

  const correctCount = score;
  const attemptedCount = Object.keys(userAnswers).length;
  const incorrectCount = attemptedCount - correctCount;
  const unattemptedCount = totalQuestions - attemptedCount;

  return (
    <div className="fade-in" style={{ maxWidth: '950px', margin: '0 auto' }}>
      {/* Result Hero Banner */}
      <div
        className="glass-card"
        style={{
          padding: '3rem 2rem',
          textAlign: 'center',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: passed ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
          color: passed ? '#10b981' : '#ef4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          border: `2px solid ${passed ? '#10b981' : '#ef4444'}`
        }}>
          <Award size={44} />
        </div>

        <h1 style={{ fontSize: '2.4rem', marginBottom: '0.5rem' }}>
          {passed ? 'Assessment Passed!' : 'Assessment Completed'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '1.75rem' }}>
          {passed
            ? 'Great job! You demonstrated a solid grasp of the core concepts.'
            : 'Keep practicing! Review the detailed answers and explanations below to strengthen your fundamentals.'}
        </p>

        {/* Big Score Numbers */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'baseline',
          gap: '0.5rem',
          background: 'var(--bg-surface)',
          padding: '1rem 2.5rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          marginBottom: '1.5rem'
        }}>
          <span style={{ fontSize: '3.5rem', fontWeight: 800 }} className="gradient-text">
            {score}
          </span>
          <span style={{ fontSize: '1.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            / {totalQuestions}
          </span>
          <span style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginLeft: '1rem', fontWeight: 600 }}>
            ({percentage}%)
          </span>
          <span className={`badge ${passed ? 'badge-easy' : 'badge-hard'}`} style={{ marginLeft: '1rem', fontSize: '0.9rem', padding: '0.35rem 0.8rem' }}>
            Grade: {grade}
          </span>
        </div>

        {/* Quick Metrics Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '1rem',
          maxWidth: '700px',
          margin: '0 auto 2rem'
        }}>
          <div style={{ background: 'var(--bg-surface)', padding: '0.85rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ color: '#10b981', fontSize: '1.35rem', fontWeight: 700 }}>{correctCount}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Correct</div>
          </div>
          <div style={{ background: 'var(--bg-surface)', padding: '0.85rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ color: '#ef4444', fontSize: '1.35rem', fontWeight: 700 }}>{incorrectCount}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Incorrect</div>
          </div>
          <div style={{ background: 'var(--bg-surface)', padding: '0.85rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '1.35rem', fontWeight: 700 }}>{unattemptedCount}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Skipped</div>
          </div>
          <div style={{ background: 'var(--bg-surface)', padding: '0.85rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ color: 'var(--primary)', fontSize: '1.35rem', fontWeight: 700 }}>{formatTime(timeSpentSeconds)}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Time Spent</div>
          </div>
        </div>

        {/* Top Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={onRetakeQuiz} id="retake-quiz-btn">
            <RotateCcw size={16} /> Retake Quiz
          </button>
          <button className="btn-secondary" onClick={onBackToLibrary} id="back-library-btn">
            <BookOpen size={16} /> Browse Quizzes
          </button>
          <button className="btn-secondary" onClick={() => window.print()} id="print-result-btn">
            <Printer size={16} /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* Answer Validation & Detailed Review Section */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem' }}>Answer Key & Explanations</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Detailed review of all questions with solution rationales.
            </p>
          </div>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: '0.4rem', background: 'var(--bg-surface)', padding: '0.25rem', borderRadius: 'var(--radius-md)' }}>
            <button
              onClick={() => setFilterMode('all')}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: 600,
                background: filterMode === 'all' ? 'var(--primary)' : 'transparent',
                color: filterMode === 'all' ? '#ffffff' : 'var(--text-secondary)'
              }}
            >
              All ({totalQuestions})
            </button>
            <button
              onClick={() => setFilterMode('correct')}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: 600,
                background: filterMode === 'correct' ? '#10b981' : 'transparent',
                color: filterMode === 'correct' ? '#ffffff' : 'var(--text-secondary)'
              }}
            >
              Correct ({correctCount})
            </button>
            <button
              onClick={() => setFilterMode('incorrect')}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: 600,
                background: filterMode === 'incorrect' ? '#ef4444' : 'transparent',
                color: filterMode === 'incorrect' ? '#ffffff' : 'var(--text-secondary)'
              }}
            >
              Incorrect ({incorrectCount})
            </button>
            <button
              onClick={() => setFilterMode('unattempted')}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: 600,
                background: filterMode === 'unattempted' ? 'var(--text-muted)' : 'transparent',
                color: filterMode === 'unattempted' ? '#ffffff' : 'var(--text-secondary)'
              }}
            >
              Skipped ({unattemptedCount})
            </button>
          </div>
        </div>

        {/* Question Review Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {filteredQuestions.map((q) => {
            const letters = ['A', 'B', 'C', 'D', 'E'];

            return (
              <div
                key={q.id || q.questionIndex}
                className="glass-card"
                style={{
                  padding: '1.75rem',
                  borderRadius: 'var(--radius-md)',
                  borderLeft: `4px solid ${
                    q.isCorrect ? '#10b981' : q.isAttempted ? '#ef4444' : 'var(--text-muted)'
                  }`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Question {q.questionIndex + 1}
                  </span>
                  <div>
                    {q.isCorrect && (
                      <span className="badge badge-easy">
                        <CheckCircle2 size={13} /> Correct (+1 Mark)
                      </span>
                    )}
                    {q.isAttempted && !q.isCorrect && (
                      <span className="badge badge-hard">
                        <XCircle size={13} /> Incorrect (0 Marks)
                      </span>
                    )}
                    {!q.isAttempted && (
                      <span className="badge" style={{ background: 'rgba(148,163,184,0.15)', color: '#94a3b8' }}>
                        <AlertCircle size={13} /> Skipped / Unattempted
                      </span>
                    )}
                  </div>
                </div>

                <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', fontWeight: 600 }}>
                  {q.question}
                </h3>

                {/* Options List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem' }}>
                  {q.options.map((opt, oIdx) => {
                    const isUserPick = q.userChoice === oIdx;
                    const isTargetCorrect = q.correctAnswer === oIdx;

                    let bg = 'var(--bg-surface)';
                    let border = 'var(--border-color)';
                    let textColor = 'var(--text-secondary)';

                    if (isTargetCorrect) {
                      bg = 'rgba(16, 185, 129, 0.15)';
                      border = '#10b981';
                      textColor = '#10b981';
                    } else if (isUserPick && !isTargetCorrect) {
                      bg = 'rgba(239, 68, 68, 0.15)';
                      border = '#ef4444';
                      textColor = '#ef4444';
                    }

                    return (
                      <div
                        key={oIdx}
                        style={{
                          padding: '0.75rem 1rem',
                          borderRadius: 'var(--radius-sm)',
                          background: bg,
                          border: `1px solid ${border}`,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          fontSize: '0.95rem'
                        }}
                      >
                        <span style={{
                          fontWeight: 700,
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '50%',
                          background: isTargetCorrect ? '#10b981' : isUserPick ? '#ef4444' : 'rgba(255,255,255,0.06)',
                          color: (isTargetCorrect || isUserPick) ? '#ffffff' : 'var(--text-muted)',
                          fontSize: '0.8rem'
                        }}>
                          {letters[oIdx]}
                        </span>
                        <span style={{ flex: 1, color: textColor, fontWeight: (isTargetCorrect || isUserPick) ? 600 : 400 }}>
                          {opt}
                        </span>
                        {isTargetCorrect && (
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                            <Check size={14} /> Correct Answer
                          </span>
                        )}
                        {isUserPick && !isTargetCorrect && (
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                            <XCircle size={14} /> Your Choice
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* In-depth Explanation Card */}
                <div style={{
                  background: 'rgba(99, 102, 241, 0.08)',
                  border: '1px solid rgba(99, 102, 241, 0.25)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1rem',
                  fontSize: '0.9rem',
                  display: 'flex',
                  gap: '0.75rem',
                  alignItems: 'flex-start'
                }}>
                  <HelpCircle size={18} color="#818cf8" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#818cf8', display: 'block', marginBottom: '0.25rem' }}>
                      Concept Explanation:
                    </strong>
                    <span style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {q.explanation}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
