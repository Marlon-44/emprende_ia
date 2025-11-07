import { Link, useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import styles from "./index.module.css";
import { getAllModules } from "../../../Api/module";
import { useModules } from "../../../hooks/useModules";
import { style } from "framer-motion/client";

export const Header = () => {
    const [ setModules] = useState([]);
    const navigate = useNavigate()
    const {modules} = useModules()

    /*useEffect(() => {
        // Cargamos los módulos al montar el componente
        const fetchModules = async () => {
            try {
                const data = await getAllModules();
                setModules(data);
            } catch (error) {
                console.error("Error al cargar los módulos:", error);
            }
        };

        fetchModules();
    }, []);*/


    const viewportRef = useRef(null);
    const [itemWidth, setItemWidth] = useState(240); // ancho aproximado por item (se actualizará)
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(true);

    // Calcula ancho del primer item y estado de scroll
    useEffect(() => {
        const vp = viewportRef.current;
        if (!vp) return;

        const updateMeasurements = () => {
            const first = vp.querySelector(`.${styles.module__item}`);
            if (first) {
                const w = first.getBoundingClientRect().width;
                setItemWidth(Math.round(w));
            }
            setCanScrollPrev(vp.scrollLeft > 0);
            setCanScrollNext(vp.scrollLeft + vp.clientWidth < vp.scrollWidth - 1);
        };

        updateMeasurements();
        // actualiza en resize y en scroll
        const ro = new ResizeObserver(updateMeasurements);
        ro.observe(vp);
        vp.addEventListener("scroll", updateMeasurements, { passive: true });
        window.addEventListener("resize", updateMeasurements);

        return () => {
            ro.disconnect();
            vp.removeEventListener("scroll", updateMeasurements);
            window.removeEventListener("resize", updateMeasurements);
        };
    }, [modules]);

    const handleNext = () => {
        const vp = viewportRef.current;
        if (!vp) return;
        vp.scrollBy({ left: itemWidth, behavior: "smooth" });
        // estados actualizados por listener en useEffect
    };

    const handlePrev = () => {
        const vp = viewportRef.current;
        if (!vp) return;
        vp.scrollBy({ left: -itemWidth, behavior: "smooth" });
    };
    const handleClick =(mod)=>{
        navigate(`/`)
    }

    return (
        <header className={styles.header__main__box}>
            <div className={styles.header__container}>
                <ul className={styles.header__navlist}>
                    <h5 className={styles.logo} onClick={handleClick}>EmprendIA</h5>
                    <li><a href="">Módulos</a></li>
                    <li><a href="">Chat IA</a></li>
                </ul>
                <Link className={styles.login__btn} to="/login">
                    <img src="/assets/perfilline.svg" alt="" style={{ filter: "invert(1)" }} />
                    Iniciar sesión
                </Link>
            </div>

            {/* Carrusel que muestra tantos items como quepan; overflow scrollable */}
            <div className={styles.modules__wrapper}>
                <button
                    className={`${styles.carousel__btn} ${styles.carousel__btn__left}`}
                    onClick={handlePrev}
                    aria-label="Anterior"
                    disabled={!canScrollPrev}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <div className={styles.modules__nav} ref={viewportRef} role="list">
                    {modules.map((modulo, index) => (
                        <Link className={styles.module__item} key={index} role="listitem" tabIndex={0} to={`/module/${modulo.id}` }>
                            {modulo.titulo}
                        </Link>
                    ))}
                </div>

                <button
                    className={`${styles.carousel__btn} ${styles.carousel__btn__right}`}
                    onClick={handleNext}
                    aria-label="Siguiente"
                    disabled={!canScrollNext}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button >
            </div >
        </header>
    );
};
