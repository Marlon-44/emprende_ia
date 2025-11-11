import { useModules } from "../../../../../hooks/useModules";
import ObjectiveItem from "./components/ObjectiveItem";
import styles from "./index.module.css"
import {motion} from "framer-motion"
const ObjectivesSlide = ({ objetivos, titulo }) => {
    const { colors } = useModules();

    return (

        <section className={styles.objectives__slide__container}>
            <motion.div
                className={styles.titles__section}
                initial="hidden"
                animate="show"
                variants={{
                    hidden: {},
                    show: {
                        transition: {
                            staggerChildren: 0.5, // 👈 hace que h1 y h2 aparezcan en secuencia
                        },
                    },
                }}
            >
                <motion.h1
                    variants={{
                        hidden: { x: -80, opacity: 0 },
                        show: {
                            x: 0,
                            opacity: 1,
                            transition: {
                                type: "spring",
                                stiffness: 80,
                                damping: 10,
                            },
                        },
                    }}
                >
                    Objetivos del módulo
                </motion.h1>

                <motion.h3
                    variants={{
                        hidden: { x: -80, opacity: 0 },
                        show: {
                            x: 0,
                            opacity: 1,
                            transition: {
                                type: "spring",
                                stiffness: 80,
                                damping: 10,
                                delay: 0.1, // pequeño delay extra para que entre un poco después
                            },
                        },
                    }}
                >
                    {titulo}
                </motion.h3>
            </motion.div>

            <div className={styles.objectives__section}>
                <div>
                    <ul className={styles.objectives__container}>
                        {
                            Array.isArray(objetivos) ?
                                objetivos.map((o, i) => <li><ObjectiveItem key={i} texto={o} index={i + 1} color={colors[i + 1]}></ObjectiveItem></li>)
                                :
                                <p>No hay objetivos.</p>}
                    </ul></div>
            </div>
        </section>
    )
}

export default ObjectivesSlide;
const ObjectivesSlideS = ({ objetivos }) => (
    <Box>
        <Typography variant="h4" gutterBottom>Objetivos del módulo</Typography>
        <ul>
            {Array.isArray(objetivos) ? objetivos.map((o, i) => <li key={i}>{o}</li>) : <li>No hay objetivos.</li>}
        </ul>
    </Box>
);