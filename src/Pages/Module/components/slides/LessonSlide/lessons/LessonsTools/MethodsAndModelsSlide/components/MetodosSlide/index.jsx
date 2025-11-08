import { useState } from "react"
import styles from "./index.module.css"
import { motion, scale } from "framer-motion"
import ConceptFlipCard from "../../../../LessonsConcepts/ConceptosSlide/components/ConceptFlipCard";
import MetodoFlipCard from "./components/MetodoFlipCard";

const MetodosSlide = ({ metodos }) => {

    const variants = {
        left: {
            hidden: { x: -500, opacity: 0 },
            visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
            exit: { x: -100, opacity: 0, transition: { duration: 0.6, ease: "easeIn" } },
        },
        right: {
            hidden: { x: 500, opacity: 0 },
            visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
            exit: { x: 100, opacity: 0, transition: { duration: 0.6, ease: "easeIn" } },
        },
        center: {
            hidden: { y: -500, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
            exit: { y: 0, opacity: 0, transition: { duration: 0.6, ease: "easeIn" } },
        },
        circle: {
            hidden: { y: 0, rotate: 0 },
            visible: {
                y: 0,
                rotate: 180,
                transition: { duration: 1, ease: "easeOut" },
            },
            exit: {
                y: -100,
                rotate: 90,
                opacity: 0,
                scale: 0.8,
                transition: { duration: 0.8, ease: "easeIn" },
            },
        },
    };

    return (
        <div>
            {/*metodos.map((m) => (
                <div key={m.id_metodo} className={styles.item__card}>

                    <div className={styles.short__info__container}>
                        <h4>{m.titulo}</h4>
                        <p>{m.descripcion}</p>
                    </div>

                    <div className={styles.pasos__container}>
                        {m.pasos &&
                            <ol>
                                <h4>Pasos</h4>
                                {m.pasos.map((p, i) => <li key={i}>{p}</li>)}
                            </ol>}
                    </div>
                </div>
            ))*/}
            <motion.div
                className={`${styles.modelo} ${styles.left}`}
                variants={variants.left}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <div className={styles.info__section}>
                    <h2>{metodos[0].titulo}</h2>
                    <ol>
                        {metodos[0].pasos.map((p, i) => <li key={i}>{p}</li>)}
                    </ol>
                </div>
                <div className={styles.indice} style={{ backgroundColor: "#FF4D4D" }}>
                    <p>01</p>
                </div>
            </motion.div>

            <motion.div
                className={`${styles.modelo__double} ${styles.center}`}
                variants={variants.center}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <div className={styles.info__section__center}>
                    <MetodoFlipCard concepto="01" definicion={metodos[0].descripcion} color={"#FF4D4D"} />
                    <MetodoFlipCard concepto="02" definicion={metodos[1].descripcion} color={"#da42daff"} />
                </div>

                <div className={styles.indice} style={{ backgroundColor: "#A64DFF" }}>
                    <p>C</p>
                </div>
            </motion.div>

            <motion.div
                className={`${styles.modelo} ${styles.right}`}
                variants={variants.right}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <div className={styles.indice} style={{ backgroundColor: "#da42daff" }}>
                    <p>02</p>
                </div>
                <div className={styles.info__section}>
                    <h2>{metodos[1].titulo}</h2>
                    <ol>
                        {metodos[1].pasos.map((p, i) => <li key={i}>{p}</li>)}
                    </ol>
                </div>
            </motion.div>


            <motion.img src="/assets/circle.png" alt=""
                className={styles.circle}
                variants={variants.circle}
                initial="hidden"
                animate="visible"
                exit="exit" />
        </div>
    )
}

export default MetodosSlide