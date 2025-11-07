import { useEffect } from "react";
import { CourseCard } from "../../Components/CourseCard";
import IaButton from "../../Components/IaButton";
import { useModules } from "../../hooks/useModules";
import { Banner } from "../Components/Banner";
import { CourseAdvice } from "../Components/CourseAdvice";
import { Header } from "../Components/Header";
import styles from "./index.module.css"


const LandingPage = () => {
    const { modules, loading, error, loadModules } = useModules();

    const {colors} = useModules();
    
    return (
        <section className={styles.container}>
            <Header />
            <Banner />
            <CourseAdvice title="Gestión financiera" subtitle="Este es el subtitulo 1" img="./assets/img__course1.jpeg" color="#fff" id={4} />
            <CourseAdvice title="Planificación estratégica " subtitle="Este es el subtitulo 2" img="./assets/img__course2.jpeg" color="#f6c7c1"id={2} />
            <CourseAdvice title=" Innovación y creatividad" subtitle="Este es el subtitulo 3" img="./assets/img__course1.jpeg" color="#fff" id={3} />
            <CourseAdvice title="Networking y colaboración" subtitle="Este es el subtitulo 4" img="./assets/img__course2.jpeg" color="#f6c7c1" id={9}/>
            <section className={styles.all__courses__section}>
                {
                    (modules ?? []).map((modulo, index) => (

                        <CourseCard
                            modulo={modulo}
                            key={modulo.id ?? index}
                            color={colors[index]}

                        />

                    ))
                }
            </section>
            <IaButton />
        </section>
    )

}

export default LandingPage;