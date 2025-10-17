import React, { useState } from "react";
import styles from "./index.module.css";

export default function Test({ onSubmit, test = [] }) {
    const [answers, setAnswers] = useState({});
    const [errors, setErrors] = useState({});
    const [sent, setSent] = useState(false);
    const [revealAnswers, setRevealAnswers] = useState(false);

    const handleChange = (questionKey, value) => {
        if (revealAnswers) return; // bloquear cambios después de mostrar resultados
        setAnswers((a) => ({ ...a, [questionKey]: value }));
        setErrors((e) => ({ ...e, [questionKey]: undefined }));
    };

    const validate = () => {
        const newErrors = {};
        test.forEach((_, idx) => {
            const key = `q${idx + 1}`;
            if (!answers[key]) newErrors[key] = "Por favor selecciona una opción.";
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        setSent(true);
        setRevealAnswers(true); // mostrar respuestas correctas/incorrectas
        if (typeof onSubmit === "function") onSubmit(answers);
    };

    if (!Array.isArray(test) || test.length === 0) {
        return <p>No hay preguntas disponibles.</p>;
    }

    // helper para clases por opción
    const optionClass = (qIdx, optKey) => {
        if (!revealAnswers) return styles.option; // antes de enviar
        const qKey = `q${qIdx + 1}`;
        const selected = answers[qKey];
        const correct = test[qIdx].respuesta_correcta;

        // Prioridad: si es la opción correcta -> marcar como correcto (verde)
        if (optKey === correct) {
            return `${styles.option} ${styles.correct}`;
        }

        // Si es la opción seleccionada y NO es correcta -> marcar incorrecta (rojo)
        if (optKey === selected && selected !== correct) {
            return `${styles.option} ${styles.incorrect}`;
        }

        // resto sin estilo especial (deshabilitado / neutro)
        return styles.option;
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {test.map((item, idx) => {
                const qKey = `q${idx + 1}`;
                const opciones = item.opciones || {};

                return (
                    <fieldset className={styles.fieldset} key={qKey} disabled={revealAnswers}>
                        <legend className={styles.legend}>
                            {idx + 1}. {item.pregunta}
                        </legend>

                        <div className={styles.options}>
                            {Object.entries(opciones).map(([optKey, optLabel]) => (
                                <label className={optionClass(idx, optKey)} key={optKey}>
                                    <input
                                        type="radio"
                                        name={qKey}
                                        value={optKey}
                                        checked={answers[qKey] === optKey}
                                        onChange={() => handleChange(qKey, optKey)}
                                        disabled={revealAnswers}
                                    />
                                    <span className={styles.optionLabel}>{optLabel}</span>
                                </label>
                            ))}
                        </div>

                        {errors[qKey] && <p className={styles.error}>{errors[qKey]}</p>}
                    </fieldset>
                );
            })}

            <div className={styles.actions}>
                <button type="submit" className={styles.submitBtn} disabled={revealAnswers}>
                    Enviar respuestas
                </button>
            </div>

            {/*sent && (
                <div className={styles.result}>
                    <strong>Respuestas enviadas:</strong>
                    <pre>{JSON.stringify(answers, null, 2)}</pre>
                </div>
            )*/}
        </form>
    );
}
