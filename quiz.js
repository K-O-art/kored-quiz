const questions = [
  {
    question: "What is the SI unit of force?",
    choices: ["Newton", "Pascal", "Watt", "Joule"],
    correct: 0,
    image: ""
  },
  {
    question: "Which law states that energy can neither be created nor destroyed?",
    choices: [
      "First law of thermodynamics",
      "Second law of thermodynamics",
      "Newton's third law",
      "Law of conservation of mass"
    ],
    correct: 0,
    image: ""
  },
  // Add the rest of your 40+ questions here...
];

// DOM Elements
const introScreen = document.getElementById('intro-screen');
const progressFill = document.getElementById('progress-fill');
const quizContainer = document.getElementById('quiz-container');
const nameInputContainer = document.getElementById('name-input-container');
const playerNameInput = document.getElementById('player-name');
const startBtn = document.getElementById('start-btn');
const quizEl = document.getElementById('quiz');
const questionText = document.getElementById('question-text');
const imageContainer = document.getElementById('image-container');
const answersContainer = document.getElementById('answers-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const resultContainer = document.getElementById('result-container');
const scoreText = document.getElementById('score-text');
const restartBtn = document.getElementById('restart-btn');
const backgroundMusic = document.getElementById('background-music');
const musicToggle = document.getElementById('music-toggle');

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswers = [];
let playerName = "";

// Show intro progress bar animation then show name input
function startIntro() {
  let progress = 0;
  const interval = setInterval(() => {
    progress += 5;
    progressFill.style.width = progress + '%';
    if (progress >= 100) {
      clearInterval(interval);
      introScreen.classList.add('hidden');
      quizContainer.classList.remove('hidden');
      nameInputContainer.classList.remove('hidden');
    }
  }, 100);
}

// Render question and answers
function renderQuestion() {
  const q = questions[currentQuestionIndex];
  questionText.textContent = q.question;

  // Show image if available
  imageContainer.innerHTML = '';
  if (q.image) {
    const img = document.createElement('img');
    img.src = q.image;
    img.alt = 'Question image';
    imageContainer.appendChild(img);
  }

  // Show answers
  answersContainer.innerHTML = '';
  q.choices.forEach((choice, i) => {
    const btn = document.createElement('button');
    btn.classList.add('answer-btn');
    btn.textContent = choice;
    btn.disabled = false;
    if (selectedAnswers[currentQuestionIndex] === i) {
      btn.classList.add('selected');
    }
    btn.addEventListener('click', () => {
      selectedAnswers[currentQuestionIndex] = i;
      updateSelected();
    });
    answersContainer.appendChild(btn);
  });

  // Update buttons
  prevBtn.disabled = currentQuestionIndex === 0;
  nextBtn.classList.toggle('hidden', currentQuestionIndex === questions.length - 1);
  submitBtn.classList.toggle('hidden', currentQuestionIndex !== questions.length - 1);
}

function updateSelected() {
  const buttons = answersContainer.querySelectorAll('button');
  buttons.forEach((btn, idx) => {
    btn.classList.toggle('selected', selectedAnswers[currentQuestionIndex] === idx);
  });
}

// Navigation buttons
prevBtn.addEventListener('click', () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion();
  }
});
nextBtn.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  }
});
submitBtn.addEventListener('click', () => {
  calculateScore();
  quizEl.classList.add('hidden');
  resultContainer.classList.remove('hidden');
});

// Calculate score and show result
function calculateScore() {
  score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (selectedAnswers[i] === questions[i].correct) {
      score++;
    }
  }
  scoreText.textContent = `${playerName}, your score is ${score} out of ${questions.length}`;
}

// Restart quiz
restartBtn.addEventListener('click', () => {
  selectedAnswers = [];
  score = 0;
  currentQuestionIndex = 0;
  resultContainer.classList.add('hidden');
  nameInputContainer.classList.remove('hidden');
  playerNameInput.value = '';
  quizContainer.classList.remove('hidden');
  quizEl.classList.add('hidden');
});

// Start quiz
startBtn.addEventListener('click', () => {
  const name = playerNameInput.value.trim();
  if (!name) {
    alert('Please enter your name!');
    return;
  }
  playerName = name;
  nameInputContainer.classList.add('hidden');
  quizEl.classList.remove('hidden');
  renderQuestion();
  backgroundMusic.play();
  musicToggle.textContent = 'Pause Music';
});

// Music toggle
musicToggle.addEventListener('click', () => {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    musicToggle.textContent = 'Pause Music';
  } else {
    backgroundMusic.pause();
    musicToggle.textContent = 'Play Music';
  }
});

// Start intro loading animation on page load
window.onload = startIntro;
