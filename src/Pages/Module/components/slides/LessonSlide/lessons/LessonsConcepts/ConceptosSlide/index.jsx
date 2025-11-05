
import { Typography } from "@mui/material";
import styles from "./index.module.css"
import ConceptFlipCard from "./components/ConceptFlipCard";
import { useModules } from "../../../../../../../../hooks/useModules";
import {motion} from "framer-motion"
import MoreButton from "./components/ConceptFlipCard/MoreButton";

const ConceptosSlide = ({ content }) => {
    const { colors } = useModules();
    return (
        <div>
            {/*content.explicacion_ampliada && (
                <Typography paragraph>{content.explicacion_ampliada}</Typography>
            )*/}

            <div className={styles.conceptos__wrapper}>
                {content.conceptos.map((c, i) => {
                    // define dirección según el índice
                    let initial;
                    switch (i) {
                        case 0:
                            initial = { x: -500, opacity: 1 }; 
                            break;
                        case 1:
                            initial = { y: -500, opacity: 1 };
                            break;
                        case 2:
                            initial = { y: 500, opacity: 1 }; 
                            break;
                        case 3:
                            initial = { x: 1000, opacity: 1 };
                            break;
                        default:
                            initial = { opacity: 0 };
                    }

                    const isLeft = i % 2 === 0;
                    const isUp = i < 2;

                    return (
                        <motion.div
                            key={i}
                            className={styles.concept__item}
                            style={{
                                flexDirection: isLeft ? "row" : "row-reverse",
                            }}
                            initial={initial}
                            animate={{ x: 0, y: 0, opacity: 1 }}
                            transition={{
                                duration: 0.5,
                                type: "spring",
                                stiffness: 50,
                                damping: 3,
                                delay: i * 0.8, // para que entren uno tras otro
                            }}
                        >
                            <h2
                                className={styles.index__number}
                                style={{
                                    alignSelf: isUp ? "flex-start" : "flex-end",
                                }}
                            >
                                {`0${i + 1}`}
                            </h2>
                            <ConceptFlipCard
                                concepto={c.termino}
                                definicion={c.definicion}
                                nota={c.nota}
                                color={colors[i + 1]}
                            />
                        </motion.div>

                    );
                })}

            </div>
            
            <MoreButton general__info={content.explicacion_ampliada}/>
        </div>

    )
}

export default ConceptosSlide;