import { style } from "framer-motion/client"
import styles from "./index.module.css"
import { Link } from "react-router-dom"

export  const ModuleSection =({title="Seccion 1 del modulo 1"})=>{
    const anterior = "< Anterior"
    const siguiente = "Siguiente >"
    return(
        <section className={styles.module__section__container}>
            <div className={styles.section__header}>
                <h1>{title}</h1>
                <div className={styles.header__button__container}>
                    <Link to="" className={styles.header__button}>{anterior}</Link>
                    <Link to="" className={styles.header__button}>{siguiente}</Link>
                </div>
                <hr />
            </div>
            
        </section>
    )
}