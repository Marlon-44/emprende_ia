import { motion } from "framer-motion";
import styles from "./index.module.css";

const CasosSlide = ({ casos }) => {
    // Variantes para animaciones de entrada secuencial
    const containerVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.25 },
        },
    };

    const leftItem = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const rightItem = {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const centerGraphic = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    return (
        <section className={styles.casos__page}>
            {/* Sección izquierda */}
            <motion.section
                className={styles.caso__izq}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div className={styles.info__container} variants={leftItem}>
                    <h3 className={styles.case__title} style={{ backgroundColor: `#A64DFF` }}>
                        Organización
                    </h3>
                    <p>{`${casos[0].organizacion} - ${casos[0].titulo}`}</p>
                </motion.div>

                <motion.div className={styles.info__container} variants={leftItem}>
                    <h3 className={styles.case__title} style={{ backgroundColor: `#4DB8FF` }}>
                        Qué hicieron
                    </h3>
                    <p>{casos[0].que_hicieron}</p>
                </motion.div>

                <motion.div className={styles.info__container} variants={leftItem}>
                    <h3 className={styles.case__title} style={{ backgroundColor: `#FFD54F` }}>
                        Resultados
                    </h3>
                    <p>{casos[0].resultados}</p>
                </motion.div>
            </motion.section>

            {/* Gráfico central */}
            <motion.section
                className={styles.grafico}
                variants={centerGraphic}
                initial="hidden"
                animate="visible"
            >
                <motion.img
                    src="/assets/cases__graphic.svg"
                    alt="Casos exitosos gráfico"
                    className={styles.graphic__img}
                />
            </motion.section>

            {/* Sección derecha */}
            <motion.section
                className={styles.caso__der}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div className={styles.info__container} variants={rightItem}>
                    <h3 className={styles.case__title} style={{ backgroundColor: `#A64DFF` }}>
                        Organización
                    </h3>
                    <p>{`${casos[1].organizacion} - ${casos[1].titulo}`}</p>
                </motion.div>

                <motion.div className={styles.info__container} variants={rightItem}>
                    <h3 className={styles.case__title} style={{ backgroundColor: `#FF4D4D` }}>
                        Qué hicieron
                    </h3>
                    <p>{casos[1].que_hicieron}</p>
                </motion.div>

                <motion.div className={styles.info__container} variants={rightItem}>
                    <h3 className={styles.case__title} style={{ backgroundColor: `#FFB84D` }}>
                        Resultados
                    </h3>
                    <p>{casos[1].resultados}</p>
                </motion.div>
            </motion.section>

            <h2 className={styles.page__title}>Casos exitosos</h2>
        </section>
    );
};

export default CasosSlide;
