export const DEFAULT_QUIZZES = [
  {
    id: "quiz-react-101",
    title: "ReactJS Core Concepts & Hooks",
    category: "ReactJS",
    difficulty: "Medium",
    durationMinutes: 5,
    description: "Test your understanding of JSX, React component lifecycles, useState, useEffect, and state immutability.",
    icon: "atom",
    questions: [
      {
        id: "q1",
        question: "What is the primary purpose of the useEffect hook in React?",
        options: [
          "To directly mutate the DOM without React knowing",
          "To perform side effects such as data fetching, subscriptions, or manual DOM manipulations",
          "To replace all React component props with local state",
          "To automatically re-render components every millisecond"
        ],
        correctAnswer: 1,
        explanation: "useEffect lets you perform side effects in function components, including data fetching, setting up subscriptions, and synchronizing with external APIs."
      },
      {
        id: "q2",
        question: "Which of the following statements about React State is correct?",
        options: [
          "State should be directly mutated using this.state = newValue",
          "State updates via useState setter functions may be asynchronous and batched",
          "State is shared globally across all unrelated components by default",
          "Updating state does not trigger a re-render of the component"
        ],
        correctAnswer: 1,
        explanation: "React batches state updates for performance, which means state updates can be asynchronous. You should treat state as immutable and update it with the setter function."
      },
      {
        id: "q3",
        question: "Why should keys be provided when rendering a dynamic list in React?",
        options: [
          "Keys are required by CSS to apply list styling",
          "Keys help React identify which items have changed, been added, or been removed during reconciliation",
          "Keys encrypt component data in the browser memory",
          "Keys allow direct access to database row indexes"
        ],
        correctAnswer: 1,
        explanation: "Keys give elements a stable identity across renders, enabling React's virtual DOM reconciliation algorithm to efficiently match and update elements."
      },
      {
        id: "q4",
        question: "What will happen if you omit the dependency array in a useEffect hook?",
        options: [
          "The effect runs only once when the component mounts",
          "The effect runs after every single render of the component",
          "The effect is completely disabled and never executes",
          "A compilation syntax error will crash the app"
        ],
        correctAnswer: 1,
        explanation: "When no dependency array is passed (not even an empty array []), the effect callback executes after the initial render and after every subsequent component update."
      },
      {
        id: "q5",
        question: "What is JSX in the context of React?",
        options: [
          "A database query language for querying JSON objects",
          "A syntax extension for JavaScript that looks similar to HTML and compiles to React.createElement()",
          "A server-side programming language replacing Node.js",
          "A replacement for modern CSS layout stylesheets"
        ],
        correctAnswer: 1,
        explanation: "JSX stands for JavaScript XML. It is syntactic sugar that allows developers to write HTML-like markup inside JavaScript files, which compilers transform into React.createElement calls."
      }
    ]
  },
  {
    id: "quiz-js-es6",
    title: "JavaScript ES6+ Modern Features",
    category: "JavaScript",
    difficulty: "Easy",
    durationMinutes: 4,
    description: "Challenge yourself on Arrow Functions, Destructuring, Promises, Template Literals, and Array methods.",
    icon: "code",
    questions: [
      {
        id: "js1",
        question: "How do Arrow Functions differ from regular functions regarding the 'this' keyword?",
        options: [
          "Arrow functions have their own dynamically bound 'this'",
          "Arrow functions do not bind their own 'this'; they inherit it lexically from the enclosing scope",
          "Arrow functions always set 'this' to undefined",
          "Arrow functions only accept 'this' as an explicit parameter"
        ],
        correctAnswer: 1,
        explanation: "Arrow functions do not have their own 'this' binding. They capture the 'this' value of the enclosing lexical execution context."
      },
      {
        id: "js2",
        question: "What is the output of the spread operator: [...[1, 2], ...[3, 4]]?",
        options: [
          "[[1, 2], [3, 4]]",
          "[1, 2, 3, 4]",
          "{1: 2, 3: 4}",
          "Error: Invalid syntax"
        ],
        correctAnswer: 1,
        explanation: "The spread operator (...) expands the elements of arrays into a newly constructed flat array [1, 2, 3, 4]."
      },
      {
        id: "js3",
        question: "Which array method returns a brand new array with transformed elements?",
        options: [
          "Array.prototype.forEach()",
          "Array.prototype.map()",
          "Array.prototype.some()",
          "Array.prototype.push()"
        ],
        correctAnswer: 1,
        explanation: "map() creates a new array populated with the results of calling a provided callback function on every element in the calling array."
      },
      {
        id: "js4",
        question: "What state is a JavaScript Promise in initially before resolution or rejection?",
        options: [
          "Fulfilled",
          "Pending",
          "Settled",
          "Terminated"
        ],
        correctAnswer: 1,
        explanation: "A Promise is in the 'pending' state initially, and later transitions to either 'fulfilled' (resolved) or 'rejected'."
      },
      {
        id: "js5",
        question: "What is the key difference between 'let' and 'const' declarations in JavaScript?",
        options: [
          "'let' is block-scoped, while 'const' is global-scoped",
          "Variables declared with 'let' can be reassigned, whereas 'const' cannot be reassigned",
          "'const' values are completely immutable and cannot mutate object properties",
          "'let' does not support hoisting in any environment"
        ],
        correctAnswer: 1,
        explanation: "Identifiers declared with 'const' cannot be reassigned to a new value; however, if the value is an object or array, its properties/items can still be modified."
      }
    ]
  },
  {
    id: "quiz-web-css",
    title: "HTML5, CSS3 & Responsive Web Design",
    category: "Web Development",
    difficulty: "Medium",
    durationMinutes: 5,
    description: "Test your skills on Flexbox, CSS Grid, Semantic HTML5 tags, and responsive viewport media queries.",
    icon: "layout",
    questions: [
      {
        id: "css1",
        question: "Which HTML5 semantic element is most appropriate for a standalone section of syndicateable content like a blog post?",
        options: [
          "<div>",
          "<article>",
          "<aside>",
          "<section>"
        ],
        correctAnswer: 1,
        explanation: "<article> represents a self-contained composition in a document, page, application, or site, intended to be independently distributable or reusable."
      },
      {
        id: "css2",
        question: "In CSS Flexbox, which property aligns items along the cross axis?",
        options: [
          "justify-content",
          "align-items",
          "flex-direction",
          "flex-wrap"
        ],
        correctAnswer: 1,
        explanation: "'justify-content' aligns along the main axis, while 'align-items' controls alignment along the perpendicular cross axis."
      },
      {
        id: "css3",
        question: "What does CSS 'box-sizing: border-box' ensure?",
        options: [
          "Borders are removed from all elements",
          "Padding and border are included inside the element's total specified width and height",
          "Margins are automatically doubled",
          "Only inline elements are affected"
        ],
        correctAnswer: 1,
        explanation: "With 'border-box', an element's padding and border values are factored into the total calculated width and height rather than added to the exterior."
      },
      {
        id: "css4",
        question: "Which CSS media query targets screen widths of 768px and narrower?",
        options: [
          "@media (min-width: 768px)",
          "@media (max-width: 768px)",
          "@media screen and (orientation: landscape)",
          "@media only (device-width: 768px)"
        ],
        correctAnswer: 1,
        explanation: "'@media (max-width: 768px)' applies CSS rules to viewports that are at most 768 pixels wide (e.g. mobile devices and small tablets)."
      },
      {
        id: "css5",
        question: "What CSS Grid property defines explicitly named columns with flexible fractional sizing?",
        options: [
          "grid-template-columns: repeat(3, 1fr)",
          "column-count: 3",
          "display: inline-grid-columns",
          "flex: 1 1 33%"
        ],
        correctAnswer: 0,
        explanation: "'grid-template-columns: repeat(3, 1fr)' creates 3 equal columns that dynamically divide available container space using fractional units."
      }
    ]
  },
  {
    id: "quiz-dsa-101",
    title: "Data Structures & Algorithms Basics",
    category: "Computer Science",
    difficulty: "Hard",
    durationMinutes: 6,
    description: "Evaluate your problem-solving foundations: Stacks, Queues, Binary Trees, and Big-O time complexity.",
    icon: "cpu",
    questions: [
      {
        id: "dsa1",
        question: "What is the worst-case time complexity of searching an element in a balanced Binary Search Tree (BST)?",
        options: [
          "O(1)",
          "O(log N)",
          "O(N)",
          "O(N log N)"
        ],
        correctAnswer: 1,
        explanation: "In a balanced BST with N nodes, tree height is log2(N), making lookup operations take O(log N) time."
      },
      {
        id: "dsa2",
        question: "Which data structure follows the LIFO (Last-In, First-Out) principle?",
        options: [
          "Queue",
          "Stack",
          "Linked List",
          "Hash Map"
        ],
        correctAnswer: 1,
        explanation: "A Stack adheres to Last-In, First-Out (LIFO), where the most recently inserted item is the first one removed."
      },
      {
        id: "dsa3",
        question: "Which sorting algorithm exhibits an average time complexity of O(N log N) and uses divide-and-conquer?",
        options: [
          "Bubble Sort",
          "Merge Sort",
          "Selection Sort",
          "Insertion Sort"
        ],
        correctAnswer: 1,
        explanation: "Merge Sort recursively splits the collection into halves and merges sorted sub-arrays, guaranteeing O(N log N) time in all cases."
      },
      {
        id: "dsa4",
        question: "What is the primary advantage of a Hash Table over an Array for key-value retrieval?",
        options: [
          "Hash tables maintain strict numerical ordering of elements",
          "Hash tables offer average O(1) constant time lookups by hashing keys",
          "Hash tables never consume memory when empty",
          "Hash tables do not experience collision scenarios"
        ],
        correctAnswer: 1,
        explanation: "Hash tables compute array indices via a hash function, achieving average O(1) constant time insertion, lookup, and deletion."
      },
      {
        id: "dsa5",
        question: "Which data structure is typically used to implement Breadth-First Search (BFS) graph traversal?",
        options: [
          "Stack",
          "Queue",
          "Priority Heap",
          "Binary Search Tree"
        ],
        correctAnswer: 1,
        explanation: "Breadth-First Search utilizes a FIFO (First-In, First-Out) Queue to explore neighbor nodes level by level."
      }
    ]
  }
];
