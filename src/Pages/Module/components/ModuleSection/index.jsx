// src/components/ModuleSection/index.jsx
import React from "react";
import styles from "./index.module.css";

export const ModuleSection = ({ course = null, sections = [], currentIndex = 0, onPrev = () => { }, onNext = () => { }, onJump = () => { } }) => {
    const current = sections[currentIndex] ?? null;

    return (
        <section className={styles.module__section__container} style={{ flex: 1 }}>
            <div className={styles.section__header}>
                <h1>{course.title ?? "Sección"}</h1>
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
                    {/*typeof current?.content === "string" ? (
                        <p>{current.content}</p>
                    ) : (
                        current?.content ?? <p>Sin contenido disponible.</p>
                    )*/}
                    <img className={styles.slide} src={current} alt="img1" />
                </article>
            </div>
        </section>
    );
};

