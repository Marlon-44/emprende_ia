// src/components/ModuleSection/index.jsx
import React, { useState } from "react";
import styles from "./index.module.css";
import Test from "./Test";

import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useNavigate } from "react-router-dom";

export const ModuleSection = ({
    course = null,
    sections = [],
    currentIndex = 0,
    onPrev = () => { },
    onNext = () => { },
    onJump = () => { },
}) => {
    const navigate = useNavigate();
    const current = sections[currentIndex] ?? null;
    const [testResult, setTestResult] = useState(null);
    // testResult: { score: number, total: number, details: [...] }

    const handleTestSubmit = (answers) => {
        const test = Array.isArray(course?.test) ? course.test : [];
        const total = test.length;
        let correct = 0;
        

        const details = test.map((item, idx) => {
            const qKey = `q${idx + 1}`;
            const given = answers[qKey];
            const expected = item.respuesta_correcta;
            const ok = given === expected;
            if (ok) correct += 1;

            const opciones = item.opciones || {};
            const givenLabel = given ? opciones[given] ?? `(${given})` : null;
            const expectedLabel = opciones[expected] ?? `(${expected})`;

            return {
                index: idx + 1,
                pregunta: item.pregunta,
                expected,
                given,
                givenLabel,
                expectedLabel,
                ok,
            };
        });

        const score = correct;
        setTestResult({ score, total, details });
    };

    const resetTestResult = () => setTestResult(null);

    
    const getSeverity = (score, total) => {
        if (total === 0) return "info";
        if (total === 3) {
            if (score === 3) return "success";
            if (score === 2) return "warning";
            return "error";
        }
        const pct = (score / total) * 100;
        if (pct >= 80) return "success";
        if (pct >= 50) return "warning";
        return "error";
    };

    const getTitleAndMessage = (score, total) => {
        const severity = getSeverity(score, total);
        if (severity === "success") {
            return {
                title: "¡Excelente!",
                message: `Obtuviste ${score} de ${total} respuestas correctas. ¡Muy buen trabajo!`,
            };
        }
        if (severity === "warning") {
            return {
                title: "Bien — puedes mejorar",
                message: `Obtuviste ${score} de ${total} respuestas correctas. Revisa las preguntas que fallaste y vuelve a intentarlo.`,
            };
        }
        // error
        return {
            title: "Necesitas practicar",
            message: `Obtuviste ${score} de ${total} respuestas correctas. Te recomendamos repasar el contenido y volver a intentarlo.`,
        };
    };

    return (
        <section className={styles.module__section__container} style={{ flex: 1 }}>
            <div className={styles.section__header}>
                <h1>{course?.title ?? "Sección"}</h1>
                <div className={styles.header__button__container}>
                    <button
                        className={styles.header__button}
                        onClick={onPrev}
                        disabled={currentIndex === 0}
                    >
                        &lt; Anterior
                    </button>

                    <button
                        className={styles.header__button}
                        onClick={onNext}
                        disabled={currentIndex === sections.length - 1}
                    >
                        Siguiente &gt;
                    </button>
                </div>
                <hr />
            </div>

            <div className={styles.module__section_content_wrapper}>
                <article
                    id={`module-section-${current?.id ?? currentIndex}`}
                    className={styles.module__section_content}
                >
                    {currentIndex === sections.length - 1 ? (
                        <>
                            {testResult && (
                                <div className={styles.test__result__container}>
                                    <Stack sx={{ width: "100%" }} spacing={2}>
                                        {(() => {
                                            const { score, total } = testResult;
                                            const severity = getSeverity(score, total);
                                            const { title, message } = getTitleAndMessage(score, total);
                                            return (
                                                <Alert severity={severity}>
                                                    <AlertTitle>{title}</AlertTitle>
                                                    <div>
                                                        <p style={{ margin: 0 }}>{message}</p>
                                                        <p style={{ margin: 0, fontSize: 13, opacity: 0.9 }}>
                                                            Puntuación: {score} / {total} (
                                                            {Math.round((score / (total || 1)) * 100)}%)
                                                        </p>
                                                    </div>
                                                </Alert>
                                            );
                                        })()}
                                    </Stack>

                                    {/* botones de acción */}
                                    <div className={styles.test__result__actions} style={{ marginTop: 12 }}>
                                        

                                        <button
                                            className={styles.header__button}
                                            onClick={() => {
                                                // Avanzar a la siguiente sección (si la hay)
                                                console.log(currentIndex)
                                                console.log(sections.length)
                                                if (currentIndex == sections.length-1 ) {
                                                    navigate("/")
                                                } else {
                                                    // Si no hay siguiente, limpiamos el resultado
                                                    resetTestResult();
                                                }
                                            }}
                                        >
                                            Continuar
                                        </button>
                                    </div>
                                </div>
                            )}
                            <Test test={course?.test ?? []} onSubmit={handleTestSubmit} />

                            {/* REEMPLAZO: Muestra un Alert de MUI según el resultado */}

                        </>
                    ) : (
                        <img className={styles.slide} src={current} alt={`slide-${currentIndex}`} />
                    )}
                </article>
            </div>
        </section>
    );
};
