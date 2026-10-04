# Online Quiz Application 🚀
> **Task 2: Interactive JavaScript and ReactJS Application Development**  
> **Course:** Full Stack Web Development  
> **Assigned Problem Statement #6:** Online Quiz Application  
> **Student:** KIRANKUMAR G (58 - III CSE - A Section)

---

## 🌟 Overview
QuizMaster Pro is an interactive, fully responsive assessment application built with **ReactJS**, **JavaScript (ES6+)**, and **HTML5/CSS3**. It provides candidates and instructors with a rich environment to explore quizzes, take timed assessments with instant answer validation, receive automatic score calculations and academic grades, review solutions with in-depth conceptual explanations, and create custom quizzes with client-side form validation.

---

## 🎯 Key Features & Requirements Compliance

| Requirement from Task 2 PDF | Implementation in this Project |
| :--- | :--- |
| **Interactive & Responsive ReactJS App** | Modular functional components with responsive layouts for mobile, tablet, and desktop viewports. |
| **HTML5 & CSS3 Design System** | Glassmorphism, smooth animations, responsive CSS grid, modern typography, and Dark/Light mode theme switching. |
| **React Hooks (`useState`, `useEffect`)** | `useState` for active view routing, answer selections, and filters; `useEffect` for real-time countdown timer & localStorage sync. |
| **Form Handling & Client-Side Validation** | Quiz Creator form validating title length (>=5 chars), category, duration limits (1–60 mins), 4 complete options, correct answer selection, and explanations. |
| **Interactive Features (CRUD, Search, Filter, Calculate)** | Add, edit, and delete custom quizzes; real-time keyword search; category filtering (ReactJS, ES6+, Web Dev, DSA); difficulty filters; dynamic score, percentage & grade calculations. |
| **At Least 3 Functional Views / Pages** | **5 Interconnected Views:**<br>1. *Browse Quizzes* (Search, filter, quiz cards & statistics)<br>2. *Active Quiz Taking* (Countdown timer, question jumper, option selector, flagging)<br>3. *Results & Solutions* (Score breakdown, celebration confetti, color-coded answer key with explanations)<br>4. *Quiz Creator* (Client-side validated authoring form)<br>5. *Attempt History* (Timestamped logs of all past tests) |
| **Meaningful Component Names & Clear Structure** | Clean directory layout (`src/components/`, `src/data/`, `src/assets/`). |

---

## 🏗️ Project Architecture

```
online-quiz-app/
├── public/                     # Static assets & favicon
├── src/
│   ├── assets/                 # SVGs and images
│   ├── components/
│   │   ├── Navbar.jsx          # Header, view navigation & Dark/Light mode toggle
│   │   ├── QuizList.jsx        # Quiz directory, search, category & difficulty filters
│   │   ├── QuizTake.jsx        # Timed test interface, question jumper & flagging
│   │   ├── QuizResult.jsx      # Score calculation, confetti, and answer explanations
│   │   ├── QuizManage.jsx      # Quiz creator/editor with form validation
│   │   └── QuizHistory.jsx     # Historical assessment records
│   ├── data/
│   │   └── defaultQuizzes.js   # Preloaded quizzes across 4 major technical domains
│   ├── App.jsx                 # Central state manager, scoring algorithm & view router
│   ├── index.css               # Design system tokens, glassmorphism & responsive CSS
│   └── main.jsx                # React application entry point
├── generate_report_pdf.cjs     # Automated PDF report & slide deck generator
├── Online_Quiz_Application_Report.pdf # 7-page submission project report
├── package.json
└── README.md
```

---

## 💻 Quick Start & Running Locally

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Setup Instructions
```bash
# 1. Clone the repository
git clone https://github.com/k0772136-crypto/online.git

# 2. Navigate to project root
cd online

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev

# 5. Open in browser
# Navigate to: http://localhost:5173
```

---

## 📊 Score Calculation & Grading Scheme

The application computes results instantaneously upon submission or timer expiration:
$$\text{Percentage} = \left(\frac{\text{Correct Answers}}{\text{Total Questions}}\right) \times 100$$

- **Grade O (Outstanding):** $\ge 90\%$
- **Grade A+ (Excellent):** $80\% - 89\%$
- **Grade A (Very Good):** $70\% - 79\%$
- **Grade B (Good / Pass):** $60\% - 69\%$
- **Grade C (Average):** $50\% - 59\%$
- **Grade F (Needs Review):** $< 50\%$

---

## 📄 Submission Artifacts
- **Project Report & Slides (PDF):** `Online_Quiz_Application_Report.pdf` (Included in root directory)
- **GitHub Repository:** [https://github.com/kirang151205/online](https://github.com/kirang151205/online)
