class MedicalCase {
    constructor(patientInfo, medicalHistory, patientStats, startingQuestion) {
        this.patientInfo = patientInfo;
        this.medicalHistory = medicalHistory;
        this.patientStats = patientStats;
        this.startingQuestion = startingQuestion;
        this.currentQuestion = null;
        this.findings = [];
    }
}

class Question {
    constructor(text, options) {
        this.text = text;
        this.options = options;
    }
}

class Game {
    constructor() {
        // Define all possible questions
        this.questionBank = {
            'start': new Question(
                "What would you like to focus on first?",
                [
                    { 
                        text: "Ask about recent travel history",
                        nextQuestion: 'travel',
                        finding: "Patient recently traveled to a region with active measles cases."
                    },
                    { 
                        text: "Examine the rash",
                        nextQuestion: 'rash',
                        finding: "The rash appears maculopapular and started on the face."
                    },
                    { 
                        text: "Check vital signs",
                        nextQuestion: 'vitals',
                        finding: "Temperature is 101.2°F, other vitals are stable."
                    }
                ]
            ),
            'travel': new Question(
                "The patient mentions recent travel. What's your next step?",
                [
                    {
                        text: "Ask about specific exposure risks",
                        nextQuestion: 'exposure',
                        finding: "Patient visited areas with known measles outbreaks."
                    },
                    {
                        text: "Investigate vaccination history",
                        nextQuestion: 'vaccination',
                        finding: "Patient's vaccination records are incomplete."
                    }
                ]
            ),
            'exposure': new Question(
                "After learning about exposure risks, what would you like to examine?",
                [
                    {
                        text: "Check for Koplik's spots",
                        nextQuestion: 'koplik',
                        finding: "Tiny white spots (Koplik's spots) found inside the mouth."
                    },
                    {
                        text: "Examine lymph nodes",
                        nextQuestion: 'lymph',
                        finding: "Lymph nodes are slightly enlarged."
                    }
                ]
            ),
            'vaccination': new Question(
                "The vaccination records are incomplete. What's your next step?",
                [
                    {
                        text: "Examine the rash pattern",
                        nextQuestion: 'pattern',
                        finding: "Rash is spreading downward from face to trunk."
                    },
                    {
                        text: "Order blood tests",
                        nextQuestion: 'bloodwork',
                        finding: "Blood tests ordered to check immunity status."
                    }
                ]
            ),
            'rash': new Question(
                "Upon examining the rash, you notice it started on the face. What would you check next?",
                [
                    {
                        text: "Check for Koplik's spots",
                        nextQuestion: 'koplik',
                        finding: "Tiny white spots (Koplik's spots) found inside the mouth."
                    },
                    {
                        text: "Examine rash spread pattern",
                        nextQuestion: 'pattern',
                        finding: "Rash is spreading downward from face to trunk."
                    }
                ]
            ),
            'vitals': new Question(
                "After checking vitals, what would you like to investigate next?",
                [
                    {
                        text: "Examine the rash",
                        nextQuestion: 'rash',
                        finding: "The rash appears maculopapular and started on the face."
                    },
                    {
                        text: "Check vaccination history",
                        nextQuestion: 'vaccination',
                        finding: "Patient's vaccination records are incomplete."
                    }
                ]
            ),
            'koplik': new Question(
                "After finding Koplik's spots, what's your next step?",
                [
                    {
                        text: "Make final diagnosis",
                        nextQuestion: 'diagnosis',
                        finding: "Proceeding to final diagnosis based on findings."
                    },
                    {
                        text: "Order confirmatory tests",
                        nextQuestion: 'tests',
                        finding: "Ordered measles-specific antibody tests."
                    }
                ]
            ),
            'pattern': new Question(
                "The rash pattern is characteristic. What would you like to do next?",
                [
                    {
                        text: "Make final diagnosis",
                        nextQuestion: 'diagnosis',
                        finding: "Proceeding to final diagnosis based on findings."
                    },
                    {
                        text: "Check for additional symptoms",
                        nextQuestion: 'symptoms',
                        finding: "Patient also reports cough and conjunctivitis."
                    }
                ]
            ),
            'lymph': new Question(
                "After examining lymph nodes, what's your next step?",
                [
                    {
                        text: "Examine the rash pattern",
                        nextQuestion: 'pattern',
                        finding: "Rash is spreading downward from face to trunk."
                    },
                    {
                        text: "Order blood tests",
                        nextQuestion: 'bloodwork',
                        finding: "Blood tests ordered to check immunity status."
                    }
                ]
            ),
            'bloodwork': new Question(
                "Blood test results are in. What would you like to do?",
                [
                    {
                        text: "Make final diagnosis",
                        nextQuestion: 'diagnosis',
                        finding: "Proceeding to final diagnosis based on findings."
                    },
                    {
                        text: "Check for additional symptoms",
                        nextQuestion: 'symptoms',
                        finding: "Patient also reports cough and conjunctivitis."
                    }
                ]
            ),
            'symptoms': new Question(
                "After gathering all symptoms, are you ready to make a diagnosis?",
                [
                    {
                        text: "Yes, make final diagnosis",
                        nextQuestion: 'diagnosis',
                        finding: "Proceeding to final diagnosis based on all findings."
                    },
                    {
                        text: "Order additional tests",
                        nextQuestion: 'tests',
                        finding: "Ordered measles-specific antibody tests."
                    }
                ]
            ),
            'tests': new Question(
                "Test results support viral infection. Ready to make a diagnosis?",
                [
                    {
                        text: "Yes, make final diagnosis",
                        nextQuestion: 'diagnosis',
                        finding: "All test results received, proceeding to diagnosis."
                    }
                ]
            ),
            'diagnosis': new Question(
                "Based on all findings, what is your diagnosis?",
                [
                    {
                        text: "Measles (Rubeola)",
                        nextQuestion: 'end_measles',
                        finding: "Final Diagnosis: Measles"
                    },
                    {
                        text: "Rubella",
                        nextQuestion: 'end_rubella',
                        finding: "Final Diagnosis: Rubella"
                    }
                ]
            )
        };

        this.diagnoses = {
            'end_measles': {
                name: "Measles (Rubeola)",
                description: "Your diagnosis of Measles is supported by:\n\n" +
                    "• The characteristic progression of symptoms\n" +
                    "• Presence of Koplik's spots\n" +
                    "• Travel history to affected area\n" +
                    "• Typical rash pattern\n\n" +
                    "Recommended next steps: Isolate patient and notify public health authorities."
            },
            'end_rubella': {
                name: "Rubella",
                description: "Consider reviewing the case. Key findings suggest this might not be Rubella:\n\n" +
                    "• Presence of Koplik's spots (not typical in Rubella)\n" +
                    "• High fever (usually mild in Rubella)\n" +
                    "• Rash pattern and progression"
            }
        };

        // Create the initial case
        this.cases = [
            new MedicalCase(
                "John presents with fever, joint pain, and a recent rash. He reports feeling chronically fatigued for the past few weeks.",
                {
                    allergies: "None known",
                    previousConditions: "Seasonal flu (2022)",
                    medications: "None",
                    familyHistory: "Father - Type 2 Diabetes, Mother - Hypertension"
                },
                {
                    age: 45,
                    gender: "Male",
                    height: "5'10\"",
                    weight: "180 lbs",
                    bloodPressure: "138/85",
                    temperature: "101.2°F"
                },
                'start' // Starting question ID
            )
        ];

        this.currentCase = null;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.getElementById('start-case').addEventListener('click', () => this.showCaseIntro());
        document.getElementById('start-diagnosis').addEventListener('click', () => this.startDiagnosis());
        document.getElementById('play-again').addEventListener('click', () => this.showScreen('patient-info'));
    }

