import { CourseCard } from "../../Components/CourseCard";
import IaButton from "../../Components/IaButton";
import { useModules } from "../../hooks/useModules";
import { Banner } from "../Components/Banner";
import { CourseAdvice } from "../Components/CourseAdvice";
import { Header } from "../Components/Header";
import styles from "./index.module.css"


const LandingPage = () => {
    const { modules, loading, error } = useModules();
    return (
        <section className={styles.container}>
            <Header />
            <Banner />
            <CourseAdvice title="Gestión financiera" subtitle="Este es el subtitulo 1" img="./assets/img__course1.jpeg" color="#fff" />
            <CourseAdvice title="Planificación estratégica " subtitle="Este es el subtitulo 2" img="./assets/img__course2.jpeg" color="#f6c7c1" />
            <CourseAdvice title=" Innovación y creatividad" subtitle="Este es el subtitulo 3" img="./assets/img__course1.jpeg" color="#fff" />
            <CourseAdvice title="Networking y colaboración" subtitle="Este es el subtitulo 4" img="./assets/img__course2.jpeg" color="#f6c7c1" />
            <section className={styles.all__courses__section}>
                {
                    (modules ?? []).map((modulo, index) => (
                        <CourseCard
                            title={modulo.title}
                            subtitle={modulo.subtitle}
                            img=""
                            color={modulo.color}
                            key={modulo.id ?? index}
                        />
                    ))
                }
            </section>
            <IaButton/>
        </section>
    )

}

export default LandingPage;