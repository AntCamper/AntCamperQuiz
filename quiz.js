// Quiz questions and answers
const questions = [
    {
        question: "What is the primary ability score for a Wizard in Dungeons and Dragons?",
        answers: {
            a: "Strength",
            b: "Intelligence",
            c: "Dexterity",
            d: "Wisdom"
        },
        correctAnswer: "b"
    },
    {
        question: "In D&D 5th Edition, what is the maximum number of ability score improvement (ASI) a character can gain from leveling up?",
        answers: {
            a: "2",
            b: "4",
            c: "6",
            d: "8"
        },
        correctAnswer: "a"
    },
    {
        question: "Which of the following is a legendary D&D artifact known for granting a wish but often with unintended consequences?",
        answers: {
            a: "Sword of Sharpness",
            b: "Wand of Magic Missiles",
            c: "Deck of Many Things",
            d: "Amulet of Health"
        },
        correctAnswer: "c"
    },
    {
        question: "What creature type is immune to being charmed in D&D?",
        answers: {
            a: "Undead",
            b: "Fey",
            c: "Construct",
            d: "Aberration"
        },
        correctAnswer: "a"
    },
    {
        question: "In the D&D multiverse, what is the home plane of the mind flayers (Illithids)?",
        answers: {
            a: "The Abyss",
            b: "Limbo",
            c: "The Nine Hells",
            d: "The Far Realm"
        },
        correctAnswer: "d"
    }
];

// DOM elements
const quizContainer = document.getElementById('quiz');
const timerElement = document.getElementById('timer');
const startButton = document.getElementById('start');
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const submitButton = document.getElementById('submit');
const resultsContainer = document.getElementById('results');
const highScoresList = document.getElementById('high-scores-list');

// Quiz variables
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 60; // 60 seconds

// Function to start the quiz
function startQuiz() {
    startButton.style.display = 'none';
    showQuestion(questions[currentQuestionIndex]);
    timer = setInterval(function() {
        timeLeft--;
        timerElement.textContent = timeLeft + ' seconds remaining';
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

// Function to show a question
function showQuestion(question) {
    quizContainer.innerHTML = '';
    quizContainer.innerHTML += `<h2>${question.question}</h2>`;
    for (let answer in question.answers) {
        quizContainer.innerHTML += `<button onclick="checkAnswer('${answer}')">${answer}: ${question.answers[answer]}</button>`;
    }
}

// Function to check the answer
function checkAnswer(answer) {
    if (questions[currentQuestionIndex].correctAnswer === answer) {
        score++;
    } else {
        timeLeft -= 5; // Subtract 5 seconds for an incorrect answer
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        endQuiz();
    }
}

// Function to end the quiz
function endQuiz() {
    clearInterval(timer);
    resultsContainer.innerHTML = `<h2>Quiz Over!</h2><p>Your score: ${score}</p>`;
    submitButton.style.display = 'block';
}

// Function to save the score
function saveScore(event) {
    event.preventDefault();
    const initials = prompt("Enter your initials:");
    if (initials) {
        const scoreItem = document.createElement('li');
        scoreItem.textContent = `${initials}: ${score}`;
        highScoresList.appendChild(scoreItem);
    }
}

// Event listeners
startButton.addEventListener('click', startQuiz);
previousButton.addEventListener('click', function() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(questions[currentQuestionIndex]);
    }
});
nextButton.addEventListener('click', function() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(questions[currentQuestionIndex]);
    }
});
submitButton.addEventListener('click', saveScore);
