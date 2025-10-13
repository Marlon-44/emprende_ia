import { Link } from "react-router-dom"
import styles from "./index.module.css"

export const ModuleAside = () => {
    return (
        <aside className={styles.aside__container}>
            <h4>Contenido del curso</h4>
            <ul>
                <li>
                    <Link className={styles.section__option} to="#">Introducción al curso</Link>
                </li>
                <li>
                    <Link className={styles.section__option} to="#">Fundamentos del emprendimiento</Link>
                </li>
                <li>
                    <Link className={styles.section__option} to="#">Definición de la idea de negocio</Link>
                </li>
                <li>
                    <Link className={styles.section__option} to="#">Análisis del mercado y público objetivo</Link>
                </li>
                <li>
                    <Link className={styles.section__option} to="#">Diseño del modelo de negocio</Link>
                </li>
                <li>
                    <Link className={styles.section__option} to="#">Estrategias de financiación</Link>
                </li>
                <li>
                    <Link className={styles.section__option} to="#">Plan de marketing y ventas</Link>
                </li>
                <li>
                    <Link className={styles.section__option} to="#">Gestión del talento humano</Link>
                </li>
                <li>
                    <Link className={styles.section__option} to="#">Operaciones y procesos internos</Link>
                </li>
                <li>
                    <Link className={styles.section__option} to="#">Lanzamiento y crecimiento del negocio</Link>
                </li>
                <li>
                    <Link className={styles.section__option} to="#">Cierre y evaluación final</Link>
                </li>
            </ul>
        </aside>

    )

}