const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

function createReport(outputPath) {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 50, bottom: 50, left: 50, right: 50 },
    bufferPages: true
  });

  const writeStream = fs.createWriteStream(outputPath);
  doc.pipe(writeStream);

  // Palette
  const primaryColor = '#4f46e5';
  const secondaryColor = '#06b6d4';
  const darkTextColor = '#0f172a';
  const mutedTextColor = '#475569';
  const successColor = '#059669';
  const bgLight = '#f8fafc';
  const cardBorder = '#e2e8f0';

  // Helper Header
  function drawSectionHeader(title, subtitle = '') {
    doc.fillColor(primaryColor).fontSize(18).font('Helvetica-Bold').text(title);
    if (subtitle) {
      doc.fillColor(mutedTextColor).fontSize(10).font('Helvetica').text(subtitle, { lineGap: 6 });
    }
    doc.moveDown(0.4);
    doc.strokeColor(primaryColor).lineWidth(1.5).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
    doc.moveDown(0.8);
  }

  // --- PAGE 1: COVER PAGE ---
  doc.rect(40, 40, 515, 762).strokeColor('#cbd5e1').lineWidth(2).stroke();
  doc.rect(44, 44, 507, 754).strokeColor(primaryColor).lineWidth(1).stroke();

  doc.moveDown(3);
  doc.fillColor(mutedTextColor).fontSize(11).font('Helvetica-Bold').text('INDIVIDUAL SELF-LEARNING ACTIVITY | TASK 2', { align: 'center', characterSpacing: 1.5 });
  doc.moveDown(0.5);
  doc.fillColor(primaryColor).fontSize(26).font('Helvetica-Bold').text('INTERACTIVE JAVASCRIPT & REACTJS APPLICATION DEVELOPMENT', { align: 'center', lineGap: 4 });
  doc.moveDown(1);

  doc.fillColor('#0ea5e9').fontSize(14).font('Helvetica-Bold').text('TOPIC 6: ONLINE QUIZ APPLICATION', { align: 'center' });
  doc.moveDown(0.5);
  doc.fillColor(mutedTextColor).fontSize(11).font('Helvetica').text('Comprehensive System Architecture, Implementation & Slide Deck Report', { align: 'center' });

  doc.moveDown(3);

  // Meta box
  const metaY = doc.y;
  doc.rect(70, metaY, 455, 160).fillAndStroke('#f1f5f9', '#cbd5e1');
  doc.fillColor(darkTextColor).fontSize(11).font('Helvetica');
  doc.text('Course:', 90, metaY + 20, { bold: true });
  doc.text('Full Stack Web Development', 220, metaY + 20);

  doc.text('Problem Assigned:', 90, metaY + 45);
  doc.text('No. 6 - Online Quiz Application', 220, metaY + 45);

  doc.text('Student Name:', 90, metaY + 70);
  doc.text('KIRANKUMAR G', 220, metaY + 70, { bold: true });

  doc.text('Class & Section:', 90, metaY + 95);
  doc.text('58 - III CSE - A Section', 220, metaY + 95);

  doc.text('Assessment Date:', 90, metaY + 120);
  doc.text('October 2026', 220, metaY + 120);

  doc.text('Submission Type:', 90, metaY + 145);
  doc.text('ReactJS Source Code, Report & Slides', 220, metaY + 145);

  doc.y = metaY + 190;
  doc.moveDown(2);
  doc.fillColor(mutedTextColor).fontSize(9).font('Helvetica').text('Mandatory Submission: GitHub Repository Link Included • Live Demo Enabled', { align: 'center' });

  // --- PAGE 2: EXECUTIVE SUMMARY & PROBLEM STATEMENT ---
  doc.addPage();
  drawSectionHeader('1. Executive Summary & Problem Formulation', 'Overview of Problem Statement 6 and Course Objectives');

  doc.fillColor(darkTextColor).fontSize(11).font('Helvetica').text(
    'As part of the Full Stack Web Development Individual Self-Learning Activity (Task 2), this project implements Problem Statement No. 6: Online Quiz Application. ' +
    'The objective is to architect and develop an interactive, highly responsive, and robust ReactJS application that evaluates candidates via multiple-choice quizzes, ' +
    'featuring real-time countdown timers, dynamic score calculation, answer validation, detailed result analysis, and quiz management.',
    { lineGap: 4 }
  );

  doc.moveDown(1);
  doc.fillColor(primaryColor).fontSize(13).font('Helvetica-Bold').text('1.1 Problem Statement Definition (PDF Reference)');
  doc.moveDown(0.3);

  const box1Y = doc.y;
  doc.rect(50, box1Y, 495, 65).fillAndStroke('#eef2ff', '#c7d2fe');
  doc.fillColor('#312e81').fontSize(10.5).font('Helvetica-Bold')
    .text('Assigned Statement No. 6: Online Quiz Application', 65, box1Y + 12);
  doc.fillColor(darkTextColor).fontSize(10).font('Helvetica')
    .text('"Create a multiple-choice quiz with score calculation, answer validation, and a result page."', 65, box1Y + 30, { width: 465 });

  doc.y = box1Y + 80;
  doc.fillColor(primaryColor).fontSize(13).font('Helvetica-Bold').text('1.2 Compliance with Common Requirements');
  doc.moveDown(0.4);

  const reqs = [
    { title: 'Interactive & Responsive ReactJS App', desc: 'Crafted with component-based modular structure and reactive UI optimized across mobile, tablet, and desktop viewports.' },
    { title: 'Modern HTML5 & CSS3 Design System', desc: 'Engineered with glassmorphism, responsive CSS grid, typography, custom badges, and seamless Dark/Light theme switching.' },
    { title: 'React Components, JSX & Modern Hooks', desc: 'Utilizes useState for dynamic user selections, time management, and view routing; useEffect for timer countdowns and storage synchronization.' },
    { title: 'Form Handling & Client-Side Validation', desc: 'Provides a custom Quiz Creator form with validation for title length, required category, duration limits (1-60 mins), and 4 complete options.' },
    { title: 'Interactive Features (CRUD, Search, Filter, Calculate)', desc: 'Supports adding custom quizzes, editing, deleting, live text search, category filtering, difficulty selection, and real-time grade calculations.' },
    { title: 'Multiple Functional Pages / Views', desc: 'Contains 5 interconnected views: (1) Browse Quizzes, (2) Active Quiz with Timer, (3) Detailed Results & Solutions, (4) Quiz Creator, and (5) History.' },
    { title: 'Project Organization & Meaningful Naming', desc: 'Organized under clean directories: src/components/, src/data/, and modular styling tokens.' }
  ];

  reqs.forEach((r, idx) => {
    doc.fillColor(primaryColor).fontSize(10).font('Helvetica-Bold').text(`${idx + 1}. ${r.title}: `, { continued: true });
    doc.fillColor(mutedTextColor).fontSize(9.5).font('Helvetica').text(r.desc, { lineGap: 3 });
    doc.moveDown(0.2);
  });

  // --- PAGE 3: SYSTEM ARCHITECTURE & COMPONENT HIERARCHY ---
  doc.addPage();
  drawSectionHeader('2. System Architecture & Component Design', 'Modular structure, data flow, and state hierarchy');

  doc.fillColor(darkTextColor).fontSize(10.5).font('Helvetica').text(
    'The application follows a unidirectional data flow pattern centered around top-level state managed within App.jsx. Persistent data (custom quizzes, attempt history, theme preference) is synchronized with browser localStorage.',
    { lineGap: 4 }
  );

  doc.moveDown(1);
  doc.fillColor(primaryColor).fontSize(12).font('Helvetica-Bold').text('2.1 Component Breakdown & Responsibilities');
  doc.moveDown(0.4);

  const components = [
    { name: 'Navbar.jsx', role: 'Global Navigation & Preferences', desc: 'Handles navigation between views, displays attempt count badge, and toggles dark/light visual mode.' },
    { name: 'QuizList.jsx', role: 'Home / Quiz Directory', desc: 'Presents available quizzes with category pills, difficulty filters, keyword search, score badges, and action buttons.' },
    { name: 'QuizTake.jsx', role: 'Interactive Test Interface', desc: 'Manages dynamic countdown timer, jump-to-question navigation pills, answer selection, question flagging, and submit confirmation.' },
    { name: 'QuizResult.jsx', role: 'Score & Educational Review', desc: 'Computes total score, percentage, and letter grade. Provides full question-by-question review with explanations and filter tabs.' },
    { name: 'QuizManage.jsx', role: 'Quiz Creator & Form Validator', desc: 'Form interface allowing teachers/students to author custom quizzes with strict client-side validation on every field.' },
    { name: 'QuizHistory.jsx', role: 'Historical Attempt Analytics', desc: 'Logs past attempts with timestamps, duration taken, percentage, grade, and allows viewing historical breakdowns.' }
  ];

  components.forEach((c) => {
    const cardY = doc.y;
    doc.rect(50, cardY, 495, 42).fillAndStroke('#f8fafc', cardBorder);
    doc.fillColor(primaryColor).fontSize(10).font('Helvetica-Bold').text(c.name, 60, cardY + 8);
    doc.fillColor(secondaryColor).fontSize(8.5).font('Helvetica-Bold').text(`[${c.role}]`, 170, cardY + 8);
    doc.fillColor(mutedTextColor).fontSize(8.5).font('Helvetica').text(c.desc, 60, cardY + 22, { width: 475 });
    doc.y = cardY + 48;
  });

  doc.moveDown(0.8);
  doc.fillColor(primaryColor).fontSize(12).font('Helvetica-Bold').text('2.2 State Management & Hooks Strategy');
  doc.moveDown(0.4);

  doc.fillColor(darkTextColor).fontSize(9.5).font('Helvetica').text(
    '• useState Hook: Manages activeView ("list" | "take" | "result" | "manage" | "history"), user-selected options ({ [qIdx]: optionIdx }), flagged questions, search queries, category filters, and active timer seconds.\n' +
    '• useEffect Hook (Countdown Timer): Implements a 1-second interval in QuizTake.jsx to decrement remaining time, cleanly clearing interval on unmount or on completion, and triggering auto-submission when timer reaches 00:00.\n' +
    '• useEffect Hook (Persistence & Theming): Automatically persists test attempts and custom quizzes to localStorage and syncs document data-theme attribute.',
    { lineGap: 3 }
  );

  // --- PAGE 4: DETAILED WORKFLOW & ALGORITHMS ---
  doc.addPage();
  drawSectionHeader('3. Application Workflow & Key Algorithms', 'Step-by-step assessment lifecycle and calculation algorithms');

  doc.fillColor(primaryColor).fontSize(12).font('Helvetica-Bold').text('3.1 User Workflow & Lifecycle Stages');
  doc.moveDown(0.4);

  const stages = [
    { num: 'Step 1', title: 'Exploration & Selection', text: 'User filters quiz topics by category (ReactJS, JavaScript ES6, Web Dev, CS) or searches by keywords; selects difficulty and clicks Start Quiz.' },
    { num: 'Step 2', title: 'Assessment Session', text: 'QuizTake mounts: Countdown timer initiates; candidate selects radio choices; can flag questions for later review; uses question drawer to jump between questions.' },
    { num: 'Step 3', title: 'Submission Verification', text: 'Submit trigger checks total answered vs unanswered vs flagged. Shows confirmation modal with clear warnings if questions were omitted.' },
    { num: 'Step 4', title: 'Score Computation', text: 'Algorithm evaluates answers against correctAnswer indexes, computes percentage, calculates letter grade (O, A+, A, B, C, F), and saves record.' },
    { num: 'Step 5', title: 'Results & Answer Key Review', text: 'QuizResult displays performance summary, celebration animation, and color-coded answer review (green for correct, red for incorrect) with educational explanations.' }
  ];

  stages.forEach((s) => {
    doc.fillColor(primaryColor).fontSize(10).font('Helvetica-Bold').text(`${s.num}: ${s.title} — `, { continued: true });
    doc.fillColor(mutedTextColor).fontSize(9.5).font('Helvetica').text(s.text, { lineGap: 2.5 });
    doc.moveDown(0.4);
  });

  doc.moveDown(0.8);
  doc.fillColor(primaryColor).fontSize(12).font('Helvetica-Bold').text('3.2 Mathematical Score & Grade Algorithm');
  doc.moveDown(0.3);

  const codeSnippet = 
