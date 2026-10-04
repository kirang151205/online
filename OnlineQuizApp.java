import java.io.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

/**
 * Task 2 - Problem Statement No. 6: Online Quiz Application
 * Implementation in Java (JDK 26 / Standard Java SE)
 * 
 * Features:
 *  - Multiple-choice questions with 4 options (A, B, C, D)
 *  - Real-time score calculation and percentage evaluation
 *  - Answer validation with detailed educational explanations
 *  - Dynamic academic grading (O, A+, A, B, C, F)
 *  - Category selection (Java, ReactJS, Web Development, DSA)
 *  - Ability to add custom multiple-choice questions
 *  - Detailed final result page and answer review report
 * 
 * Student: KIRANKUMAR G (III CSE-A)
 */
public class OnlineQuizApp {

    // --- DATA MODEL: QUESTION ---
    static class Question {
        private String prompt;
        private List<String> options;
        private int correctAnswerIndex; // 0 to 3
        private String explanation;
        private String category;
        private String difficulty;

        public Question(String prompt, List<String> options, int correctAnswerIndex, String explanation, String category, String difficulty) {
            this.prompt = prompt;
            this.options = options;
            this.correctAnswerIndex = correctAnswerIndex;
            this.explanation = explanation;
            this.category = category;
            this.difficulty = difficulty;
        }

        public String getPrompt() { return prompt; }
        public List<String> getOptions() { return options; }
        public int getCorrectAnswerIndex() { return correctAnswerIndex; }
        public String getExplanation() { return explanation; }
        public String getCategory() { return category; }
        public String getDifficulty() { return difficulty; }
    }

    // --- DATA MODEL: QUIZ RESULT ---
    static class Result {
        String quizTitle;
        int totalQuestions;
        int correctCount;
        int incorrectCount;
        int skippedCount;
        double percentage;
        String grade;
        boolean passed;
        long timeSpentSeconds;
        List<QuestionReview> reviews = new ArrayList<>();

        static class QuestionReview {
            Question question;
            int selectedOption; // -1 for skipped
            boolean isCorrect;

            public QuestionReview(Question question, int selectedOption, boolean isCorrect) {
                this.question = question;
                this.selectedOption = selectedOption;
                this.isCorrect = isCorrect;
            }
        }
    }

    // --- REPOSITORY: PRELOADED QUESTIONS ---
    private static List<Question> createDefaultQuestionBank() {
        List<Question> list = new ArrayList<>();

        // Java Core Questions
        list.add(new Question(
            "What is the primary role of the Java Virtual Machine (JVM)?",
            Arrays.asList(
                "To compile Java source code directly into machine-dependent assembly",
                "To execute Java bytecode and provide platform independence (WORA)",
                "To manage relational database transactions",
                "To style web pages in the browser"
            ),
            1,
            "The JVM interprets and executes compiled bytecode (.class files), enabling Java's 'Write Once, Run Anywhere' capability.",
            "Java",
            "Easy"
        ));

        list.add(new Question(
            "Which Java Collection framework interface guarantees unique elements and no duplicates?",
            Arrays.asList(
                "java.util.List",
                "java.util.Set",
                "java.util.Queue",
                "java.util.ArrayList"
            ),
            1,
            "java.util.Set models the mathematical set abstraction and prohibits duplicate elements.",
            "Java",
            "Easy"
        ));

        list.add(new Question(
            "In Java memory management, where are objects dynamically allocated at runtime?",
            Arrays.asList(
                "Call Stack",
                "Heap Memory",
                "Metaspace / Method Area",
                "CPU Registers"
            ),
            1,
            "All Java objects and arrays are allocated inside the Garbage-Collected Heap memory.",
            "Java",
            "Medium"
        ));

        // ReactJS & Web Development Questions
        list.add(new Question(
            "What is the main purpose of the useEffect hook in ReactJS?",
            Arrays.asList(
                "To directly mutate the DOM without React lifecycle checks",
                "To execute side-effects like data fetching, subscriptions, and timers",
                "To convert JSON data into SQL queries",
                "To replace all CSS stylesheets"
            ),
            1,
            "useEffect enables functional React components to perform side-effects such as API calls and DOM mutations.",
            "ReactJS",
            "Medium"
        ));

        list.add(new Question(
            "Which CSS3 layout model is best suited for 1-dimensional row or column distribution?",
            Arrays.asList(
                "CSS Grid",
                "Flexbox (Flexible Box Layout)",
                "Float clearing",
                "Absolute positioning"
            ),
            1,
            "Flexbox is primarily 1-dimensional (row OR column), whereas CSS Grid is designed for 2-dimensional layouts.",
            "Web Development",
            "Easy"
        ));

        list.add(new Question(
            "What is the average time complexity of element lookup in a Java HashMap?",
            Arrays.asList(
                "O(1) Constant Time",
                "O(log N) Logarithmic Time",
                "O(N) Linear Time",
                "O(N^2) Quadratic Time"
            ),
            0,
            "HashMap provides average O(1) time complexity for get() and put() using key hashing.",
            "Data Structures",
            "Hard"
        ));

        return list;
    }

