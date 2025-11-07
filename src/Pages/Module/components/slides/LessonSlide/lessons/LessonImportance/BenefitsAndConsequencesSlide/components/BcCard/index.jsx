import { motion } from "framer-motion";
import styles from "./index.module.css";

const BcCard = ({ beneficio, consecuencia, delay = 0, color }) => {
    // Verifica si el índice es par o impar
    const isEven = delay % 2 === 0;

    // Estilo condicional para el borde decorativo
    const borderStyle = isEven
        ? {
            top: "-3%",
            borderTop: `5px solid ${color}`,
            borderLeft: `5px solid ${color}`,
            borderRight: `5px solid ${color}`,
            borderRadius: "1rem 1rem 0 0",
        }
        : {
            bottom: "-3%",
            borderBottom: `5px solid ${color}`,
            borderLeft: `5px solid ${color}`,
            borderRight: `5px solid ${color}`,
            borderRadius: "0 0 1rem 1rem",
        };

    const direction = delay % 2 === 0 ? 500 : -500;

    return (
        <div className={styles.card__wrapper}>
            {/* Borde decorativo */}
            <div className={styles.card__wrapper1} style={borderStyle}></div>

            {/* Solo la carta se anima */}
            <motion.div
                className={styles.motion__container}
                initial={{ y: direction, opacity: 1, scale: 0}}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{
                    duration:0,
                    type: "spring",
                    stiffness: 10,
                    damping: 10,
                    delay: delay * 0.15,
                }}
            >
                {/* El flip ocurre dentro, manejado solo por CSS */}
                <div className={styles.card__inner} style={{ backgroundColor: color }}>
                    <div className={`${styles.card__face} ${styles.card__front}`}>
                        <h3>Beneficio</h3>
                        <p>{beneficio}</p>
                    </div>

                    <div className={`${styles.card__face} ${styles.card__back}`}>
                        <h3>Consecuencia</h3>
                        <p>{consecuencia}</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default BcCard;