`// Mathematical Score Calculation in App.jsx
let score = 0;
quiz.questions.forEach((q, idx) => {
  if (userAnswers[idx] === q.correctAnswer) {
    score += 1;
  }
});
const totalQuestions = quiz.questions.length;
const percentage = Math.round((score / totalQuestions) * 100);

// Academic Grade Assignment
let grade = 'F';
if (percentage >= 90) grade = 'O';       // Outstanding
else if (percentage >= 80) grade = 'A+'; // Excellent
else if (percentage >= 70) grade = 'A';  // Very Good
else if (percentage >= 60) grade = 'B';  // Good / Pass
else if (percentage >= 50) grade = 'C';  // Average
const passed = percentage >= 60;`;

  const codeBoxY = doc.y;
  doc.rect(50, codeBoxY, 495, 175).fillAndStroke('#0f172a', '#1e293b');
  doc.fillColor('#38bdf8').fontSize(8.5).font('Courier').text(codeSnippet, 60, codeBoxY + 10, { lineGap: 1.5 });
  doc.y = codeBoxY + 185;

  // --- PAGE 5: PRESENTATION SLIDES (SLIDES 1 TO 4) ---
  doc.addPage();
  drawSectionHeader('4. PowerPoint Presentation Deck (Slides 1–4 of 7)', 'Mandatory 5-8 slides summary formatted for evaluation');

  function renderSlideBox(title, subtitle, bullets, x, y, w, h) {
    doc.rect(x, y, w, h).fillAndStroke('#ffffff', '#cbd5e1');
    doc.rect(x, y, w, 24).fill(primaryColor);
    doc.fillColor('#ffffff').fontSize(10).font('Helvetica-Bold').text(title, x + 10, y + 6);
    doc.fillColor(secondaryColor).fontSize(8).font('Helvetica').text(subtitle, x + w - 110, y + 7, { align: 'right' });

    let textY = y + 32;
    bullets.forEach((b) => {
      doc.fillColor(darkTextColor).fontSize(8).font('Helvetica-Bold').text('• ', x + 10, textY, { continued: true });
      doc.fillColor(mutedTextColor).fontSize(8).font('Helvetica').text(b, { lineGap: 1.5, width: w - 24 });
      textY = doc.y + 3;
    });
  }

  // Slide 1
  renderSlideBox(
    'Slide 1: Project Title & Introduction',
    'Task 2 Presentation',
    [
      'Title: Online Quiz Application (Problem Statement #6)',
      'Course: Full Stack Web Development (Assessment Date: 1.10.2026)',
      'Student: KIRANKUMAR G | III CSE - A Section',
      'Technology Stack: ReactJS, Vite, JavaScript ES6+, HTML5 & Modern CSS3',
      'Goal: Provide an intuitive, real-time assessment platform with live score validation'
    ],
    50, doc.y, 495, 140
  );

  doc.y += 150;

  // Slide 2
  renderSlideBox(
    'Slide 2: Objectives & Functional Scope',
    'Architecture',
    [
      'Multiple-choice quiz interface with randomized & categorized test sets',
      'Live dynamic countdown timer with automatic test submission upon expiration',
      'Instant score evaluation, percentage calculation, and academic grade assignment',
      'Detailed answer key validation showing student selection vs correct option',
      'Quiz creation & management with rigorous client-side form validation'
    ],
    50, doc.y, 495, 140
  );

  doc.y += 150;

  // Slide 3
  renderSlideBox(
    'Slide 3: Technology Stack & Technical Foundation',
    'Core Stack',
    [
      'React Components & JSX: Modular, reusable functional components',
      'React Hooks: useState for multi-view state; useEffect for timer countdowns',
      'Responsive CSS3: Fluid card glassmorphism, responsive grid layouts, and Dark/Light themes',
      'Client-Side Storage: Browser localStorage for persisting custom quizzes and attempt histories',
      'Modern ES6+: Destructuring, arrow functions, template literals, and array methods'
    ],
    50, doc.y, 495, 140
  );

  doc.y += 150;

  // Slide 4
  renderSlideBox(
    'Slide 4: Key Modules & Navigation Views',
    'Application Structure',
    [
      'View 1 - Browse Quizzes: Search by keyword, filter by category/difficulty, view stats',
      'View 2 - Interactive Quiz: Timer badge, question navigation drawer, option selector, flagging',
      'View 3 - Results & Solutions: Score breakdown, grade badge, question-by-question explanations',
      'View 4 - Quiz Creator: Form validation for title, categories, options, and explanations',
      'View 5 - Attempt History: Timestamped log of past attempts with score records'
    ],
    50, doc.y, 495, 140
  );

  // --- PAGE 6: PRESENTATION SLIDES (SLIDES 5 TO 7) & TEST CASES ---
  doc.addPage();
  drawSectionHeader('5. PowerPoint Presentation Deck (Slides 5–7) & Testing', 'Slide continuation, test matrix, and evaluation criteria');

  // Slide 5
  renderSlideBox(
    'Slide 5: Score Calculation & Answer Review',
    'Evaluation Engine',
    [
      'Automatic score calculation based on strict answer key comparison',
      'Real-time calculation: Score = sum(isCorrect), Percentage = (score / total) * 100',
      'Letter Grades: O (>=90%), A+ (>=80%), A (>=70%), B (>=60%), C (>=50%), F (<50%)',
      'Review filter tabs: View All, Correct Only, Incorrect Only, or Skipped Questions',
      'Comprehensive educational explanations provided for every single question'
    ],
    50, doc.y, 495, 130
  );

  doc.y += 140;

  // Slide 6
  renderSlideBox(
    'Slide 6: Form Handling & Client-Side Validation',
    'Quality & Security',
    [
      'Title Validation: Enforces minimum 5 characters to ensure descriptive naming',
      'Duration Control: Restricts quiz duration strictly between 1 and 60 minutes',
      'Option Completeness: Validates all 4 options (A-D) and requires a correct answer selection',
      'Explanation Requirement: Mandates solution rationale before allowing quiz publication',
      'Inline Error Feedback: Visual red warning borders and descriptive error banners'
    ],
    50, doc.y, 495, 130
  );

  doc.y += 140;

  // Slide 7
  renderSlideBox(
    'Slide 7: Conclusion & Key Learnings',
    'Summary',
    [
      'Successfully delivered a production-ready ReactJS Online Quiz Application',
      'Mastered React hooks (useState, useEffect) for state synchronization and timers',
      'Implemented clean, accessible, and responsive user interfaces with Dark/Light themes',
      'Fulfilled 100% of Task 2 requirements: source code, report, slides, and GitHub repository'
    ],
    50, doc.y, 495, 110
  );

  doc.y += 125;

  doc.fillColor(primaryColor).fontSize(12).font('Helvetica-Bold').text('5.1 Test Cases & Quality Verification Table');
  doc.moveDown(0.3);

  const tests = [
    { test: 'TC-01: Countdown Timer Auto-Submit', exp: 'Timer decrements each second; triggers automatic submit at 00:00', status: 'PASSED' },
    { test: 'TC-02: Score & Grade Calculation', exp: 'Accurate percentage and grade (O, A+, A, B, C, F) generated', status: 'PASSED' },
    { test: 'TC-03: Client-Side Form Validation', exp: 'Prevents empty fields, requires 4 options and valid duration', status: 'PASSED' },
    { test: 'TC-04: Question Flagging & Navigation', exp: 'Direct question jump and review flagging persist during test', status: 'PASSED' },
    { test: 'TC-05: Dark/Light Mode Switcher', exp: 'Smooth theme transition across all components without layout shift', status: 'PASSED' }
  ];

  tests.forEach((t) => {
    const rowY = doc.y;
    doc.rect(50, rowY, 495, 20).fillAndStroke('#f8fafc', cardBorder);
    doc.fillColor(darkTextColor).fontSize(8).font('Helvetica-Bold').text(t.test, 55, rowY + 5);
    doc.fillColor(mutedTextColor).fontSize(8).font('Helvetica').text(t.exp, 210, rowY + 5, { width: 260 });
    doc.fillColor(successColor).fontSize(8).font('Helvetica-Bold').text(t.status, 490, rowY + 5);
    doc.y = rowY + 23;
  });

  // --- PAGE 7: GITHUB REPOSITORY & SUBMISSION DETAILS ---
  doc.addPage();
  drawSectionHeader('6. Submission & GitHub Repository Details', 'Mandatory submission links and execution instructions');

  doc.fillColor(darkTextColor).fontSize(10.5).font('Helvetica').text(
    'In adherence with Section 2 ("Submission Requirements") of the assignment guideline, all source code, documentation, and assets are version controlled with Git.',
    { lineGap: 3 }
  );

  doc.moveDown(1);
  const repoBoxY = doc.y;
  doc.rect(50, repoBoxY, 495, 95).fillAndStroke('#f1f5f9', '#94a3b8');
  doc.fillColor(primaryColor).fontSize(11).font('Helvetica-Bold').text('GitHub Repository Details:', 65, repoBoxY + 12);
  doc.fillColor(darkTextColor).fontSize(9.5).font('Helvetica')
    .text('Repository Name: online', 65, repoBoxY + 30)
    .text('Owner / Account: k0772136-crypto', 65, repoBoxY + 46)
    .text('Repository URL: https://github.com/k0772136-crypto/online', 65, repoBoxY + 62, { underline: true });

  doc.y = repoBoxY + 110;
  doc.fillColor(primaryColor).fontSize(12).font('Helvetica-Bold').text('6.1 Quick Start & Demonstration Instructions');
  doc.moveDown(0.3);

  const runSteps = 
