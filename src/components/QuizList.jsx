import React, { useState, useMemo } from 'react';
import { Search, Play, Clock, Award, HelpCircle, Edit3, Trash2, Filter, Sparkles, CheckCircle2, TrendingUp } from 'lucide-react';

export default function QuizList({ quizzes, onStartQuiz, onEditQuiz, onDeleteQuiz, history }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  // Categories list derived dynamically
  const categories = useMemo(() => {
    const set = new Set(quizzes.map((q) => q.category));
    return ['All', ...Array.from(set)];
  }, [quizzes]);

  // High score map for quick reference
  const quizScores = useMemo(() => {
    const scores = {};
    history.forEach((h) => {
      if (!scores[h.quizId] || h.percentage > scores[h.quizId]) {
        scores[h.quizId] = h.percentage;
      }
    });
    return scores;
  }, [history]);

  // Overall stats calculations
  const totalQuizzes = quizzes.length;
  const attemptsCount = history.length;
  const averageScore = useMemo(() => {
    if (history.length === 0) return 0;
    const sum = history.reduce((acc, h) => acc + h.percentage, 0);
    return Math.round(sum / history.length);
  }, [history]);

  // Filtered quizzes
  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((quiz) => {
      const matchesSearch =
        quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || quiz.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || quiz.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [quizzes, searchQuery, selectedCategory, selectedDifficulty]);

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%)',
        borderRadius: 'var(--radius-lg)',
        padding: '2.5rem 2rem',
        marginBottom: '2.5rem',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '750px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.85rem', background: 'rgba(99,102,241,0.2)', borderRadius: 'var(--radius-full)', color: '#818cf8', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1rem' }}>
            <Sparkles size={15} /> Interactive Assessment System • Task 2
          </div>
          <h1 style={{ fontSize: '2.4rem', lineHeight: 1.2, marginBottom: '0.75rem' }}>
            Master Full Stack Concepts with <span className="gradient-text">Interactive Quizzes</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
            Assess your ReactJS, ES6+, Web Architecture, and Computer Science knowledge with real-time timers, automatic score calculation, and in-depth answer reviews.
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1rem',
          marginTop: '1.5rem'
        }}>
          <div className="glass-card" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ background: 'rgba(99,102,241,0.2)', color: '#818cf8', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
              <HelpCircle size={22} />
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{totalQuizzes}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Quizzes Available</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ background: 'rgba(16,185,129,0.2)', color: '#10b981', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
              <CheckCircle2 size={22} />
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{attemptsCount}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Tests Attempted</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ background: 'rgba(245,158,11,0.2)', color: '#f59e0b', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
              <TrendingUp size={22} />
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{averageScore}%</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Average Score</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section style={{ marginBottom: '2rem' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.25rem'
        }}>
          {/* Search Box */}
          <div style={{
            position: 'relative',
            flex: '1 1 300px',
            maxWidth: '500px'
          }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search quiz topic, title, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.85rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontSize: '0.95rem'
              }}
              id="quiz-search-input"
            />
          </div>

          {/* Difficulty Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Filter size={15} /> Difficulty:
            </span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              style={{
                padding: '0.65rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
              id="difficulty-filter-select"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Category Chips */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                background: selectedCategory === cat ? 'var(--primary-gradient)' : 'var(--bg-surface)',
                color: selectedCategory === cat ? '#ffffff' : 'var(--text-secondary)',
                border: selectedCategory === cat ? 'none' : '1px solid var(--border-color)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Quiz Grid */}
      {filteredQuizzes.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', margin: '2rem 0' }}>
          <HelpCircle size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3 style={{ marginBottom: '0.5rem' }}>No quizzes matched your search</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Try adjusting your search query or reset filters to see all available tests.
          </p>
          <button
            className="btn-secondary"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedDifficulty('All');
            }}
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredQuizzes.map((quiz) => {
            const bestScore = quizScores[quiz.id];
            const isCustom = quiz.isCustom;

            return (
              <div
                key={quiz.id}
                className="glass-card"
                style={{
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: 'var(--radius-md)',
                  position: 'relative'
                }}
              >
                <div>
                  {/* Top Badges */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span className="badge badge-category">{quiz.category}</span>
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <span className={`badge badge-${quiz.difficulty.toLowerCase()}`}>
                        {quiz.difficulty}
                      </span>
                      {isCustom && (
                        <span className="badge" style={{ background: 'rgba(217, 70, 239, 0.15)', color: '#d946ef', border: '1px solid rgba(217, 70, 239, 0.3)' }}>
                          Custom
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.65rem' }}>{quiz.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem', minHeight: '40px' }}>
                    {quiz.description}
                  </p>

                  {/* Metadata Info */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--border-color)',
                    marginBottom: '1.5rem'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <HelpCircle size={15} /> {quiz.questions.length} Questions
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Clock size={15} /> {quiz.durationMinutes} Mins
                    </span>
                    {bestScore !== undefined && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#10b981', fontWeight: 600, marginLeft: 'auto' }}>
                        <Award size={15} /> Best: {bestScore}%
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: 'auto' }}>
                  <button
                    className="btn-primary"
                    style={{ flex: 1, justifyContent: 'center' }}
                    onClick={() => onStartQuiz(quiz)}
                    id={`start-quiz-${quiz.id}`}
                  >
                    <Play size={16} fill="currentColor" /> Start Quiz
                  </button>

                  {isCustom && (
                    <>
                      <button
                        className="icon-btn"
                        onClick={() => onEditQuiz(quiz)}
                        title="Edit Quiz"
                        id={`edit-quiz-${quiz.id}`}
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        className="icon-btn"
                        onClick={() => onDeleteQuiz(quiz.id)}
                        title="Delete Quiz"
                        style={{ color: 'var(--danger)' }}
                        id={`delete-quiz-${quiz.id}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
