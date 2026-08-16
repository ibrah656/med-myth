// Array of objects holding our quiz data
const quizData = [
    {
        myth: "Sleeping with wet hair causes a cold.",
        isTrue: false,
        science: "Colds are caused by viruses, not by being cold or having wet hair. You catch a cold by coming into contact with rhinovirus, usually from another person."
    },
    {
        myth: "Cracking your knuckles causes arthritis.",
        isTrue: false,
        science: "The 'pop' is just gas bubbles bursting in the synovial fluid lubricating your joints. Multiple studies show no link between knuckle cracking and osteoarthritis."
    },
    {
        myth: "You must drink exactly 8 glasses of water a day.",
        isTrue: false,
        science: "Hydration needs vary wildly based on age, climate, and diet. Much of your daily water intake actually comes from food like fruits and vegetables."
    },
    {
        myth: "Eating carrots significantly improves your night vision.",
        isTrue: false,
        science: "While Vitamin A in carrots is good for eye health, it won't give you night vision. This myth was actually British WWII propaganda to hide the invention of radar!"
    },
    {
        myth: "Sugar makes children hyperactive.",
        isTrue: false,
        science: "Numerous double-blind studies have proven this false. The 'sugar rush' is usually a placebo effect or stems from the excitement of the event where sugar is served (like a birthday party)."
    }
];

// Application State
let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const cardContainer = document.getElementById('card-container');
const mythText = document.getElementById('myth-text');
const resultTitle = document.getElementById('result-title');
const medExplanation = document.getElementById('med-explanation');
const progressText = document.getElementById('progress');
const finalContainer = document.getElementById('final-score-container');
const finalScoreText = document.getElementById('final-score-text');

// Initialize the first question
function loadQuestion() {
    const currentData = quizData[currentQuestionIndex];
    mythText.innerText = `"${currentData.myth}"`;
    progressText.innerText = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
}

// Check the user's answer and flip the card
function checkAnswer(userGuess) {
    const currentData = quizData[currentQuestionIndex];
    
    // Evaluate logic
    if (userGuess === currentData.isTrue) {
        resultTitle.innerText = "Correct! ✅";
        resultTitle.style.color = "#2ecc71";
        score++;
    } else {
        resultTitle.innerText = "Myth Busted! ❌";
        resultTitle.style.color = "#e74c3c";
    }

    // Populate the back of the card with the medical science
    medExplanation.innerText = currentData.science;

    // Trigger the CSS Flip animation
    cardContainer.classList.add('is-flipped');
}

// Move to the next question or end the quiz
function nextQuestion() {
    // Flip the card back to the front
    cardContainer.classList.remove('is-flipped');

    // Wait for the flip animation to finish (0.6s) before changing text
    setTimeout(() => {
        currentQuestionIndex++;

        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showFinalScore();
        }
    }, 300); // 300ms delay so the text doesn't change halfway through the flip
}

// End state
function showFinalScore() {
    cardContainer.classList.add('hidden');
    progressText.classList.add('hidden');
    finalContainer.classList.remove('hidden');
    
    finalScoreText.innerText = `You scored ${score} out of ${quizData.length}!`;
}

// Reset state
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    
    finalContainer.classList.add('hidden');
    cardContainer.classList.remove('hidden');
    progressText.classList.remove('hidden');
    
    loadQuestion();
}

// Start the app
loadQuestion();