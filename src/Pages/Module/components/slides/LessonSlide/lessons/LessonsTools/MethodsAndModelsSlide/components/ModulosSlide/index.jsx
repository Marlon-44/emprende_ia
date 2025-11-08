import { motion, AnimatePresence } from "framer-motion";
import styles from "./index.module.css";

const ModulosSlide = ({ modelos }) => {
    // Variantes de animación para reutilizar
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
            hidden: { y: 0, rotate: -180, },
            visible: {
                y: 0,
                rotate: 0,
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
        <AnimatePresence mode="wait">
            <div className={styles.container}>
                <motion.div
                    className={`${styles.modelo} ${styles.left}`}
                    variants={variants.left}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className={styles.info__section}>
                        <h2>{modelos[0].titulo}</h2>
                        <p>{modelos[0].descripcion}</p>
                    </div>
                    <div className={styles.indice} style={{ backgroundColor: "#4DB8FF" }}>
                        <p>01</p>
                    </div>
                </motion.div>

                <motion.div
                    className={`${styles.modelo} ${styles.center}`}
                    variants={variants.center}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className={styles.info__section}>
                        <h2>{modelos[1].titulo}</h2>
                        <p>{modelos[1].descripcion}</p>
                    </div>
                    <div className={styles.indice} style={{ backgroundColor: "#66E066" }}>
                        <p>02</p>
                    </div>
                </motion.div>

                <motion.div
                    className={`${styles.modelo} ${styles.right}`}
                    variants={variants.right}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className={styles.indice} style={{ backgroundColor: "#FFB84D" }}>
                        <p>03</p>
                    </div>
                    <div className={styles.info__section}>
                        <h2>{modelos[2].titulo}</h2>
                        <p>{modelos[2].descripcion}</p>
                    </div>
                </motion.div>

                <motion.img
                    src="/assets/circle.png"
                    alt="circle"
                    className={styles.circle__figure}
                    variants={variants.circle}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                />
            </div>
        </AnimatePresence>
    );
};

export default ModulosSlide;
