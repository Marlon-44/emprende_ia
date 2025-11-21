import { Typography } from "@mui/material";
import styles from "./index.module.css"
import {motion} from "framer-motion"
const ErroresSlide = ({ errores }) => {
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
        <>
            <section className={styles.casos__page}>
                {/* Sección izquierda */}
                <motion.section
                    className={styles.caso__izq}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div className={styles.info__container} variants={leftItem}>
                        <h3 className={styles.case__title} style={{ backgroundColor: `#FF4D4D` }}>
                            {errores[0].titulo}
                        </h3>
                        <p>{`${errores[0].descripcion}`}</p>
                    </motion.div>

                    <motion.div className={styles.info__container} variants={leftItem}>
                        <h3 className={styles.case__title} style={{ backgroundColor: `#FFD54F` }}>
                            {errores[1].titulo}
                        </h3>
                        <p>{errores[0].descripcion}</p>
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
                        src="/assets/circle__lines.svg"
                        alt="errores exitosos gráfico"
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
                        <h3 className={styles.case__title} style={{ backgroundColor: `#66E066` }}>
                            {errores[2].titulo}
                        </h3>
                        <p>{`${errores[1].descripcion}`}</p>
                    </motion.div>

                    <motion.div className={styles.info__container} variants={rightItem}>
                        <h3 className={styles.case__title} style={{ backgroundColor: `#4DB8FF` }}>
                            {errores[3].titulo}
                        </h3>
                        <p>{errores[3].descripcion}</p>
                    </motion.div>

                </motion.section>

                <h2 className={styles.page__title}>Errores exitosos</h2>
            </section>
            
        </>
    )
}

export default ErroresSlide;