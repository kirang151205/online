import React, { useState } from 'react';
import { History, Award, Clock, Calendar, Trash2, ArrowRight, BookOpen, CheckCircle2, XCircle } from 'lucide-react';

export default function QuizHistory({ history, onClearHistory, onViewPastResult, onStartQuiz, quizzes }) {
  const [searchFilter, setSearchFilter] = useState('');

  const filteredHistory = history.filter((item) => {
    return item.quizTitle.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.quizCategory.toLowerCase().includes(searchFilter.toLowerCase());
  });

  const formatDate = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}m ${s}s`;
  };

  return (
    <div className="fade-in" style={{ maxWidth: '950px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Assessment Attempt History</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Review past test submissions, score analytics, and progression over time.
          </p>
        </div>

        {history.length > 0 && (
          <button
            className="btn-danger"
            onClick={onClearHistory}
            id="clear-history-btn"
          >
            <Trash2 size={16} /> Clear All Records
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="glass-card" style={{ padding: '3.5rem 2rem', textAlign: 'center', borderRadius: 'var(--radius-lg)' }}>
          <History size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>No quiz attempts recorded yet</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
            Once you take a quiz, your detailed scores, answer breakdowns, and evaluation reports will appear here.
          </p>
          <button className="btn-primary" onClick={() => onStartQuiz(quizzes[0])}>
            <BookOpen size={16} /> Take Your First Quiz
          </button>
        </div>
      ) : (
        <div>
          {/* Search bar */}
          <div style={{ marginBottom: '1.5rem' }}>
            <input
              type="text"
              placeholder="Filter history by quiz title or category..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{
                width: '100%',
                maxWidth: '400px',
                padding: '0.7rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontSize: '0.9rem'
              }}
              id="history-search-input"
            />
          </div>

          {/* Attempts List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredHistory.map((item) => {
              const passed = item.passed;

              return (
                <div
                  key={item.id}
                  className="glass-card"
                  style={{
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flex: '1 1 300px' }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: 'var(--radius-md)',
                      background: passed ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: passed ? '#10b981' : '#ef4444',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Award size={26} />
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        <h3 style={{ fontSize: '1.15rem' }}>{item.quizTitle}</h3>
                        <span className="badge badge-category" style={{ fontSize: '0.7rem' }}>
                          {item.quizCategory}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Calendar size={14} /> {formatDate(item.timestamp)}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Clock size={14} /> {formatTime(item.timeSpentSeconds)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Score & Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.35rem', fontWeight: 800, color: passed ? '#10b981' : '#ef4444' }}>
                        {item.score} / {item.totalQuestions} ({item.percentage}%)
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Grade: <strong>{item.grade}</strong> • {passed ? 'Passed' : 'Needs Review'}
                      </div>
                    </div>

                    <button
                      className="btn-secondary"
                      onClick={() => onViewPastResult(item)}
                      style={{ fontSize: '0.85rem', padding: '0.55rem 0.95rem' }}
                      id={`view-result-btn-${item.id}`}
                    >
                      View Report <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
