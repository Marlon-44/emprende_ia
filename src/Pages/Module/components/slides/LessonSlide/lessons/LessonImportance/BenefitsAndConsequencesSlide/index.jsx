import { useModules } from "../../../../../../../../hooks/useModules";
import BcCard from "./components/BcCard";
import styles from "./index.module.css";

const BenefitsAndConsequencesSlide = ({ beneficios = [], consecuencias = [] }) => {
    const {colors} = useModules();
    // Combinamos los dos arreglos en uno solo
    const combinedList = beneficios.map((b, i) => ({
        beneficio: b,
        consecuencia: consecuencias[i] || "—", // por si no hay consecuencia en ese índice
    }));


    return (
        <div className={styles.ben__con__page}>
            <h1>BENEFICIOS</h1>
            <section className={styles.cards__section}>
                {combinedList.map((item, i) => (
                    <BcCard key={i} beneficio ={item.beneficio} consecuencia={item.consecuencia} color={colors[i]} delay={i}/>
                ))}
            </section>
            <h2>CONSECUENCIAS</h2>
        </div>
    );
};

export default BenefitsAndConsequencesSlide;
