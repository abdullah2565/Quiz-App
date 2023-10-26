const quiz = [
  {
      question: "How do you declare a constant variable in JavaScript?",
      options: ["const", "let", "var"],
      correctAnswer: "const"
  },
  {
      question: "What is the purpose of 'typeof' operator in JavaScript?",
      options: ["To check the type of a variable", "To create a new variable", "To loop through an array"],
      correctAnswer: "To check the type of a variable"
  },
  {
      question: "What is the use of 'NaN' in JavaScript?",
      options: ["Represents a prime number", "Represents 'Not a Number'", "Represents infinity"],
      correctAnswer: "Represents 'Not a Number'"
  },
  {
      question: "How do you create a single-line comment in JavaScript?",
      options: ["// This is a comment", "<!-- This is a comment -->", "/* This is a comment */"],
      correctAnswer: "// This is a comment"
  },
  {
      question: "What does the 'this' keyword refer to in JavaScript?",
      options: ["It refers to the current function", "It refers to the global object", "It refers to the calling object"],
      correctAnswer: "It refers to the calling object"
  },
  {
      question: "What is the purpose of JavaScript's 'addEventListener' method?",
      options: ["To remove an element from the DOM", "To add an event listener to an element", "To create a new element"],
      correctAnswer: "To add an event listener to an element"
  },
  {
      question: "What does the acronym 'JSON' stand for in JavaScript?",
      options: ["JavaScript Object Notation", "Java Standard Object Notation", "JavaScript Oriented Networking"],
      correctAnswer: "JavaScript Object Notation"
  },
  {
      question: "What is the use of 'localStorage' in JavaScript?",
      options: ["To store data in the user's browser", "To make HTTP requests", "To create animations"],
      correctAnswer: "To store data in the user's browser"
  },
  {
      question: "How can you convert a string to an integer in JavaScript?",
      options: ["parseInt()", "stringToInteger()", "toInteger()"],
      correctAnswer: "parseInt()"
  },
  {
      question: "What is the purpose of JavaScript's 'fetch' API?",
      options: ["To fetch coffee from a cafe", "To fetch data from a server", "To fetch images from a website"],
      correctAnswer: "To fetch data from a server"
  }
];

let currentQuestion = 0;
let rightAnswers = 0;
let wrongAnswers = 0;
let userAnswer = undefined;

const quizContainer = document.getElementById('quizContainer');
const resultContainer = document.getElementById('resultContainer');
const nextBtn = document.getElementById('next-btn');
const timerElement = document.getElementById("timer");

const showQuestion = () => {
  quizContainer.innerHTML = '';
  timerElement.textContent = '00:30';
  nextBtn.disabled = true;

  if (currentQuestion < quiz.length) {
      let queDiv = document.createElement('div');
      let h3 = document.createElement('h3');
      h3.innerText = quiz[currentQuestion].question;
      h3.className = 'quiz-question';
      queDiv.appendChild(h3);
      quiz[currentQuestion].options.forEach((data, index) => {
          let optionDiv = document.createElement('div');
          let input = document.createElement('input');
          let label = document.createElement('label');
          input.type = 'radio';
          input.id = `option-${index}`;
          input.name = 'quiz-option';
          input.value = data;
          input.className = 'selector';
          label.innerText = data;
          label.setAttribute('for', `option-${index}`);
          input.addEventListener('change', function () {
              userAnswer = this.value;
              nextBtn.disabled = false;
          });
          optionDiv.appendChild(input);
          optionDiv.appendChild(label);
          optionDiv.className = 'quiz-option';
          queDiv.appendChild(optionDiv);
      });
      quizContainer.appendChild(queDiv);
  } else {
      resultContainer.style.display = 'block';
      showResult();
      quizContainer.style.display = 'none';
      nextBtn.style.display = 'none';
  
          
  }
};

showQuestion();

nextBtn.addEventListener('click', showNextQuestion);

const countdownTime = 30;
let timer = countdownTime;
let timerInterval;


function updateTimer() {
  const timerElement = document.getElementById("timer");

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  const minutesString = minutes < 10 ? "0" + minutes : minutes;
  const secondsString = seconds < 10 ? "0" + seconds : seconds;
  
  timerElement.textContent = minutesString + ":" + secondsString;

  if (timer > 0) {
      timer--;
  } else {
      clearInterval(timerInterval);
      timerElement.textContent = "Time's up!";
      showNextQuestion();
      showQuestionCount();
  }
}
const showQuestionCount = () => {
  const questionCountElement = document.getElementById("questionCount");
  questionCountElement.innerText = `${currentQuestion + 1} out of ${quiz.length}`;
}

function startTimer() {
  clearInterval(timerInterval);
  timer = countdownTime; 
  timerInterval = setInterval(updateTimer, 1000);
}

function showNextQuestion() {
  const question = quiz[currentQuestion];
  if (userAnswer === question.correctAnswer) {
      rightAnswers++;
  } else {
      wrongAnswers++;
  }

  if (currentQuestion + 1 < quiz.length) {
      currentQuestion++;
      showQuestion();
      showQuestionCountAndTimer()
      startTimer(); 
      showQuestionCount(); 
  } else if (currentQuestion + 1 === quiz.length) {
      resultContainer.style.display = "block";
      showResult();
      quizContainer.style.display = "none";
      nextBtn.style.display = "none";
  }

  nextBtn.disabled = true;
}



startTimer();
showQuestionCount()


function showResult() {
  resultContainer.innerHTML = '';
  const div = document.createElement('div');
  const h1 = document.createElement('h1');
  if (rightAnswers > wrongAnswers) {
      h1.innerText = 'You Win!';
   
  } else {
      h1.innerText = 'Sorry! You Lost ';
    
  }
  const rightH3 = document.createElement('h3');
  rightH3.innerText = 'Right Answers ' + rightAnswers;
  const score = document.createElement('h3');
  score.innerText = 'Score ' + rightAnswers * 10;
  const wrongH3 = document.createElement('h3');
  wrongH3.innerText = 'Wrong Answers ' + wrongAnswers;
  hideQuestionCountAndTimer();

  div.appendChild(h1);
  div.appendChild(rightH3);
  div.appendChild(score);
  div.appendChild(wrongH3);
  resultContainer.appendChild(div);
}

function hideQuestionCountAndTimer() {
  const questionCountElement = document.getElementById("questionCount");
  const timerElement = document.getElementById("timer");
  questionCountElement.style.display = "none";
  timerElement.style.display = "none";
}


function showQuestionCountAndTimer() {
  const questionCountElement = document.getElementById("questionCount");
  const timerElement = document.getElementById("timer");
  questionCountElement.style.display = "block";
  timerElement.style.display = "block";
}