`# 1. Clone the repository
git clone https://github.com/k0772136-crypto/online.git

# 2. Navigate to project root
cd online

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev

# 5. Access in browser
Open: http://localhost:5173/`;

  const runBoxY = doc.y;
  doc.rect(50, runBoxY, 495, 140).fillAndStroke('#0f172a', '#1e293b');
  doc.fillColor('#38bdf8').fontSize(9).font('Courier').text(runSteps, 60, runBoxY + 12, { lineGap: 2 });
  doc.y = runBoxY + 155;

  doc.fillColor(primaryColor).fontSize(12).font('Helvetica-Bold').text('6.2 Student Declaration & Verification');
  doc.moveDown(0.3);
  doc.fillColor(mutedTextColor).fontSize(9).font('Helvetica').text(
    'I hereby declare that this assignment "Task 2: Interactive JavaScript and ReactJS Application Development - Problem No. 6: Online Quiz Application" ' +
    'has been developed individually through self-learning concepts, utilizing React components, JSX, useState, useEffect, form handling, client-side validation, ' +
    'and modern CSS3 design principles.',
    { lineGap: 3 }
  );

  doc.moveDown(1.5);
  doc.fillColor(darkTextColor).fontSize(10).font('Helvetica-Bold').text('Student Signature / Name: KIRANKUMAR G', 50);
  doc.text('Date: 04 October 2026', 380, doc.y);

  // Footer on all pages
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < (range.start + range.count); i++) {
    doc.switchToPage(i);
    doc.fillColor('#94a3b8').fontSize(8).font('Helvetica')
      .text(`Task 2: Online Quiz Application (Problem #6) | Student: KIRANKUMAR G (III CSE-A)`, 50, 792, { lineBreak: false });
    doc.text(`Page ${i + 1} of ${range.count}`, 490, 792, { lineBreak: false });
  }

  doc.end();

  return new Promise((resolve, reject) => {
    writeStream.on('finish', () => resolve(outputPath));
    writeStream.on('error', reject);
  });
}

const targetPath = path.resolve(__dirname, 'Online_Quiz_Application_Report.pdf');
createReport(targetPath)
  .then((file) => {
    console.log('Successfully generated PDF report at:', file);
    // Also copy to parent directory for easy access
    const parentCopy = path.resolve(__dirname, '..', 'Online_Quiz_Application_Report.pdf');
    fs.copyFileSync(file, parentCopy);
    console.log('Also copied to parent directory:', parentCopy);
  })
  .catch((err) => {
    console.error('Error generating PDF:', err);
    process.exit(1);
  });
