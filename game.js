class MedicalQuiz {
    constructor() {
        this.currentQuestion = 0;
        this.quiz = {
            disease: "IgA Nephropathy",
            questions: [
                {
                    clue: "A young adult experiences isolated, episodic blood in urine after an upper respiratory infection.",
                    answer: "hematuria"
                },
                {
                    clue: "The patient develops high blood pressure over time.",
                    answer: "hypertension"
                },
                {
                    clue: "Lab tests show elevated protein levels in urine.",
                    answer: "proteinuria"
                },
                {
                    clue: "Kidney biopsy reveals deposits in the glomerular mesangium.",
                    answer: "deposits"
                },
                {
                    clue: "Blood tests show elevated levels of Immunoglobulin A.",
                    answer: "iga"
                }
            ]
        };

        this.initializeElements();
        this.addEventListeners();
        this.startQuiz();
    }

    initializeElements() {
        this.clueNumber = document.getElementById('clue-number');
        this.clueText = document.getElementById('clue-text');
        this.answerInput = document.getElementById('answer-input');
        this.submitBtn = document.getElementById('submit-btn');
        this.feedback = document.getElementById('feedback');
        this.progress = document.getElementById('progress');
        this.resultContainer = document.getElementById('result-container');
        this.questionContainer = document.getElementById('question-container');
        this.diseaseName = document.getElementById('disease-name');
        this.restartBtn = document.getElementById('restart-btn');
    }

    addEventListeners() {
        this.submitBtn.addEventListener('click', () => this.checkAnswer());
        this.answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkAnswer();
        });
        this.restartBtn.addEventListener('click', () => this.restartQuiz());
    }

    startQuiz() {
        this.displayQuestion();
    }

    displayQuestion() {
        const question = this.quiz.questions[this.currentQuestion];
        this.clueNumber.textContent = `Clue ${this.currentQuestion + 1} of 5`;
        this.clueText.textContent = question.clue;
        this.answerInput.value = '';
        this.feedback.textContent = '';
        this.updateProgress();
    }

    checkAnswer() {
        const userAnswer = this.answerInput.value.trim().toLowerCase();
        const correctAnswer = this.quiz.questions[this.currentQuestion].answer;

        if (userAnswer === correctAnswer) {
            this.handleCorrectAnswer();
        } else {
            this.handleIncorrectAnswer();
        }
    }

    handleCorrectAnswer() {
        this.currentQuestion++;
        this.feedback.textContent = 'Correct!';
        this.feedback.style.color = '#27ae60';

        if (this.currentQuestion >= this.quiz.questions.length) {
            this.showResults();
        } else {
            setTimeout(() => this.displayQuestion(), 1000);
        }
    }

    handleIncorrectAnswer() {
        this.feedback.textContent = 'Incorrect. Try again!';
        this.feedback.style.color = '#e74c3c';
        this.answerInput.value = '';
    }

    updateProgress() {
        const progress = ((this.currentQuestion + 1) / this.quiz.questions.length) * 100;
        this.progress.style.width = `${progress}%`;
    }

    showResults() {
        this.questionContainer.classList.add('hidden');
        this.resultContainer.classList.remove('hidden');
        this.diseaseName.textContent = this.quiz.disease;
    }

    restartQuiz() {
        this.currentQuestion = 0;
        this.questionContainer.classList.remove('hidden');
        this.resultContainer.classList.add('hidden');
        this.progress.style.width = '20%';
        this.startQuiz();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MedicalQuiz();
}); 