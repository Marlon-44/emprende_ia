import React, { useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from "./index.module.css"; // crea este archivo CSS o adapta tu index.module.css
import IntroSlide from "../slides/IntroSlide";
import { Link, useNavigate } from "react-router-dom";
import { Home, HomeFilled, HomeMaxRounded, HomeOutlined, HomeRepairService, HomeRounded, HomeWork } from "@mui/icons-material";
import ObjectivesSlide from "../slides/ObjectivesSlide";
import SlideRenderer from "../SlideRenderer";

/**
 * ModuleSection
 * Props:
 *  - sections: array de slides (construido en Module.jsx)
 *  - currentIndex: índice actual (number)
 *  - onPrev, onNext, onJump: funciones para controlar navegación
 *  - course: módulo completo (para datos del curso si hace falta)
 */
export const ModuleSection = ({ sections = [], currentIndex = 0, onPrev, onNext, onJump, course }) => {
    const containerRef = useRef(null);
    const navigate = useNavigate();    // Enfocar la slide actual para accesibilidad
    useEffect(() => {
        const el = containerRef.current;
        if (el) el.focus();
    }, [currentIndex]);

    // Navegación por teclado: izquierda / derecha
    const handleKey = useCallback(
        (ev) => {
            if (ev.key === "ArrowRight") {
                onNext?.();
            } else if (ev.key === "ArrowLeft") {
                onPrev?.();
            }
        },
        [onNext, onPrev]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [handleKey]);

    if (!Array.isArray(sections) || sections.length === 0) {
        return <div className={styles.empty}>Módulo vacío</div>;
    }

    const slide = sections[currentIndex];
    const goToHome = () => {
        navigate("/")
    }

    return (
        <div
            ref={containerRef}
            tabIndex={0}
            className={styles.fullscreen_container}
            aria-label={`Slide ${currentIndex + 1} de ${sections.length}`}
        >
            <div className={styles.slide_wrapper} id={`module-section-${currentIndex}`}>
                {/* Header simple con título del curso + posición */}
                <header className={styles.slide_header}>
                    {
                        <Link to="/" className={styles.logo__btn}>EmprendIA</Link>
                    }
                </header>

                {/* Contenido principal */}
                <main className={styles.slide_main}>
                    <SlideRenderer slide={slide} course={course} onJump={onJump}/>
                </main>

                {/* Footer / controles */}
                <footer className={styles.slide_footer}>
                    {/* BTN ANTERIOR */}
                    <div className={styles.footer_left}>
                        <IconButton
                            aria-label="anterior"
                            onClick={onPrev}
                            disabled={currentIndex === 0}
                            size="large"
                            sx={{ color: "#5955b3" }}
                        >
                            <ArrowBackIosNewIcon />
                        </IconButton>
                    </div>

                    {/* BTN INICIO */}

                    <div className={styles.action__button__container}>
                        {
                            currentIndex === sections.length - 1 ?
                                <button
                                    className={styles.footer__btn}
                                    onClick={goToHome}
                                >
                                    Finalizar
                                </button>
                                :

                                
                                <HomeRounded
                                    sx={{
                                        color: '#5955b3',   // tu color personalizado
                                        fontSize: 40,     
                                        zIndex:6  // tamaño del ícono
                                    }}
                                    onClick={() => onJump(0)}
                                    className={styles.start__btn}
                                />

                        }

                    </div>
                    {/* BTN NEXT */}
                    <div className={styles.footer_center}>
                        <IconButton
                            aria-label="anterior"
                            onClick={onNext}
                            disabled={currentIndex === sections.length - 1}
                            size="large"
                            sx={{ color: "#5955b3" }}
                        >
                            <ArrowForwardIosIcon />
                        </IconButton>


                    </div>


                </footer>
            </div>
        </div>
    );
};

ModuleSection.propTypes = {
    sections: PropTypes.array.isRequired,
    currentIndex: PropTypes.number.isRequired,
    onPrev: PropTypes.func,
    onNext: PropTypes.func,
    onJump: PropTypes.func,
    course: PropTypes.object
};
