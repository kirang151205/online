import React, { useState, useEffect } from 'react';
import { Clock, Flag, ChevronLeft, ChevronRight, CheckCircle2, AlertTriangle, X, HelpCircle, ArrowLeft } from 'lucide-react';

export default function QuizTake({ quiz, onSubmitQuiz, onExitQuiz }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [questionIndex]: selectedOptionIndex }
  const [flaggedQuestions, setFlaggedQuestions] = useState({}); // { [questionIndex]: boolean }
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(quiz.durationMinutes * 60);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  const totalQuestions = quiz.questions.length;
  const currentQuestion = quiz.questions[currentIndex];

  // Timer countdown with useEffect
  useEffect(() => {
    if (timeLeftSeconds <= 0) {
      handleFinalSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeftSeconds]);

  // Format seconds to MM:SS
  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Option selection
  const handleSelectOption = (optionIndex) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  // Clear answer
  const handleClearAnswer = () => {
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentIndex];
      return copy;
    });
  };

  // Toggle flag
  const handleToggleFlag = () => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentIndex]: !prev[currentIndex]
    }));
  };

  // Final submission calculation
  const handleFinalSubmit = () => {
    const timeSpentSeconds = (quiz.durationMinutes * 60) - timeLeftSeconds;
    onSubmitQuiz({
      quiz,
      userAnswers,
      timeSpentSeconds: timeSpentSeconds > 0 ? timeSpentSeconds : (quiz.durationMinutes * 60)
    });
  };

  // Statistics for submission modal
  const answeredCount = Object.keys(userAnswers).length;
  const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;
  const unansweredCount = totalQuestions - answeredCount;
  const progressPercentage = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const isLowTime = timeLeftSeconds <= 60;

  return (
    <div className="fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Top Header Bar */}
      <div className="glass-card" style={{ padding: '1.25rem 1.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <button
            onClick={() => setShowExitModal(true)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', background: 'transparent', fontSize: '0.85rem', marginBottom: '0.25rem' }}
          >
            <ArrowLeft size={16} /> Exit Quiz
          </button>
          <h2 style={{ fontSize: '1.35rem' }}>{quiz.title}</h2>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.25rem' }}>
            <span className="badge badge-category">{quiz.category}</span>
            <span className="badge badge-medium">Question {currentIndex + 1} of {totalQuestions}</span>
          </div>
        </div>

        {/* Timer Card */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          padding: '0.6rem 1.2rem',
          borderRadius: 'var(--radius-full)',
          background: isLowTime ? 'rgba(239, 68, 68, 0.15)' : 'var(--bg-surface)',
          border: isLowTime ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--border-color)',
          color: isLowTime ? '#ef4444' : 'var(--text-primary)',
          fontWeight: 700,
          fontSize: '1.15rem'
        }}>
          <Clock size={20} className={isLowTime ? 'pulse-anim' : ''} />
          <span>{formatTime(timeLeftSeconds)}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ background: 'var(--bg-surface)', height: '6px', borderRadius: 'var(--radius-full)', overflow: 'hidden', marginBottom: '1.5rem' }}>
        <div style={{
          width: `${progressPercentage}%`,
          height: '100%',
          background: 'var(--primary-gradient)',
          transition: 'width 0.3s ease'
        }} />
      </div>

      {/* Question Navigator Drawer / Pills */}
      <div className="glass-card" style={{ padding: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Jump to Question
          </span>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#6366f1' }}></span> Answered ({answeredCount})
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></span> Flagged ({flaggedCount})
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--bg-surface)' }}></span> Unanswered ({unansweredCount})
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {quiz.questions.map((q, idx) => {
            const isCurrent = idx === currentIndex;
            const isAnswered = userAnswers[idx] !== undefined;
            const isFlagged = flaggedQuestions[idx];

            let bgColor = 'var(--bg-surface)';
            let borderColor = 'var(--border-color)';
            let textColor = 'var(--text-secondary)';

            if (isAnswered) {
              bgColor = 'rgba(99, 102, 241, 0.25)';
              borderColor = '#6366f1';
              textColor = '#ffffff';
            }
            if (isFlagged) {
              borderColor = '#f59e0b';
            }
            if (isCurrent) {
              borderColor = '#a855f7';
              bgColor = 'var(--primary-gradient)';
              textColor = '#ffffff';
            }

            return (
              <button
                key={q.id || idx}
                onClick={() => setCurrentIndex(idx)}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-sm)',
                  background: bgColor,
                  border: `2px solid ${borderColor}`,
                  color: textColor,
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
                id={`jump-btn-${idx}`}
              >
                {idx + 1}
                {isFlagged && (
                  <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '8px', height: '8px', background: '#f59e0b', borderRadius: '50%' }} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Question Card */}
      <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Question {currentIndex + 1}
          </span>
          <button
            onClick={handleToggleFlag}
            style={{
              background: flaggedQuestions[currentIndex] ? 'rgba(245, 158, 11, 0.2)' : 'var(--bg-surface)',
              border: flaggedQuestions[currentIndex] ? '1px solid #f59e0b' : '1px solid var(--border-color)',
              color: flaggedQuestions[currentIndex] ? '#f59e0b' : 'var(--text-muted)',
              padding: '0.4rem 0.8rem',
              borderRadius: 'var(--radius-full)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.8rem',
              fontWeight: 600
            }}
            id="flag-question-btn"
          >
            <Flag size={14} fill={flaggedQuestions[currentIndex] ? '#f59e0b' : 'none'} />
            {flaggedQuestions[currentIndex] ? 'Flagged for Review' : 'Flag Question'}
          </button>
        </div>

        <h3 style={{ fontSize: '1.35rem', lineHeight: 1.5, marginBottom: '2rem', fontWeight: 600 }}>
          {currentQuestion.question}
        </h3>

        {/* Options Selection */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {currentQuestion.options.map((option, optIdx) => {
            const isSelected = userAnswers[currentIndex] === optIdx;
            const letters = ['A', 'B', 'C', 'D', 'E'];

            return (
              <div
                key={optIdx}
                onClick={() => handleSelectOption(optIdx)}
                id={`option-card-${currentIndex}-${optIdx}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-surface)',
                  border: isSelected ? '2px solid #6366f1' : '1px solid var(--border-color)',
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isSelected ? 'var(--primary-gradient)' : 'rgba(255,255,255,0.06)',
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  flexShrink: 0
                }}>
                  {letters[optIdx]}
                </div>
                <div style={{ flex: 1, fontSize: '1rem', color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: isSelected ? 600 : 400 }}>
                  {option}
                </div>
                {isSelected && (
                  <CheckCircle2 size={20} color="#6366f1" style={{ flexShrink: 0 }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Option action tools */}
        {userAnswers[currentIndex] !== undefined && (
          <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={handleClearAnswer}
              style={{ background: 'transparent', color: 'var(--text-muted)', fontSize: '0.8rem', textDecoration: 'underline' }}
            >
              Clear Selection
            </button>
          </div>
        )}
      </div>

      {/* Footer Navigation Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <button
          className="btn-secondary"
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          style={{ opacity: currentIndex === 0 ? 0.4 : 1, cursor: currentIndex === 0 ? 'not-allowed' : 'pointer' }}
          id="prev-question-btn"
        >
          <ChevronLeft size={18} /> Previous
        </button>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {currentIndex < totalQuestions - 1 ? (
            <button
              className="btn-primary"
              onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
              id="next-question-btn"
            >
              Next <ChevronRight size={18} />
            </button>
          ) : (
            <button
              className="btn-primary"
              onClick={() => setShowSubmitModal(true)}
              style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
              id="submit-quiz-trigger-btn"
            >
              <CheckCircle2 size={18} /> Review & Submit
            </button>
          )}
        </div>

        {currentIndex < totalQuestions - 1 && (
          <button
            className="btn-secondary"
            onClick={() => setShowSubmitModal(true)}
            style={{ color: '#10b981', borderColor: 'rgba(16,185,129,0.3)' }}
            id="quick-submit-btn"
          >
            Submit Quiz
          </button>
        )}
      </div>

      {/* Confirmation Submit Modal */}
      {showSubmitModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div className="glass-card" style={{ maxWidth: '480px', width: '100%', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.3rem' }}>Submit Assessment?</h3>
              <button onClick={() => setShowSubmitModal(false)} className="icon-btn" style={{ width: '32px', height: '32px' }}>
                <X size={16} />
              </button>
            </div>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              Please review your completion status before finalizing your submission:
            </p>

            <div style={{ background: 'var(--bg-surface)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Total Questions:</span>
                <span style={{ fontWeight: 700 }}>{totalQuestions}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}>
                <span>Answered:</span>
                <span style={{ fontWeight: 700 }}>{answeredCount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: unansweredCount > 0 ? '#ef4444' : 'var(--text-muted)' }}>
                <span>Unanswered:</span>
                <span style={{ fontWeight: 700 }}>{unansweredCount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f59e0b' }}>
                <span>Flagged for Review:</span>
                <span style={{ fontWeight: 700 }}>{flaggedCount}</span>
              </div>
            </div>

            {unansweredCount > 0 && (
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-sm)', color: '#ef4444', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                <AlertTriangle size={18} style={{ flexShrink: 0 }} />
                <span>You have {unansweredCount} unanswered question{unansweredCount > 1 ? 's' : ''}. Submitting now will count them as incorrect.</span>
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button className="btn-secondary" onClick={() => setShowSubmitModal(false)}>
                Continue Quiz
              </button>
              <button className="btn-primary" onClick={handleFinalSubmit} id="confirm-submit-btn">
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exit Modal */}
      {showExitModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div className="glass-card" style={{ maxWidth: '420px', width: '100%', padding: '1.75rem', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ marginBottom: '0.75rem' }}>Leave Assessment?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              Your progress will not be saved if you leave this quiz now. Are you sure you want to exit?
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button className="btn-secondary" onClick={() => setShowExitModal(false)}>
                Stay
              </button>
              <button className="btn-danger" onClick={onExitQuiz} id="confirm-exit-btn">
                Exit Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
