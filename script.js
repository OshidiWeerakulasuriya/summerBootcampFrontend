let questions = [];
let currentQuestionIndex = 0;
let score = 0;

async function fetchQuestions() {
    const response = await fetch('https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple');
    const data = await response.json();
    questions = data.results.map(q => ({
        question: q.question,
        answers: [q.correct_answer, ...q.incorrect_answers].sort(() => Math.random() - 0.5),
        correctAnswer: q.correct_answer
    }));
}

function startQuiz() {
    document.getElementById('welcome').classList.add('hide');  
    document.getElementById('start-btn').classList.add('hide');
    document.getElementById('result-container').classList.add('hide');
    document.getElementById('question-container').classList.remove('hide');
    document.getElementById('progress-container').classList.remove('hide');
    currentQuestionIndex = 0;
    score = 0;
    fetchQuestions().then(() => showQuestion());
}

function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    const answerButtons = document.getElementById('answer-buttons');
    const progress = document.getElementById('progress');

    answerButtons.innerHTML = '';
    questionContainer.querySelector('#question').innerText = questions[currentQuestionIndex].question;
    questions[currentQuestionIndex].answers.forEach(answer => {
        const button = document.createElement('button');
        button.classList.add('btn');
        button.innerText = answer;
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtons.appendChild(button);
    });

    progress.innerText = `${currentQuestionIndex + 1} / ${questions.length}`;
}

function selectAnswer(selectedAnswer) {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('question-container').classList.add('hide');
    document.getElementById('progress-container').classList.add('hide');
    document.getElementById('result-container').classList.remove('hide');
    document.getElementById('result').innerText = `Congratulations, you answered ${score} / ${questions.length} questions correctly.`;
}
