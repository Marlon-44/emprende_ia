import InicioAside from "./Components/InicioAside"
import InicioMainView from "./Components/InicioMainView"
import styles from "./index.module.css"

const Inicio = ( )=>{
    return(
        <div className={styles.inicio__container}>
            <InicioMainView/>
            <InicioAside/>
        </div>
    )
}
export default Inicio