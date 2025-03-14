let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// Generate 25 random math questions
function generateQuestions() {
    questions = [];
    for (let i = 0; i < 25; i++) {
        let num1 = Math.floor(Math.random() * 10) + 1;
        let num2 = Math.floor(Math.random() * 10) + 1;
        let operator = ["+", "-", "*"][Math.floor(Math.random() * 3)];
        let questionText = `${num1} ${operator} ${num2}`;
        let correctAnswer = eval(questionText); // Calculate answer
        questions.push({ question: questionText, answer: correctAnswer });
    }
}

// Display current question
function displayQuestion() {
    if (currentQuestionIndex < 25) {
        document.getElementById("question").textContent = questions[currentQuestionIndex].question;
        document.getElementById("question-count").textContent = `Question: ${currentQuestionIndex + 1} / 25`;
        document.getElementById("answer").value = "";
    } else {
        document.getElementById("game-container").innerHTML = `<h2>Game Over</h2><p>Your Score: ${score} / 25</p>`;
    }
}

// Check user answer
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer").value);
    let correctAnswer = questions[currentQuestionIndex].answer;

    if (userAnswer === correctAnswer) {
        document.getElementById("feedback").textContent = "Correct!";
        document.getElementById("feedback").style.color = "green";
        score++;
    } else {
        document.getElementById("feedback").textContent = `Wrong! Correct answer: ${correctAnswer}`;
        document.getElementById("feedback").style.color = "red";
    }

    // Update progress bar
    document.getElementById("progress").style.width = ((currentQuestionIndex + 1) / 25) * 100 + "%";

    currentQuestionIndex++;
    setTimeout(displayQuestion, 1000); // Show next question after 1 second
}

// Initialize game
generateQuestions();
displayQuestion();
