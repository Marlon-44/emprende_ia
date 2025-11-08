import { useState } from "react";
import styles from "./index.module.css";
import ModulosSlide from "./components/ModulosSlide";
import MetodosSlide from "./components/MetodosSlide";

const MethodsAndModulesSlide = ({ modelos, metodos }) => {
    const [page, setPage] = useState(1);

    const handleChange = ({ pageId }) => {
        setPage(pageId);
    };

    const currentPageName = page === 1 ? "Modelos" : "Métodos";
    const hiddenPageName = page === 1 ? "Métodos" : "Modelos";

    console.log("PAGE: ",page)
    return (
        <div className={styles.met__mod__page}>
            {page === 1 ? (
                <section className={styles.data__container}>
                    <ModulosSlide modelos={modelos} />
                    <div className={styles.page__title}>
                        <h2>{currentPageName}</h2>
                        <button onClick={() => handleChange({ pageId: 2 })}>
                            {hiddenPageName}
                        </button>
                    </div>
                </section>
            ) : (
                <section className={styles.data__container}>
                    <MetodosSlide metodos={metodos} />
                    <div className={styles.page__title}>
                        <h2>{currentPageName}</h2>
                        <button onClick={() => handleChange({ pageId: 1 })}>
                            {hiddenPageName}
                        </button>
                    </div>
                </section>
            )}
        </div>
    );
};

export default MethodsAndModulesSlide;
