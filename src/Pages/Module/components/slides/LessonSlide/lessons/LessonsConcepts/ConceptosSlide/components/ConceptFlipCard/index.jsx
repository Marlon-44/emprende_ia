import { useState } from "react";
import styles from "./index.module.css"
import {motion} from "framer-motion"

const ConceptFlipCard = ({ concepto, definicion, nota, color}) => {
    const [flipped, setFlipped] = useState(false);

    return (
        <motion.div
            className={styles.flip__card}
            onHoverStart={() => setFlipped(true)}
            onHoverEnd={() => setFlipped(false)}
            
        >
            <motion.div
                className={styles.card__inner}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                <div className={styles.card__front} style={{backgroundColor:`${color}`}}>
                    <h2>{concepto}</h2>
                </div>
                <div className={styles.card__back}>
                    <p>{definicion}</p>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default ConceptFlipCard;