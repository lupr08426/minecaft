
document.addEventListener('DOMContentLoaded', () => {

    const quizSection = document.getElementById('quiz');
    const resultsSection = document.getElementById('results');
    const submitButton = document.getElementById('submit-button');
    const restartButton = document.getElementById('restart-button');
    const scoreElement = document.getElementById('score');
    const feedbackElement = document.getElementById('feedback');
    
    const correctAnswers = {
        q1: 'b', // 2011
        q2: 'b', // Palo y carbón
        q3: 'c', // Oveja
        q4: 'c', // 12
        q5: 'a', // Markus "Notch" Persson
        q6: 'b', // Hueso
        q7: 'd', // Pico de diamante
        q8: 'b', // Tundra volcánica
        q9: 'b', // 10
        q10: 'c' // Microsoft
    };
    
    const allLabels = document.querySelectorAll('label');
    allLabels.forEach(label => {
        const radioInput = label.querySelector('input[type="radio"]');
        const textSpan = document.createElement('span');
        textSpan.textContent = label.textContent;
        label.textContent = '';
        label.appendChild(radioInput);
        label.appendChild(textSpan);
    });
    
    // Manejar el envío del formulario
    submitButton.addEventListener('click', () => {
        // Calcular la puntuación
        let score = 0;
        let answeredQuestions = 0;
        
        // Comprobar cada pregunta
        for (let i = 1; i <= 10; i++) {
            const questionName = `q${i}`;
            const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
            
            if (selectedOption) {
                answeredQuestions++;
                if (selectedOption.value === correctAnswers[questionName]) {
                    score++;
                }
            }
        }
        
        // Verificar si se han respondido todas las preguntas
        if (answeredQuestions < 10) {
            alert(`¡Todavía faltan ${10 - answeredQuestions} preguntas por responder!`);
            return;
        }
        
        // Calcular porcentaje
        const percentage = (score / 10) * 100;
        
        // Mostrar puntuación
        scoreElement.textContent = `Has acertado ${score} de 10 preguntas (${percentage}%)`;
        
        // Determinar nivel de conocimiento y mostrar retroalimentación
        let feedback = '';
        
        if (percentage === 100) {
            feedback = '¡Increíble! Eres un auténtico experto en Minecraft. ¡Notch estaría orgulloso!';
        } else if (percentage >= 80) {
            feedback = '¡Excelente! Tienes un gran conocimiento sobre Minecraft. ¡Eres casi un profesional!';
        } else if (percentage >= 60) {
            feedback = '¡Buen trabajo! Conoces bastante bien Minecraft, pero aún hay cosas por descubrir.';
        } else if (percentage >= 40) {
            feedback = 'No está mal. Tienes conocimientos básicos de Minecraft, pero todavía tienes mucho por aprender.';
        } else if (percentage >= 20) {
            feedback = 'Parece que recién estás comenzando tu aventura en Minecraft. ¡Sigue explorando!';
        } else {
            feedback = '¿Estás seguro de que has jugado Minecraft alguna vez? ¡Es hora de empezar a construir!';
        }
        
        feedbackElement.textContent = feedback;
        
        // Mostrar sección de resultados y ocultar preguntas
        quizSection.style.display = 'none';
        resultsSection.style.display = 'block';
        
        // Añadir efecto de animación a los resultados
        resultsSection.style.animation = 'glow 2s infinite';
        
        // Mostrar respuestas correctas e incorrectas (opcional)
        highlightCorrectAnswers();
    });
    
    // Función para resaltar respuestas correctas
    function highlightCorrectAnswers() {
        for (let i = 1; i <= 10; i++) {
            const questionName = `q${i}`;
            const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
            
            if (selectedOption) {
                const correct = correctAnswers[questionName];
                const selectedLabel = selectedOption.parentElement;
                const correctLabel = document.querySelector(`input[name="${questionName}"][value="${correct}"]`).parentElement;
                
                if (selectedOption.value === correct) {
                    // Respuesta correcta
                    selectedLabel.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
                    selectedLabel.style.borderLeft = '3px solid #00ff00';
                } else {
                    // Respuesta incorrecta
                    selectedLabel.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
                    selectedLabel.style.borderLeft = '3px solid #ff0000';
                    
                    // Mostrar la respuesta correcta
                    correctLabel.style.backgroundColor = 'rgba(0, 255, 0, 0.1)';
                    correctLabel.style.borderLeft = '3px solid #00ff00';
                }
            }
        }
    }
    
    // Reiniciar el quiz
    restartButton.addEventListener('click', () => {
        // Limpiar selecciones
        const allInputs = document.querySelectorAll('input[type="radio"]');
        allInputs.forEach(input => {
            input.checked = false;
        });
        
        // Revertir estilos de las respuestas
        const allLabels = document.querySelectorAll('label');
        allLabels.forEach(label => {
            label.style.backgroundColor = '';
            label.style.borderLeft = '';
        });
        
        // Mostrar preguntas y ocultar resultados
        quizSection.style.display = 'block';
        resultsSection.style.display = 'none';
        
        // Desplazarse al inicio
        window.scrollTo(0, 0);
    });
    
    // Añadir efectos visuales
    function addVisualEffects() {
        // Efecto de aparición gradual para las preguntas
        const questions = document.querySelectorAll('.question-container');
        questions.forEach((question, index) => {
            question.style.opacity = '0';
            question.style.transform = 'translateY(20px)';
            question.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                question.style.opacity = '1';
                question.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
        // Efecto hover para el botón
        submitButton.addEventListener('mouseover', () => {
            submitButton.style.transform = 'scale(1.05)';
        });
        
        submitButton.addEventListener('mouseout', () => {
            submitButton.style.transform = 'scale(1)';
        });
    }
    
    // Iniciar efectos visuales
    addVisualEffects();
});