    // --- MAIN ENGINE & CONTROLLER ---
    private static final Scanner scanner = new Scanner(System.in);
    private static final List<Question> questionBank = createDefaultQuestionBank();
    private static final List<Result> history = new ArrayList<>();

    public static void main(String[] args) {
        printBanner();

        boolean running = true;
        while (running) {
            System.out.println("\n========================================================");
            System.out.println("                 MAIN ASSESSMENT MENU                  ");
            System.out.println("========================================================");
            System.out.println(" [1] Take Online Quiz (All Technical Domains)");
            System.out.println(" [2] Take Filtered Quiz by Category (Java / React / Web / DSA)");
            System.out.println(" [3] Add Custom Multiple-Choice Question (Form Validation)");
            System.out.println(" [4] View Assessment History & Past Results");
            System.out.println(" [5] View Question Bank Syllabus");
            System.out.println(" [6] Exit Application");
            System.out.print("\nPlease choose an option [1-6]: ");

            String choice = scanner.nextLine().trim();
            switch (choice) {
                case "1":
                    runQuizSession(questionBank, "Comprehensive Assessment");
                    break;
                case "2":
                    selectCategoryAndStart();
                    break;
                case "3":
                    addNewQuestionInteractive();
                    break;
                case "4":
                    displayHistory();
                    break;
                case "5":
                    displayQuestionBank();
                    break;
                case "6":
                    System.out.println("\nThank you for using QuizMaster Pro. Best of luck with your evaluation!");
                    running = false;
                    break;
                default:
                    System.out.println(" Invalid option. Please enter a number between 1 and 6.");
            }
        }
    }

    private static void printBanner() {
        System.out.println("==========================================================================");
        System.out.println("               QUIZMASTER PRO - ONLINE QUIZ APPLICATION                   ");
        System.out.println("    TASK 2: Interactive JavaScript and ReactJS / Java Implementation      ");
        System.out.println("    Course: Full Stack Web Development | Problem Statement No. 6          ");
        System.out.println("    Candidate: KIRANKUMAR G | III CSE - A Section                         ");
        System.out.println("==========================================================================");
    }

    // --- TAKE QUIZ SESSION ---
    private static void runQuizSession(List<Question> questions, String title) {
        if (questions.isEmpty()) {
            System.out.println(" No questions available for this selection.");
            return;
        }

        System.out.println("\n--------------------------------------------------------");
        System.out.println(" Starting: " + title);
        System.out.println(" Total Questions: " + questions.size());
        System.out.println(" Instructions: For each question, type A, B, C, or D (or 'S' to Skip).");
        System.out.println("--------------------------------------------------------");
        System.out.print("Press ENTER when you are ready to begin...");
        scanner.nextLine();

        long startTime = System.currentTimeMillis();
        Result result = new Result();
        result.quizTitle = title;
        result.totalQuestions = questions.size();

        char[] letterKeys = {'A', 'B', 'C', 'D'};

        for (int i = 0; i < questions.size(); i++) {
            Question q = questions.get(i);
            System.out.println("\n--------------------------------------------------------");
            System.out.printf("QUESTION %d of %d  [%s | %s]\n", (i + 1), questions.size(), q.getCategory(), q.getDifficulty());
            System.out.println("--------------------------------------------------------");
            System.out.println(q.getPrompt() + "\n");

            for (int optIdx = 0; optIdx < q.getOptions().size(); optIdx++) {
                System.out.printf("  [%c] %s\n", letterKeys[optIdx], q.getOptions().get(optIdx));
            }

            int selectedChoice = -1;
            boolean validAnswer = false;
            while (!validAnswer) {
                System.out.print("\nYour Answer [A/B/C/D or S to skip]: ");
                String input = scanner.nextLine().trim().toUpperCase();

                if (input.equals("S")) {
                    selectedChoice = -1;
                    result.skippedCount++;
                    validAnswer = true;
                    System.out.println("-> Question Skipped.");
                } else if (input.length() == 1 && input.charAt(0) >= 'A' && input.charAt(0) <= 'D') {
                    selectedChoice = input.charAt(0) - 'A';
                    if (selectedChoice < q.getOptions().size()) {
                        validAnswer = true;
                        if (selectedChoice == q.getCorrectAnswerIndex()) {
                            result.correctCount++;
                            System.out.println("-> Recorded Choice: " + input);
                        } else {
                            result.incorrectCount++;
                            System.out.println("-> Recorded Choice: " + input);
                        }
                    } else {
                        System.out.println("Invalid option for this question.");
                    }
                } else {
                    System.out.println("Invalid input. Please enter A, B, C, D or S.");
                }
            }

            boolean isCorrect = (selectedChoice == q.getCorrectAnswerIndex());
            result.reviews.add(new Result.QuestionReview(q, selectedChoice, isCorrect));
        }

        long endTime = System.currentTimeMillis();
        result.timeSpentSeconds = Math.max(1, (endTime - startTime) / 1000);

        // --- SCORE & GRADE CALCULATION ---
        calculateScoreAndGrade(result);
        history.add(result);

        // Display Detailed Result Page
        displayResultPage(result);
    }

