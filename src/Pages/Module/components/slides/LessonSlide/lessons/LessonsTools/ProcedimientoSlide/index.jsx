import { motion } from "framer-motion";
import styles from "./index.module.css";
import { useModules } from "../../../../../../../../hooks/useModules";

const ProcedimientoSlide = ({ procedimientos }) => {
    const { colors } = useModules();

    // Variantes para las animaciones
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2, // cada hijo se anima con un pequeño retraso
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 }, // empieza abajo y oculto
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring", // efecto rebote
                stiffness: 120,
                damping: 12,
            },
        },
    };

    return (
        <section className={styles.procedimientos__section}>
            {/* PRIMERA FILA */}
            <motion.section
                className={styles.procedimientos__container}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {procedimientos.slice(0, 3).map((procedimiento, i) => (
                    <motion.div
                        key={i}
                        className={styles.procedimiento__item}
                        variants={itemVariants}
                    >
                        <div
                            className={styles.circle__index}
                            style={{ border: `1rem solid ${colors[i]}` }}
                        >
                            <h2>{`0${i + 1}`}</h2>
                        </div>
                        <div
                            className={styles.procedimiento__info}
                            style={{ backgroundColor: `${colors[i]}` }}
                        >
                            <p>{procedimiento}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.section>

            {/* SEGUNDA FILA */}
            <motion.section
                className={styles.procedimientos__container}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                transition={{ delayChildren: 1 }} // empieza después de la primera fila
            >
                {procedimientos.slice(3).map((procedimiento, i) => (
                    <motion.div
                        key={i + 3}
                        className={styles.procedimiento__item}
                        variants={itemVariants}
                    >
                        <div
                            className={styles.circle__index}
                            style={{ border: `1rem solid ${colors[i + 3]}` }}
                        >
                            <h2>{`0${i + 4}`}</h2>
                        </div>
                        <div
                            className={styles.procedimiento__info}
                            style={{ backgroundColor: `${colors[i + 3]}` }}
                        >
                            <p>{procedimiento}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.section>

            <h2 className={styles.page__title}>Procedimiento</h2>
        </section>
    );
};

export default ProcedimientoSlide;
