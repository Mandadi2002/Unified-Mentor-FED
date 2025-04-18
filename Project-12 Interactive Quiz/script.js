const questions = [
    {
        question: "What is the capital of Australia?",
        answers: [
            { text: "Sydney", correct: false },
            { text: "Canberra", correct: true },
            { text: "Melbourne", correct: false },
            { text: "Gold Coast", correct: false },
        ]
    },
    {
        question: "Who wrote <i>To Kill a Mockingbird</i>?" ,
        answers: [
            { text: "F. Scott Fitzgerald", correct: false},
            { text: "J.D. Salinger", correct:false},
            { text: "Ernest Hemingway", correct:false},
            { text: "Harper Lee", correct: true},
        ]
    },
    {
        question: "When did the Titanic sink?" ,
        answers: [
            { text: "1905", correct: false},
            { text: "1912" , correct: true},
            { text: "1923", correct:false},
            { text: "1898", correct:false},
        ]
    },
    {
        question: "Who was the first President of the United States?" ,
        answers: [
            { text: "Roosevelt", correct: false},
            { text: "Abraham Lincoln" , correct: false},
            { text: "John F. Kennedy", correct:false},
            { text: "George Washington", correct:true},
        ]
    },
    {
        question: "Who is considered the father of computer science?" ,
        answers: [
            { text: "Alan Turing", correct: true},
            { text: "Charles Babbage" , correct: false},
            { text: "Tim Berners-Lee", correct:false},
            { text: "Steve Jobs", correct:false},
        ]
    },
    {
        question: "What was the first video game ever created?" ,
        answers: [
            { text: "Pong", correct: false},
            { text: "Space Invaders" , correct: false},
            { text: "Tennis for Two", correct:true},
            { text: "Pac-Man", correct:false},
        ]
    },
    {
        question: "What year did World War II end?" ,
        answers: [
            { text: "1910", correct: false},
            { text: "1942" , correct: false},
            { text: "1937", correct:false},
            { text: "1945", correct:true},
        ]
    },
    {
        question: "What does HTML stand for?" ,
        answers: [
            { text: "Hypertext Makeup Language", correct: false},
            { text: "Hypertext Markup Language" , correct: true},
            { text: "Hypertext Design Language", correct:false},
            { text: "Hypertext Boostup Language", correct:false},
        ]
    },
    {
        question: "Who won the Oscar for Best Picture in 2023?",
        answers: [
            { text: "Everything Everywhere All at Once", correct: true},
            { text: "Avatar: The Way of Water" , correct: false},
            { text: "Top Gun: Maverick", correct:false},
            { text: "Women Talking", correct:false},
        ]
    },
    {
        question: "What is the name of the fictional continent where Game of Thrones takes place?" ,
        answers: [
            { text: "Narnia", correct: false},
            { text: "Middle-Earth" , correct: false},
            { text: "Westeros", correct:true},
            { text: "Panem", correct:false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("time-left");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 5 * 60;  // Set the timer for 10 minutes (10 * 60 = 600 seconds)
let timerInterval;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
    startTimer();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    } else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        resetTimer();  // Reset the timer for the next question
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();  // Restart the quiz after completion
    }
});

function startTimer() {
    timerInterval = setInterval(function () {
        timeLeft--;  // Decrease the time (in seconds)

        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        // Update the timer display
        timerElement.textContent = `${minutes}m ${seconds}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's up! Moving to the next question.");
            handleNextButton();  // Move to the next question when time runs out
        }
    }, 1000);
}

function resetTimer() {
    timeLeft = 5 * 60;  // Reset timer to 10 minutes (600 seconds)
    timerElement.textContent = "5m 00s";  // Display the reset time
    clearInterval(timerInterval);
    startTimer();  // Restart the timer
}

// Initialize the quiz
startQuiz();