    private static void calculateScoreAndGrade(Result r) {
        r.percentage = ((double) r.correctCount / r.totalQuestions) * 100.0;
        r.passed = r.percentage >= 60.0;

        if (r.percentage >= 90.0) r.grade = "O (Outstanding)";
        else if (r.percentage >= 80.0) r.grade = "A+ (Excellent)";
        else if (r.percentage >= 70.0) r.grade = "A (Very Good)";
        else if (r.percentage >= 60.0) r.grade = "B (Good / Pass)";
        else if (r.percentage >= 50.0) r.grade = "C (Average)";
        else r.grade = "F (Needs Improvement)";
    }

    // --- RESULT PAGE WITH ANSWER VALIDATION ---
    private static void displayResultPage(Result r) {
        System.out.println("\n========================================================");
        System.out.println("                  ASSESSMENT RESULT PAGE                ");
        System.out.println("========================================================");
        System.out.printf(" Assessment Title : %s\n", r.quizTitle);
        System.out.printf(" Total Questions  : %d\n", r.totalQuestions);
        System.out.printf(" Correct Answers  : %d (+%d marks)\n", r.correctCount, r.correctCount);
        System.out.printf(" Incorrect Answers: %d\n", r.incorrectCount);
        System.out.printf(" Skipped Questions: %d\n", r.skippedCount);
        System.out.printf(" Score Percentage : %.1f%%\n", r.percentage);
        System.out.printf(" Academic Grade   : %s\n", r.grade);
        System.out.printf(" Status           : %s\n", (r.passed ? "PASSED (Congratulations!)" : "FAILED (Needs Review)"));
        System.out.printf(" Time Spent       : %d seconds\n", r.timeSpentSeconds);
        System.out.println("========================================================");

        System.out.print("\nWould you like to inspect the Question-by-Question Solution Review? (Y/N): ");
        String inspect = scanner.nextLine().trim().toUpperCase();
        if (inspect.equals("Y")) {
            displaySolutionReview(r);
        }
    }

    private static void displaySolutionReview(Result r) {
        System.out.println("\n========================================================");
        System.out.println("        ANSWER KEY VALIDATION & SOLUTION EXPLANATIONS   ");
        System.out.println("========================================================");

        char[] letterKeys = {'A', 'B', 'C', 'D'};

        for (int i = 0; i < r.reviews.size(); i++) {
            Result.QuestionReview rev = r.reviews.get(i);
            Question q = rev.question;

            System.out.println("\n--------------------------------------------------------");
            System.out.printf("Question #%d: %s\n", (i + 1), q.getPrompt());
            System.out.println("Options:");
            for (int opt = 0; opt < q.getOptions().size(); opt++) {
                System.out.printf("  [%c] %s\n", letterKeys[opt], q.getOptions().get(opt));
            }

            String userChoiceStr = rev.selectedOption >= 0 ? String.valueOf(letterKeys[rev.selectedOption]) : "SKIPPED";
            String correctChoiceStr = String.valueOf(letterKeys[q.getCorrectAnswerIndex()]);

            System.out.printf("\nYour Answer   : %s  [%s]\n", userChoiceStr, (rev.isCorrect ? "CORRECT" : "INCORRECT"));
            System.out.printf("Correct Answer: %s. %s\n", correctChoiceStr, q.getOptions().get(q.getCorrectAnswerIndex()));
            System.out.println("\nConcept Explanation:");
            System.out.println("  -> " + q.getExplanation());
        }
        System.out.println("--------------------------------------------------------");
    }

