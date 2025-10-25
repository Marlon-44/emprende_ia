import React, { useState, useEffect, useMemo } from "react";
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

    // Si la prop `sections` se reconstruye por referencia desde el padre,
    // useMemo la estabiliza para evitar renders innecesarios en dependencias.
    const stableSections = useMemo(() => sections, [JSON.stringify(sections)]);

    const current = stableSections[currentIndex] ?? null;
    const [testResult, setTestResult] = useState(null);

    // Logging: solo cuando cambia el módulo actual (o al montar)
    useEffect(() => {
        console.log("Módulo cargado - index:", currentIndex);
        console.log("URL actual:", current);
        // si quieres ver todas las secciones solo cuando el módulo cambia:
        console.log("Secciones:", stableSections);
    }, [currentIndex, current, stableSections]);

    // Preload: siguiente y previa cada vez que cambie currentIndex
    useEffect(() => {
        if (!stableSections || stableSections.length === 0) return;

        const nextIndex = (currentIndex + 1) % stableSections.length;
        const prevIndex = (currentIndex - 1 + stableSections.length) % stableSections.length;

        const nextSrc = stableSections[nextIndex];
        const prevSrc = stableSections[prevIndex];

        const preload = (src) => {
            if (!src) return;
            const img = new Image();
            img.src = src;
            // opcional: img.onload = () => console.log('preloaded', src)
            // opcional: img.onerror = () => console.log('preload error', src)
        };

        preload(nextSrc);
        preload(prevSrc);
    }, [currentIndex, stableSections]);

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
                        disabled={currentIndex === stableSections.length - 1}
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
                    {currentIndex === stableSections.length - 1 ? (
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

                                    <div className={styles.test__result__actions} style={{ marginTop: 12 }}>
                                        <button
                                            className={styles.header__button}
                                            onClick={() => {
                                                if (currentIndex === stableSections.length - 1) {
                                                    navigate("/");
                                                } else {
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
                        </>
                    ) : (
                        <img
                            className={styles.slide}
                            src={current}
                            alt={`slide-${currentIndex}`}
                            loading="eager"
                        />
                    )}
                </article>
            </div>
        </section>
    );
};
