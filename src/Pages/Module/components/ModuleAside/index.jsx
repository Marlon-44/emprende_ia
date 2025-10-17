import { Link } from "react-router-dom"
import styles from "./index.module.css"
import { useModules } from "../../../../hooks/useModules"

export const ModuleAside = ({ sections = [], currentIndex = 0, onJump = () => { } }) => {

    return (
        <aside className={styles.aside__container}>
            <h4>Unidades</h4>
            <ul className={styles.section__list}>
                {sections.map((s, idx) => (
                    <li key={s.id ?? idx}
                        onClick={(e) => {
                            e.preventDefault();
                            onJump(idx);
                        }}
                        className={`${styles.section__option} ${idx === currentIndex ? styles.active : styles.inactive}`}
                    >

                        {
                            idx === sections.length - 1
                                ? ('Evaluacion')
                                : (`Unidad ${idx + 1}`)

                        }

                    </li>
                ))}
            </ul>
        </aside>

    )

}