    // --- CATEGORY FILTERING ---
    private static void selectCategoryAndStart() {
        Set<String> categories = new LinkedHashSet<>();
        for (Question q : questionBank) {
            categories.add(q.getCategory());
        }

        List<String> catList = new ArrayList<>(categories);
        System.out.println("\nSelect Quiz Category:");
        for (int i = 0; i < catList.size(); i++) {
            System.out.printf(" [%d] %s\n", (i + 1), catList.get(i));
        }
        System.out.print("Enter choice [1-" + catList.size() + "]: ");
        try {
            int sel = Integer.parseInt(scanner.nextLine().trim());
            if (sel >= 1 && sel <= catList.size()) {
                String chosenCat = catList.get(sel - 1);
                List<Question> filtered = new ArrayList<>();
                for (Question q : questionBank) {
                    if (q.getCategory().equalsIgnoreCase(chosenCat)) {
                        filtered.add(q);
                    }
                }
                runQuizSession(filtered, chosenCat + " Assessment");
            } else {
                System.out.println("Invalid category selection.");
            }
        } catch (NumberFormatException e) {
            System.out.println("Invalid numeric input.");
        }
    }

    // --- FORM HANDLING & CLIENT-SIDE VALIDATION IN JAVA ---
    private static void addNewQuestionInteractive() {
        System.out.println("\n========================================================");
        System.out.println("        ADD CUSTOM QUESTION (FORM INPUT & VALIDATION)   ");
        System.out.println("========================================================");

        // Validation Rule 1: Prompt must be at least 5 chars
        String prompt = "";
        while (prompt.length() < 5) {
            System.out.print("Enter Question Statement (min 5 chars): ");
            prompt = scanner.nextLine().trim();
            if (prompt.length() < 5) {
                System.out.println("[Validation Error]: Question prompt cannot be empty or under 5 characters!");
            }
        }

        // Validation Rule 2: Category
        System.out.print("Enter Category (e.g. Java, ReactJS, Python, CS) [Default: Java]: ");
        String category = scanner.nextLine().trim();
        if (category.isEmpty()) category = "Java";

        // Options A to D
        List<String> options = new ArrayList<>();
        char[] letters = {'A', 'B', 'C', 'D'};
        for (int i = 0; i < 4; i++) {
            String opt = "";
            while (opt.isEmpty()) {
                System.out.printf("Enter Option %c: ", letters[i]);
                opt = scanner.nextLine().trim();
                if (opt.isEmpty()) {
                    System.out.println("[Validation Error]: Option text cannot be blank!");
                }
            }
            options.add(opt);
        }

        // Validation Rule 3: Correct Option
        int correctIndex = -1;
        while (correctIndex < 0 || correctIndex > 3) {
            System.out.print("Which option is correct? [A, B, C, or D]: ");
            String input = scanner.nextLine().trim().toUpperCase();
            if (input.length() == 1 && input.charAt(0) >= 'A' && input.charAt(0) <= 'D') {
                correctIndex = input.charAt(0) - 'A';
            } else {
                System.out.println("[Validation Error]: Please enter A, B, C, or D.");
            }
        }

        // Validation Rule 4: Explanation
        String explanation = "";
        while (explanation.length() < 5) {
            System.out.print("Enter Detailed Answer Explanation: ");
            explanation = scanner.nextLine().trim();
            if (explanation.length() < 5) {
                System.out.println("[Validation Error]: Please provide a helpful explanation (min 5 chars).");
            }
        }

        Question newQuestion = new Question(prompt, options, correctIndex, explanation, category, "Medium");
        questionBank.add(newQuestion);
        System.out.println("\n Successfully validated and added custom question to Question Bank!");
        System.out.printf("Total Questions in Bank now: %d\n", questionBank.size());
    }

    // --- DISPLAY ATTEMPT HISTORY ---
    private static void displayHistory() {
        System.out.println("\n========================================================");
        System.out.println("                 ATTEMPT HISTORY LOG                    ");
        System.out.println("========================================================");
        if (history.isEmpty()) {
            System.out.println("No quiz attempts recorded in this session yet.");
            return;
        }

        for (int i = 0; i < history.size(); i++) {
            Result r = history.get(i);
            System.out.printf("Attempt #%d: %s | Score: %d/%d (%.1f%%) | Grade: %s | Status: %s | Time: %ds\n",
                (i + 1), r.quizTitle, r.correctCount, r.totalQuestions, r.percentage, r.grade,
                (r.passed ? "PASSED" : "FAILED"), r.timeSpentSeconds
            );
        }
    }

    // --- DISPLAY QUESTION BANK ---
    private static void displayQuestionBank() {
        System.out.println("\n========================================================");
        System.out.println("              CURRENT QUESTION BANK SYLLABUS            ");
        System.out.println("========================================================");
        for (int i = 0; i < questionBank.size(); i++) {
            Question q = questionBank.get(i);
            System.out.printf("[%d] [%s | %s] %s\n", (i + 1), q.getCategory(), q.getDifficulty(), q.getPrompt());
        }
    }
}
