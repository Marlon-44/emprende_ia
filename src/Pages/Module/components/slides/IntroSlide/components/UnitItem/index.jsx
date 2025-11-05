import styles from "./index.module.css";
import { motion } from "framer-motion";


const UnitItem = ({ title, subtitle, color, unityNumber, onJump }) => {
    const handleClick = () => {
        switch (unityNumber) {
            case "U1":
                onJump(2);
                break;
            case "U2":
                onJump(4);
                break;
            case "U3":
                onJump(6);
                break;
            case "U4":
                onJump(8);
                break;
            default:
                console.warn("Unidad desconocida:", unityNumber);
                break;
        }
    };

    return (
        <div
            className={styles.unit__item__container}
            style={{ borderLeft: `5px solid ${color}` }}
        >
            <div className={styles.arrow__mark} style={{ backgroundColor: color }} />

            <motion.div
                className={styles.item__info__container}
                style={{ backgroundColor: color }}
                onClick={handleClick}
                initial={{ x: 100, opacity: 1}}
                animate={{ x: 0, opacity: 1 }}
                whileHover={{ scale: 0.97 }}  
                transition={{
                    type: "spring",
                    stiffness: 80,
                    damping: 1.8,
                    duration: 0.1,
                }}
            >
                <h2>{title}</h2>
                <h4>{subtitle}</h4>
            </motion.div>


            <div className={styles.cross__line} style={{ backgroundColor: color }}></div>
            <div className={styles.vertical__line1}></div>
            <div className={styles.vertical__line2}></div>
        </div>
    );
};

export default UnitItem;
