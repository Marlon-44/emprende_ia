import { useModules } from "../../../../../../../../hooks/useModules";
import PrincipioItem from "./components/PrincipioItem";
import styles from "./index.module.css"

const PrincipiosSlide = ({ principios }) => {
    const {colors} = useModules();

    return (
        <div className={styles.principios__page}>
            <div className={styles.principios__container}>
                
                    {principios.map((c, i) => (
                        i < 3 ?
                            c && <PrincipioItem key={i} principio={principios[i]} index={i} color={colors[i]}></PrincipioItem>: ""
                    ))}
                        
            </div>
            <div className={styles.principios__container}>
                
                    {principios.map((c, i) => (
                        i>=3 ?
                            c && <PrincipioItem key={i} principio={principios[i]} index={i} color={colors[i]}></PrincipioItem> :""
                    ))}
                
            </div>
            
        </div>
    );
}

export default PrincipiosSlide;