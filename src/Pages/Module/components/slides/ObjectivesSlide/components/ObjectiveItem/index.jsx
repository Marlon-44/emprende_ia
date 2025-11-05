import { motion } from "framer-motion";
import styles from "./index.module.css";

const ObjectiveItem = ({ texto, color, index }) => {
    return (
        <motion.div
            className={styles.objective__container}
            initial="hidden"
            animate="show"
            variants={{
                hidden: {},
                show: {
                    transition: {
                        staggerChildren: 0.2, // retrasa hijos uno por uno
                    },
                },
            }}
        >
            {/* Círculo con animación desde abajo */}
            <motion.div
                className={styles.circle__mark}
                style={{ backgroundColor: color }}
                variants={{
                    hidden: { y: 500, opacity: 1 },
                    show: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            type: "spring",
                            stiffness: 80,
                            damping: 10,
                            delay: index * 0.1, // efecto escalonado según el index
                        },
                    },
                }}
            >
                <h2>{`0${index}`}</h2>
            </motion.div>

            {/* Texto con fade-in suave */}
            <motion.div
                className={styles.objective__info}
                variants={{
                    hidden: { opacity: 0 },
                    show: {
                        opacity: 1,
                        transition: {
                            duration: 0.8,
                            delay: index * 0.15, // sincronizado con el círculo
                        },
                    },
                }}
            >
                <h2>Objetivo Específico</h2>
                <p>{texto}</p>
            </motion.div>
        </motion.div>
    );
};

export default ObjectiveItem;
