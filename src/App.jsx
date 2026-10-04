import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import QuizList from './components/QuizList';
import QuizTake from './components/QuizTake';
import QuizResult from './components/QuizResult';
import QuizManage from './components/QuizManage';
import QuizHistory from './components/QuizHistory';
import { DEFAULT_QUIZZES } from './data/defaultQuizzes';

const STORAGE_KEY_QUIZZES = 'quizmaster_custom_quizzes_v1';
const STORAGE_KEY_HISTORY = 'quizmaster_history_v1';
const STORAGE_KEY_THEME = 'quizmaster_theme_v1';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_THEME) || 'dark';
  });

  const [quizzes, setQuizzes] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_QUIZZES);
      if (stored) {
        const parsed = JSON.parse(stored);
        return [...DEFAULT_QUIZZES, ...parsed];
      }
    } catch (e) {
      console.error('Failed to load stored quizzes', e);
    }
    return DEFAULT_QUIZZES;
  });

  const [history, setHistory] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_HISTORY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to load history', e);
    }
    return [];
  });

  const [activeView, setActiveView] = useState('list'); // 'list', 'take', 'result', 'manage', 'history'
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [currentResult, setCurrentResult] = useState(null);

  // Sync theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY_THEME, theme);
  }, [theme]);

  // Sync history to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history));
  }, [history]);

  // Start taking a quiz
  const handleStartQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setActiveView('take');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit quiz and calculate score
  const handleSubmitQuiz = ({ quiz, userAnswers, timeSpentSeconds }) => {
    let score = 0;
    quiz.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        score += 1;
      }
    });

    const totalQuestions = quiz.questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);

    let grade = 'F';
    if (percentage >= 90) grade = 'O';
    else if (percentage >= 80) grade = 'A+';
    else if (percentage >= 70) grade = 'A';
    else if (percentage >= 60) grade = 'B';
    else if (percentage >= 50) grade = 'C';

    const passed = percentage >= 60;

    const resultRecord = {
      id: `attempt-${Date.now()}`,
      quizId: quiz.id,
      quizTitle: quiz.title,
      quizCategory: quiz.category,
      score,
      totalQuestions,
      percentage,
      grade,
      passed,
      timeSpentSeconds,
      timestamp: new Date().toISOString(),
      quiz,
      userAnswers
    };

    setCurrentResult(resultRecord);
    setHistory((prev) => [resultRecord, ...prev]);
    setActiveView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save Quiz (Add or Edit)
  const handleSaveQuiz = (quizData) => {
    setQuizzes((prev) => {
      const isExisting = prev.some((q) => q.id === quizData.id);
      let updated;
      if (isExisting) {
        updated = prev.map((q) => (q.id === quizData.id ? quizData : q));
      } else {
        updated = [quizData, ...prev];
      }

      // Save custom ones to localStorage
      const customOnly = updated.filter((q) => q.isCustom);
      localStorage.setItem(STORAGE_KEY_QUIZZES, JSON.stringify(customOnly));
      return updated;
    });

    setEditingQuiz(null);
    setActiveView('list');
  };

  // Delete Quiz
  const handleDeleteQuiz = (quizId) => {
    if (window.confirm('Are you sure you want to permanently delete this custom quiz?')) {
      setQuizzes((prev) => {
        const filtered = prev.filter((q) => q.id !== quizId);
        const customOnly = filtered.filter((q) => q.isCustom);
        localStorage.setItem(STORAGE_KEY_QUIZZES, JSON.stringify(customOnly));
        return filtered;
      });
    }
  };

  // Edit Quiz Trigger
  const handleEditQuiz = (quiz) => {
    setEditingQuiz(quiz);
    setActiveView('manage');
  };

  // Clear History
  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your entire assessment attempt history?')) {
      setHistory([]);
      localStorage.removeItem(STORAGE_KEY_HISTORY);
    }
  };

  // View Past Result
  const handleViewPastResult = (historyItem) => {
    setCurrentResult(historyItem);
    setActiveView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      <Navbar
        activeView={activeView}
        setActiveView={(view) => {
          if (view === 'manage') setEditingQuiz(null);
          setActiveView(view);
        }}
        theme={theme}
        setTheme={setTheme}
        stats={{ completedCount: history.length }}
      />

      <main className="main-content">
        {activeView === 'list' && (
          <QuizList
            quizzes={quizzes}
            onStartQuiz={handleStartQuiz}
            onEditQuiz={handleEditQuiz}
            onDeleteQuiz={handleDeleteQuiz}
            history={history}
          />
        )}

        {activeView === 'take' && activeQuiz && (
          <QuizTake
            quiz={activeQuiz}
            onSubmitQuiz={handleSubmitQuiz}
            onExitQuiz={() => setActiveView('list')}
          />
        )}

        {activeView === 'result' && currentResult && (
          <QuizResult
            result={currentResult}
            onRetakeQuiz={() => handleStartQuiz(currentResult.quiz)}
            onBackToLibrary={() => setActiveView('list')}
          />
        )}

        {activeView === 'manage' && (
          <QuizManage
            editingQuiz={editingQuiz}
            onSaveQuiz={handleSaveQuiz}
            onCancel={() => {
              setEditingQuiz(null);
              setActiveView('list');
            }}
          />
        )}

        {activeView === 'history' && (
          <QuizHistory
            history={history}
            onClearHistory={handleClearHistory}
            onViewPastResult={handleViewPastResult}
            onStartQuiz={handleStartQuiz}
            quizzes={quizzes}
          />
        )}
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '2rem 1rem',
        borderTop: '1px solid var(--border-color)',
        color: 'var(--text-muted)',
        fontSize: '0.85rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <strong>Full Stack Web Development</strong> • Task 2 Assignment
          </div>
          <div>
            Topic 6: Online Quiz Application (ReactJS, JavaScript ES6+, HTML5/CSS3)
          </div>
          <div>
            Student: <strong>KIRANKUMAR G</strong> (III CSE-A)
          </div>
        </div>
      </footer>
    </div>
  );
}
