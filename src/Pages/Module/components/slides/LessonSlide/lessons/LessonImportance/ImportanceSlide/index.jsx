
import { useState } from "react";
import styles from "./index.module.css"
import {motion} from "framer-motion"
import AdsClickIcon from '@mui/icons-material/AdsClick';
import { AdsClick, AdsClickOutlined, MouseOutlined } from "@mui/icons-material";

const ImportanceSlide = ({ importancia }) => {

    const [flipped, setFlipped] = useState(false);
    return (

        <div className={styles.importance__page}>
            <motion.section
                className={`${styles.text__container} ${flipped ? styles.flipped : ""}`}
                initial={{ scale: 1.8, opacity: 0 }}
                animate={{ scale: 1,  opacity: 1 }}
                transition={{
                    duration: 1.2,
                    ease: [0.25, 0.1, 0.25, 1],
                    
                }}
                onClick={() => setFlipped(!flipped)}
            >
                <div className={styles.card__inner}>
                    {/* Cara frontal */}
                    <div className={styles.card__front}>
                        <AdsClickOutlined sx={{ fontSize: 48 }} />
                        <h2>Clickeame!</h2>
                    </div>

                    {/* Cara trasera */}
                    <div className={styles.card__back}>
                        <h1>Importancia</h1>
                        <p>{importancia}</p>
                    </div>
                </div>
            </motion.section>
            
            {/*<section className={styles.graphic__container}>
                <img src="/assets/yellow__cartoon.png" alt="" />
            </section><div className={styles.figures__backgorund}>
           </div>*/}
            

        </div>

    )
}

export default ImportanceSlide