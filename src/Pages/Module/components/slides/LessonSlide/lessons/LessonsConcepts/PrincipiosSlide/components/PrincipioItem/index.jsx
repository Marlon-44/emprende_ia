import styles from "./index.module.css"
import {motion} from "framer-motion"
const PrincipioItem = ({ principio, index, color }) => {
    return (
        <motion.div
            className={styles.principio__container}
            initial={{ y: 60, opacity: 0 }}           // empieza abajo y transparente
            animate={{ y: 0, opacity: 1 }}            // sube y aparece
            transition={{
                duration: 0.7,
                type: "spring",
                stiffness: 70,
                damping: 10,
                delay: index * 0.15,                    // cada item entra uno tras otro
            }}
        >
            <div
                className={styles.small__circle}
                style={{ backgroundColor: color }}
            ></div>

            <div className={styles.principio__info}>
                <div
                    className={styles.big__circle}
                    style={{ backgroundColor: color }}
                >
                    {`0${index + 1}`}
                </div>
                <p>{principio}</p>
            </div>
        </motion.div>
    );
}

export default PrincipioItem;