    showCaseIntro() {
        this.currentCase = this.cases[Math.floor(Math.random() * this.cases.length)];
        this.currentCase.currentQuestion = this.currentCase.startingQuestion; // Use the starting question
        this.currentCase.findings = []; // Reset findings
        
        // Display case information
        document.getElementById('case-description').textContent = this.currentCase.patientInfo;
        
        // Display patient stats
        const statsHtml = Object.entries(this.currentCase.patientStats)
            .map(([key, value]) => `<p><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}</p>`)
            .join('');
        document.getElementById('patient-stats').innerHTML = statsHtml;
        
        // Display medical history
        const historyHtml = Object.entries(this.currentCase.medicalHistory)
            .map(([key, value]) => `<p><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}</p>`)
            .join('');
        document.getElementById('medical-history').innerHTML = historyHtml;
        
        this.showScreen('case-intro');
    }

    startDiagnosis() {
        document.getElementById('feedback-list').innerHTML = '';
        this.displayQuestion();
    }

    displayQuestion() {
        const question = this.questionBank[this.currentCase.currentQuestion];
        document.getElementById('question-text').textContent = question.text;
        
        // Update question number (based on findings count)
        const currentStep = this.currentCase.findings.length + 1;
        document.getElementById('question-number').textContent = `Step ${currentStep}`;
        
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = `${String.fromCharCode(65 + index)}. ${option.text}`;
            button.addEventListener('click', () => this.handleAnswer(option));
            optionsContainer.appendChild(button);
        });

        this.showScreen('question-screen');
    }

    handleAnswer(option) {
        // Add the finding to our list
        this.currentCase.findings.push(option.finding);
        
        // Update the findings display
        const feedbackList = document.getElementById('feedback-list');
        const feedbackItem = document.createElement('div');
        feedbackItem.className = 'feedback-item';
        feedbackItem.innerHTML = `
            <div class="finding-text">${option.finding}</div>
        `;
        feedbackList.insertBefore(feedbackItem, feedbackList.firstChild);

        // Check if we've reached a diagnosis
        if (option.nextQuestion.startsWith('end_')) {
            this.showDiagnosis(option.nextQuestion);
        } else {
            // Move to next question
            this.currentCase.currentQuestion = option.nextQuestion;
            this.displayQuestion();
        }
    }

    showDiagnosis(diagnosisId) {
        const diagnosis = this.diagnoses[diagnosisId];
        const resultDiv = document.getElementById('diagnosis-result');
        
        resultDiv.innerHTML = `
            <h3>Your Diagnosis:</h3>
            <h4>${diagnosis.name}</h4>
            <div class="diagnosis-details">
                ${diagnosis.description}
            </div>
            <div class="findings-summary">
                <h4>Your Investigation Path:</h4>
                <ul>
                    ${this.currentCase.findings.map(finding => `<li>${finding}</li>`).join('')}
                </ul>
            </div>
        `;
        
        this.showScreen('result-screen');
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }
}

// Initialize the game when the page loads
window.addEventListener('load', () => {
    new Game();
}); 