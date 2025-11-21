import { Box, Typography, Button, Paper } from "@mui/material";
import { useState } from "react";
import styles from "./index.module.css";

const QuizSlide = ({ questions = [] }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(null)); // respuestas del usuario
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    const handleSelectOption = (optionKey) => {
        const updated = [...answers];
        updated[currentQuestion] = optionKey;
        setAnswers(updated);
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1);
        }
    };

    const handleFinish = () => {
        // Calcular puntaje al final
        let total = 0;
        questions.forEach((q, i) => {
            if (answers[i] === q.respuesta_correcta) total += 1;
        });
        setScore(total);
        setShowResults(true);
    };

    if (!questions || questions.length === 0) {
        return <Typography>No hay preguntas disponibles.</Typography>;
    }

    if (showResults) {
        return (
            <Box className={styles.quiz__results} textAlign="center">
                <Typography variant="h4" gutterBottom>Resultados</Typography>
                <Typography variant="h6">
                    {`Tu puntaje: ${score} / ${questions.length}`}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    {score === questions.length
                        ? "¡Excelente! Completaste todo correctamente 🎉"
                        : score >= questions.length / 2
                            ? "Buen trabajo, pero puedes mejorar 💪"
                            : "Sigue practicando, ¡tú puedes! 🚀"}
                </Typography>
            </Box>
        );
    }

    const question = questions[currentQuestion];

    return (
        <div className={styles.quiz__page}>
            <section className={styles.pregunta__section}>
                <h4 className={styles.pregunta}>
                    {question.pregunta}
                </h4>
            </section>

            <section className={styles.quiz__section} >
                <div className={styles.page__title}>
                    <h2>
                        Quiz Final
                    </h2>
                    <h6>
                        {`Pregunta ${currentQuestion + 1} de ${questions.length}`}
                    </h6>
                </div>
                <div className={styles.nav__section}>
                    <button
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                        className={`${styles.nav__button} ${currentQuestion === 0 ? styles.disabled : ""
                            }`}
                    >
                        Anterior
                    </button>

                    {currentQuestion === questions.length - 1 ? (
                        <button
                            onClick={handleFinish}
                            disabled={answers[currentQuestion] === null}
                            className={`${styles.nav__button} ${answers[currentQuestion] === null ? styles.disabled : ""
                                }`}
                        >
                            Ver resultados
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            disabled={answers[currentQuestion] === null}
                            className={`${styles.nav__button} ${answers[currentQuestion] === null ? styles.disabled : ""
                                }`}
                        >
                            Siguiente
                        </button>
                    )}
                </div>

                <div className={styles.options__section}>
                    {Object.entries(question.opciones).map(([key, value]) => {
                        const isSelected = answers[currentQuestion] === key;
                        return (
                            <div
                                key={key}
                                className={`${styles.option} ${isSelected ? styles.selected : ""}`}
                                onClick={() => handleSelectOption(key)}
                            >
                                <div className={styles.circle__container}>
                                    {key.toUpperCase()}
                                </div>
                                <p>{value}</p>
                            </div>
                        );
                    })}
                </div>

            </section>





        </div>
    );
};

export default QuizSlide;
