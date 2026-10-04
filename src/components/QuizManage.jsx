import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, ArrowLeft, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';

export default function QuizManage({ editingQuiz, onSaveQuiz, onCancel }) {
  const isEditing = Boolean(editingQuiz);

  const [formData, setFormData] = useState({
    id: editingQuiz ? editingQuiz.id : `custom-${Date.now()}`,
    title: editingQuiz ? editingQuiz.title : '',
    category: editingQuiz ? editingQuiz.category : 'ReactJS',
    difficulty: editingQuiz ? editingQuiz.difficulty : 'Medium',
    durationMinutes: editingQuiz ? editingQuiz.durationMinutes : 5,
    description: editingQuiz ? editingQuiz.description : '',
    isCustom: true,
    questions: editingQuiz ? editingQuiz.questions : [
      {
        id: `q-${Date.now()}-1`,
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: ''
      },
      {
        id: `q-${Date.now()}-2`,
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: ''
      }
    ]
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);

  // Form validation function
  const validateForm = (data) => {
    const errs = {};

    if (!data.title || data.title.trim().length < 5) {
      errs.title = 'Quiz title must be at least 5 characters long';
    }

    if (!data.category || data.category.trim().length === 0) {
      errs.category = 'Category is required';
    }

    if (!data.durationMinutes || data.durationMinutes < 1 || data.durationMinutes > 60) {
      errs.durationMinutes = 'Duration must be between 1 and 60 minutes';
    }

    if (!data.description || data.description.trim().length < 10) {
      errs.description = 'Please provide a descriptive summary (at least 10 characters)';
    }

    if (!data.questions || data.questions.length < 2) {
      errs.questions = 'A quiz must contain at least 2 questions';
    } else {
      data.questions.forEach((q, qIndex) => {
        if (!q.question || q.question.trim().length < 5) {
          errs[`q_${qIndex}_title`] = `Question ${qIndex + 1} text is required (min 5 chars)`;
        }

        q.options.forEach((opt, oIndex) => {
          if (!opt || opt.trim().length === 0) {
            errs[`q_${qIndex}_opt_${oIndex}`] = `Option ${String.fromCharCode(65 + oIndex)} cannot be blank`;
          }
        });

        if (q.correctAnswer === undefined || q.correctAnswer < 0 || q.correctAnswer > 3) {
          errs[`q_${qIndex}_correct`] = `Please select the correct answer for Question ${qIndex + 1}`;
        }

        if (!q.explanation || q.explanation.trim().length < 5) {
          errs[`q_${qIndex}_explanation`] = `Explanation is required for Question ${qIndex + 1}`;
        }
      });
    }

    return errs;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (touched) setErrors(validateForm(updated));
      return updated;
    });
  };

  // Question editing handlers
  const handleQuestionTextChange = (qIndex, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[qIndex].question = value;
    handleQuestionsUpdate(updatedQuestions);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    handleQuestionsUpdate(updatedQuestions);
  };

  const handleCorrectAnswerChange = (qIndex, optIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[qIndex].correctAnswer = optIndex;
    handleQuestionsUpdate(updatedQuestions);
  };

  const handleExplanationChange = (qIndex, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[qIndex].explanation = value;
    handleQuestionsUpdate(updatedQuestions);
  };

  const handleAddQuestion = () => {
    const newQ = {
      id: `q-${Date.now()}-${formData.questions.length + 1}`,
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    };
    handleQuestionsUpdate([...formData.questions, newQ]);
  };

  const handleRemoveQuestion = (index) => {
    if (formData.questions.length <= 2) {
      alert('A quiz requires a minimum of 2 questions.');
      return;
    }
    const updated = formData.questions.filter((_, idx) => idx !== index);
    handleQuestionsUpdate(updated);
  };

  const handleQuestionsUpdate = (newQuestions) => {
    setFormData((prev) => {
      const updated = { ...prev, questions: newQuestions };
      if (touched) setErrors(validateForm(updated));
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    const formErrors = validateForm(formData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      const firstError = Object.values(formErrors)[0];
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    onSaveQuiz(formData);
  };

  return (
    <div className="fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <button
          onClick={onCancel}
          style={{ background: 'transparent', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}
        >
          <ArrowLeft size={18} /> Cancel & Back
        </button>
        <h2 style={{ fontSize: '1.5rem' }}>
          {isEditing ? 'Edit Quiz Problem' : 'Create Custom Quiz'}
        </h2>
      </div>

      {Object.keys(errors).length > 0 && touched && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid #ef4444',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center',
          color: '#ef4444'
        }}>
          <AlertCircle size={20} style={{ flexShrink: 0 }} />
          <div>
            <strong>Please resolve validation errors before saving:</strong>
            <ul style={{ marginTop: '0.4rem', marginLeft: '1.25rem', fontSize: '0.85rem' }}>
              {Object.values(errors).slice(0, 3).map((err, i) => (
                <li key={i}>{err}</li>
              ))}
              {Object.keys(errors).length > 3 && (
                <li>...and {Object.keys(errors).length - 3} other field errors.</li>
              )}
            </ul>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Basic Details Card */}
        <div className="glass-card" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            1. Quiz Overview & Metadata
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
            {/* Title */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                Quiz Title *
              </label>
              <input
                type="text"
                placeholder="e.g., Advanced Asynchronous JavaScript"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-surface)',
                  border: errors.title ? '1px solid #ef4444' : '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem'
                }}
                id="form-quiz-title"
              />
              {errors.title && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>{errors.title}</span>}
            </div>

            {/* Category */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem'
                }}
                id="form-quiz-category"
              >
                <option value="ReactJS">ReactJS</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Web Development">Web Development</option>
                <option value="Computer Science">Computer Science</option>
                <option value="General Engineering">General Engineering</option>
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                Difficulty Level *
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => handleInputChange('difficulty', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem'
                }}
                id="form-quiz-difficulty"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            {/* Duration */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                Time Limit (Minutes) *
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={formData.durationMinutes}
                onChange={(e) => handleInputChange('durationMinutes', parseInt(e.target.value) || 1)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-surface)',
                  border: errors.durationMinutes ? '1px solid #ef4444' : '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem'
                }}
                id="form-quiz-duration"
              />
              {errors.durationMinutes && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>{errors.durationMinutes}</span>}
            </div>

            {/* Description */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                Short Description / Syllabus *
              </label>
              <textarea
                rows="2"
                placeholder="Briefly describe what candidates will learn or be evaluated on..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-surface)',
                  border: errors.description ? '1px solid #ef4444' : '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem'
                }}
                id="form-quiz-desc"
              />
              {errors.description && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>{errors.description}</span>}
            </div>
          </div>
        </div>

        {/* Dynamic Questions Builder */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.25rem' }}>
              2. Multiple Choice Questions ({formData.questions.length})
            </h3>
            <button
              type="button"
              className="btn-secondary"
              onClick={handleAddQuestion}
              style={{ fontSize: '0.85rem' }}
              id="add-question-btn"
            >
              <Plus size={16} /> Add Question
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {formData.questions.map((q, qIndex) => {
              const letters = ['A', 'B', 'C', 'D'];

              return (
                <div key={q.id || qIndex} className="glass-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-md)', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span className="badge badge-category">
                      Question #{qIndex + 1}
                    </span>
                    {formData.questions.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveQuestion(qIndex)}
                        className="icon-btn"
                        style={{ color: 'var(--danger)', width: '32px', height: '32px' }}
                        title="Delete this question"
                        id={`delete-question-btn-${qIndex}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  {/* Question Text */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                      Question Prompt *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter multiple-choice question problem statement..."
                      value={q.question}
                      onChange={(e) => handleQuestionTextChange(qIndex, e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-surface)',
                        border: errors[`q_${qIndex}_title`] ? '1px solid #ef4444' : '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        fontSize: '0.95rem'
                      }}
                      id={`q-text-${qIndex}`}
                    />
                    {errors[`q_${qIndex}_title`] && (
                      <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>
                        {errors[`q_${qIndex}_title`]}
                      </span>
                    )}
                  </div>

                  {/* Options (A, B, C, D) */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                      Options & Select Correct Answer (Click radio to mark as correct) *
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
                      {q.options.map((opt, optIndex) => {
                        const isCorrect = q.correctAnswer === optIndex;
                        return (
                          <div
                            key={optIndex}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.75rem',
                              background: isCorrect ? 'rgba(16,185,129,0.08)' : 'var(--bg-surface)',
                              border: isCorrect ? '1px solid #10b981' : '1px solid var(--border-color)',
                              padding: '0.5rem 0.75rem',
                              borderRadius: 'var(--radius-sm)'
                            }}
                          >
                            <input
                              type="radio"
                              name={`correct-answer-${qIndex}`}
                              checked={isCorrect}
                              onChange={() => handleCorrectAnswerChange(qIndex, optIndex)}
                              style={{ width: '18px', height: '18px', accentColor: '#10b981', cursor: 'pointer' }}
                              id={`radio-${qIndex}-${optIndex}`}
                            />
                            <span style={{ fontWeight: 700, width: '24px', color: isCorrect ? '#10b981' : 'var(--text-muted)' }}>
                              {letters[optIndex]}.
                            </span>
                            <input
                              type="text"
                              placeholder={`Option ${letters[optIndex]} text...`}
                              value={opt}
                              onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                              style={{
                                flex: 1,
                                padding: '0.5rem 0.75rem',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-primary)',
                                fontSize: '0.9rem'
                              }}
                              id={`q-opt-${qIndex}-${optIndex}`}
                            />
                            {isCorrect && (
                              <span style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                                Correct Answer
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Explanation */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                      Answer Explanation & Key Concepts *
                    </label>
                    <textarea
                      rows="2"
                      placeholder="Explain why the marked answer is correct so students learn from their review..."
                      value={q.explanation}
                      onChange={(e) => handleExplanationChange(qIndex, e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-surface)',
                        border: errors[`q_${qIndex}_explanation`] ? '1px solid #ef4444' : '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem'
                      }}
                      id={`q-exp-${qIndex}`}
                    />
                    {errors[`q_${qIndex}_explanation`] && (
                      <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>
                        {errors[`q_${qIndex}_explanation`]}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingBottom: '3rem' }}>
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" id="save-quiz-submit-btn">
            <Save size={18} /> {isEditing ? 'Update Quiz' : 'Save & Publish Quiz'}
          </button>
        </div>
      </form>
    </div>
  );
}
