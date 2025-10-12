import { Link } from "react-router-dom"
import Header from "../../../Components/Header"
import styles from "./index.module.css"

const InicioMainView = () => {
    return (
        <section className={styles.inicio__main__container}>
            <Header title="Mis Cursos"/>
            <ul>
                <h4>Filter by:</h4>
                <Link className={styles.filter__option}></Link>
            </ul>
        </section>
    )
}
export default InicioMainView;