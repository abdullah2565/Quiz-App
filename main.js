const jsquestions = [
    {
      question: 'What is the correct syntax in JavaScript?',
      choices: ['a. { }', 'b. [ ]', 'c. ( )', 'd. < >'],
      correctAnswer: 'a. { }'
    },
    {
      question: 'What is the use of the "==" operator in JavaScript?',
      choices: ['a. Assignment', 'b. Comparison', 'c. Concatenation', 'd. Logical OR'],
      correctAnswer: 'b. Comparison'
    },
    {
      question: 'What is the difference between "let" and "var" in JavaScript?',
      choices: ['a. Scope', 'b. Data Type', 'c. Variable Declaration', 'd. Looping'],
      correctAnswer: 'a. Scope'
    },
    {
      question: 'What does "NaN" mean in JavaScript?',
      choices: ['a. Not a Number', 'b. New Arithmetic Number', 'c. Null and None', 'd. No Answer'],
      correctAnswer: 'a. Not a Number'
    },
    {
      question: 'What is the purpose of a "callback function" in JavaScript?',
      choices: ['a. To handle asynchronous tasks', 'b. To draw shapes', 'c. To create arrays', 'd. To validate forms'],
      correctAnswer: 'a. To handle asynchronous tasks'
    },
    {
      question: 'What does "JSON" stand for in JavaScript?',
      choices: ['a. JavaScript Object Notation', 'b. JavaScript Oriented Network', 'c. JavaScript Online Navigation', 'd. Java Standard Object Notation'],
      correctAnswer: 'a. JavaScript Object Notation'
    },
    {
      question: 'What is the use of the "typeof" operator in JavaScript?',
      choices: ['a. To check data type', 'b. To create a new variable', 'c. To define a function', 'd. To perform addition'],
      correctAnswer: 'a. To check data type'
    },
    {
      question: 'What does "DOM" mean in JavaScript?',
      choices: ['a. Document Object Model', 'b. Document Order Management', 'c. Data Object Model', 'd. Document Online Management'],
      correctAnswer: 'a. Document Object Model'
    },
    {
      question: 'What is a "closure" in JavaScript?',
      choices: ['a. A function inside another function that has access to the outer function\'s variables', 'b. A loop that never ends', 'c. A conditional statement', 'd. A data structure'],
      correctAnswer: 'a. A function inside another function that has access to the outer function\'s variables'
    },
    {
      question: 'What does the "this" keyword refer to in JavaScript?',
      choices: ['a. The current function', 'b. The previous function', 'c. The global object', 'd. The next function'],
      correctAnswer: 'a. The current function'
    }
  ];
  
  let currentQuestion = 0
  let wrongAnswers = 0
  let rightAnswers = 0
  let userAnswer = 0

 const main = document.getElementById('main')
 const resultdiv = document.getElementById('resultdiv')
 const nextBtn = document.getElementById('next-btn')

 const showQuestion = () => {
    main.innerHTML = null;
    let questiondiv = document.createElement('div');
    let h3 = document.createElement('h3');
    h3.className = 'quizque';
    h3.innerText = jsquestions[currentQuestion].question;
    main.appendChild(h3);

    jsquestions[currentQuestion].choices.map(data => {
        let choicesdiv = document.createElement('div');
        choicesdiv.className = 'choicedivclass';
        let input = document.createElement('input');
        input.type = 'radio';
        input.name = 'quizchoices';
        input.value = data;
        input.addEventListener('change', function () {
            userAnswer = this.value;
            nextBtn.disabled = false;
        });

        let span = document.createElement('span');
        span.innerText = data;

        choicesdiv.appendChild(input);
        choicesdiv.appendChild(span);
        questiondiv.appendChild(choicesdiv);
    });

    main.appendChild(questiondiv);
};

 function checkValue(params) {
    console.log(this)
 }
 showQuestion()

 nextBtn.addEventListener('click', nextquestion)

 function nextquestion(params) {
    const question = jsquestions[currentQuestion]
    if (userAnswer === question.choices) {
        rightAnswers++
    }else{
        wrongAnswers++
    }
    if (currentQuestion + 1 < jsquestions.length) {
        currentQuestion++
      } else if (currentQuestion + 1 === jsquestions.length) {
        resultdiv.style.display = 'block'
        resultfuntion()
        main.style.display = 'none'
        nextBtn.style.display = 'none'
      }
      nextBtn.disabled = true
    
      showQuestion()
 }

 function resultfuntion(params) {
    resultdiv.innerHTML = null
    const div = document.createElement('div')
    const h1 = document.createElement('h1')
    h1 .innerText = rightAnswers > wrongAnswers ? '"congratulation" you are pass' : 'sorry you are fali'
    const rans = document.createElement('h3')
    rans.innerText = 'right answers' + rightAnswers
    const wans = document.createElement('h3')
    wans.innerText = 'wrong answers' + wrongAnswers
    const score = document.createElement('h3')
    score.innerText = 'score' + rightAnswers * 10
    
    div.appendChild(h1)
    div.appendChild(rans)
    div.appendChild(wans)
    div.appendChild(score)
    resultdiv.appendChild(div)
}  

  