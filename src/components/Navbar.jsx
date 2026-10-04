import React from 'react';
import { Sparkles, BookOpen, PlusCircle, History, Sun, Moon } from 'lucide-react';

export default function Navbar({ activeView, setActiveView, theme, setTheme, stats }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="nav-brand" onClick={() => setActiveView('list')}>
          <div className="brand-icon">
            <Sparkles size={22} />
          </div>
          <div>
            <span className="gradient-text">QuizMaster</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', fontWeight: 500, lineHeight: 1 }}>
              Pro Assessment Engine
            </span>
          </div>
        </div>

        <nav className="nav-links">
          <button
            className={`nav-btn ${activeView === 'list' ? 'active' : ''}`}
            onClick={() => setActiveView('list')}
            id="nav-explore"
          >
            <BookOpen size={18} />
            <span>Browse Quizzes</span>
          </button>

          <button
            className={`nav-btn ${activeView === 'manage' ? 'active' : ''}`}
            onClick={() => setActiveView('manage')}
            id="nav-create"
          >
            <PlusCircle size={18} />
            <span>Create Quiz</span>
          </button>

          <button
            className={`nav-btn ${activeView === 'history' ? 'active' : ''}`}
            onClick={() => setActiveView('history')}
            id="nav-history"
          >
            <History size={18} />
            <span>Attempt History</span>
            {stats.completedCount > 0 && (
              <span className="badge badge-category" style={{ padding: '0.1rem 0.45rem', fontSize: '0.7rem' }}>
                {stats.completedCount}
              </span>
            )}
          </button>
        </nav>

        <div className="nav-actions">
          <button
            className="icon-btn"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            id="theme-toggle"
          >
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>
        </div>
      </div>
    </header>
  );
}
