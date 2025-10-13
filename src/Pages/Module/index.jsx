import IaButton from "../../Components/IaButton"
import { Header } from "../Components/Header"
import { ModuleAside } from "./components/ModuleAside"
import { ModuleSection } from "./components/ModuleSection"
import styles from "./index.module.css"

export const Module =()=>{
    return(
        <section className={styles.container}>
            <Header/>
            <section className={styles.module__main__container}>
                <ModuleAside/>
                <ModuleSection/>
            </section>
            
            <IaButton/>
        </section>
    )
}