
import { Info } from "@mui/icons-material"
import styles from "./index.module.css"
import ModulosSlide from "./components/ModulosSlide"
const MethodsAndModulesSlide = ({ modelos, metodos }) => {
    return (
        <div className={styles.met__mod__page}>
            
            <section className={styles.data__container}>
                {metodos.map((m) => (
                    <div key={m.id_metodo} className={styles.item__card}>
                        
                        <div className={styles.short__info__container}>
                            <h4>{m.titulo}</h4>
                            <p>{m.descripcion}</p>
                        </div>

                        <div className={styles.pasos__contianer}>
                            {m.pasos &&
                                <ol>
                                    <h4>Pasos</h4>
                                    {m.pasos.map((p, i) => <li key={i}>{p}</li>)}
                                </ol>}
                        </div>


                    </div>
                ))}
                <ModulosSlide modelos={modelos}/>
                <div className={styles.page__title}>
                    <h2>Modulos</h2>
                    <button>Metodos</button>
                </div>
            </section>

            
        </div>
    )
}

export default MethodsAndModulesSlide