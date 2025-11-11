import { Link, useParams } from "react-router-dom";
import IaButton from "../../Components/IaButton";
import { ModuleSection } from "./components/ModuleSection";
import styles from "./index.module.css";
import { useEffect, useState, useCallback } from "react";
import { useModules } from "../../hooks/useModules";
import { LinearProgress } from "@mui/material";
import { motion } from "framer-motion"
export const Module = () => {
    const { id } = useParams();
    const { modules, selectedModule, selectModule, loading } = useModules();
    const [progress, setProgress] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    // 🔹 Seleccionar módulo cuando los módulos estén listos
    useEffect(() => {
        if (modules.length > 0 && !selectedModule) {
            selectModule(id);
        }
    }, [modules, id, selectedModule, selectModule]);

    // 🔹 Crear slides secuenciales
    const buildSlides = useCallback((module) => {
        if (!module) return [];
        const slides = [
            { type: "intro", data: module },
            { type: "objectives", data: module.objetivos },
        ];

        module.contenido.forEach((unidad, uIndex) => {
            unidad.lecciones.forEach((leccion, lIndex) => {
                slides.push({
                    type: "lesson",
                    unidadIndex: uIndex,
                    leccionIndex: lIndex,
                    data: leccion,
                });
            });
        });

        slides.push({ type: "congrats", data: module });
        slides.push({ type: "quiz", data: module.test });

        return slides;
    }, []);

    const slides = selectedModule ? buildSlides(selectedModule) : [];


    // 🔹 Navegación (con useCallback)
    const goPrev = useCallback(() => {
        setCurrentIndex((i) => Math.max(0, i - 1));
    }, []);

    const goNext = useCallback(() => {
        setCurrentIndex((i) => Math.min(slides.length - 1, i + 1));
    }, [slides]);

    const jumpTo = useCallback((index) => {
        if (index < 0 || index >= slides.length) return;
        setCurrentIndex(index);
        const el = document.getElementById(`module-section-${index}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, [slides]);

    // 🔹 Progreso visual
    useEffect(() => {
        if (slides.length > 0) {
            setProgress(((currentIndex + 1) / slides.length) * 100);
        } else {
            setProgress(0);
        }
    }, [currentIndex, slides]);

    if (loading) return <p>Cargando módulos...</p>;

    return (
        <>
            <section className={styles.container}>

                <LinearProgress
                    className={styles.progress__bar}
                    variant="determinate"
                    value={progress}
                    sx={{
                        height: 8,
                        borderRadius: 0,
                        backgroundColor: "#fff", // color del fondo (track)
                        "& .MuiLinearProgress-bar": {
                            backgroundColor: "#FFB84D", // color de la barra (progress)
                        },
                    }} 
                />

                <section className={styles.module_main_container}>
                    {selectedModule ? (
                        <ModuleSection
                            sections={slides}
                            currentIndex={currentIndex}
                            onPrev={goPrev}
                            onNext={goNext}
                            onJump={jumpTo}
                            course={selectedModule}
                        />
                    ) : (
                        <p>Cargando módulo...</p>
                    )}
                </section>
                <IaButton />
            </section>
        </>
    );
};
