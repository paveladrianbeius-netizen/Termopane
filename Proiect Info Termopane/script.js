// MENIU PENTRU TELEFON
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});


// ANUL CURENT ÎN FOOTER
document.getElementById("year").textContent = new Date().getFullYear();


// BUTON ÎNAPOI SUS
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


// ÎNCĂRCARE ȘI PREVIZUALIZARE VIDEO
const videoUpload = document.getElementById("videoUpload");
const videoPlayer = document.getElementById("videoPlayer");
const videoPlaceholder = document.getElementById("videoPlaceholder");
const uploadStatus = document.getElementById("uploadStatus");

let currentVideoURL = null;

videoUpload.addEventListener("change", () => {
  const file = videoUpload.files[0];

  if (!file) return;

  if (!file.type.startsWith("video/")) {
    uploadStatus.textContent = "Te rugăm să alegi un fișier video.";
    videoUpload.value = "";
    return;
  }

  if (currentVideoURL) {
    URL.revokeObjectURL(currentVideoURL);
  }

  currentVideoURL = URL.createObjectURL(file);

  videoPlayer.src = currentVideoURL;
  videoPlayer.classList.add("visible");
  videoPlaceholder.classList.add("hidden");

  uploadStatus.textContent = "Videoclip selectat: " + file.name;
});


// QUIZ INTERACTIV
const questions = [
  {
    question: "Care este unul dintre rolurile unei ferestre?",
    answers: [
      "Să permită luminii naturale să intre",
      "Să producă electricitate",
      "Să încălzească apa"
    ],
    correct: 0,
    explanation: "Corect! Ferestrele permit luminii naturale să intre în încăpere."
  },
  {
    question: "Ce înseamnă PVC?",
    answers: [
      "Un tip de lemn",
      "Policlorură de vinil",
      "Un tip de sticlă"
    ],
    correct: 1,
    explanation: "Exact! PVC este prescurtarea pentru policlorură de vinil."
  },
  {
    question: "Ce este important la montajul unei ferestre?",
    answers: [
      "Să fie montată fără verificări",
      "Să fie fixată și etanșată corespunzător",
      "Să fie acoperită complet"
    ],
    correct: 1,
    explanation: "Corect! Fixarea și etanșarea corespunzătoare sunt foarte importante."
  },
  {
    question: "Ce avantaj poate avea o fereastră bine aleasă?",
    answers: [
      "Confort termic și fonic mai bun",
      "Consum mai mare de energie",
      "Mai puțină lumină naturală"
    ],
    correct: 0,
    explanation: "Bravo! O fereastră potrivită poate contribui la confortul locuinței."
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionCounter = document.getElementById("questionCounter");
const scoreDisplay = document.getElementById("scoreDisplay");
const progressFill = document.getElementById("progressFill");
const questionText = document.getElementById("questionText");
const answersContainer = document.getElementById("answers");
const quizFeedback = document.getElementById("quizFeedback");
const nextButton = document.getElementById("nextQuestion");
const restartButton = document.getElementById("restartQuiz");

function showQuestion() {
  answered = false;

  const question = questions[currentQuestion];

  questionCounter.textContent =
    `ÎNTREBAREA ${currentQuestion + 1} / ${questions.length}`;

  scoreDisplay.textContent = `SCOR: ${score}`;

  progressFill.style.width =
    `${(currentQuestion / questions.length) * 100}%`;

  questionText.textContent = question.question;

  answersContainer.innerHTML = "";
  quizFeedback.textContent = "";

  nextButton.disabled = true;
  nextButton.hidden = false;
  restartButton.hidden = true;

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.className = "answer-option";
    button.textContent = answer;

    button.addEventListener("click", () => {
      checkAnswer(index);
    });

    answersContainer.appendChild(button);
  });
}

function checkAnswer(selectedIndex) {
  if (answered) return;

  answered = true;

  const question = questions[currentQuestion];
  const answerButtons =
    answersContainer.querySelectorAll(".answer-option");

  answerButtons.forEach((button, index) => {
    button.disabled = true;

    if (index === question.correct) {
      button.classList.add("correct");
    }

    if (index === selectedIndex && selectedIndex !== question.correct) {
      button.classList.add("incorrect");
    }
  });

  if (selectedIndex === question.correct) {
    score++;
    quizFeedback.textContent = "✓ " + question.explanation;
  } else {
    quizFeedback.textContent =
      "Răspunsul corect era: " +
      question.answers[question.correct] + ".";
  }

  scoreDisplay.textContent = `SCOR: ${score}`;
  nextButton.disabled = false;

  if (currentQuestion === questions.length - 1) {
    nextButton.textContent = "Vezi rezultatul";
  } else {
    nextButton.textContent = "Următoarea întrebare →";
  }
}

nextButton.addEventListener("click", () => {
  if (!answered) return;

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  progressFill.style.width = "100%";

  questionCounter.textContent = "QUIZ FINALIZAT";
  scoreDisplay.textContent = `SCOR: ${score} / ${questions.length}`;

  questionText.textContent =
    score === questions.length
      ? "Felicitări! Ai răspuns corect la toate întrebările!"
      : "Ai terminat quiz-ul!";

  answersContainer.innerHTML = "";

  quizFeedback.textContent =
    `Ai obținut ${score} din ${questions.length} răspunsuri corecte.`;

  nextButton.hidden = true;
  restartButton.hidden = false;
}

restartButton.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  showQuestion();
});

// Pornim quiz-ul
showQuestion();


// VALIDARE FORMULAR
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (event) => {
  if (!contactForm.checkValidity()) {
    event.preventDefault();
    contactForm.reportValidity();
    return;
  }

  const submitButton = contactForm.querySelector(
    'button[type="submit"]'
  );

  submitButton.textContent = "Se trimite mesajul...";
  submitButton.disabled = true;
});