import { Box, Typography } from "@mui/material";
import styles from "./index.module.css"
import { useModules } from "../../../../../hooks/useModules";
import UnitItem from "./components/UnitItem";
import { motion } from "framer-motion";


const IntroSlide = ({ module, onJump }) => {
    console.log("MODULE", module)
    const { colors } = useModules();
    console.log(colors)

    return (
        <section className={styles.portada__container}>
            <div className={styles.titles__section}>
                {module?.subtitulo && (
                    <motion.h3
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 80,   // controla la fuerza del rebote
                            damping: 12,     // suaviza el movimiento
                            delay: 0.1,      // aparece un poco después
                        }}
                    >
                        {module.subtitulo}
                    </motion.h3>
                )}

                <motion.h1
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 80,
                        damping: 12,
                        delay: 0.3, // aparece después del subtítulo
                    }}
                >
                    {module.titulo}
                </motion.h1>

                <div className={styles.colors__container}>
                    {colors.map((color, index) => (
                        <motion.div
                            key={index}
                            className={styles.circle}
                            style={{ backgroundColor: color }}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.2, // 🔥 hace que suban uno por uno
                                ease: "easeOut",
                            }}
                        />
                    ))}
                </div>

            </div>

            <div className={styles.unities__section}>
                <ul>
                    {module?.contenido?.map((u, i) => (
                        <UnitItem key={i} title={u.unidad_titulo} subtitle={u.unidad_subtitulo} color={colors[i]} unityNumber={u.unidad_id} onJump={onJump} />

                    ))}
                </ul>

            </div>


        </section>
    );
};
export default IntroSlide;