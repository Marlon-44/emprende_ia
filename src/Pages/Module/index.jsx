import { useParams } from "react-router-dom";
import IaButton from "../../Components/IaButton";
import { Header } from "../Components/Header";
import { ModuleAside } from "./components/ModuleAside";
import { ModuleSection } from "./components/ModuleSection";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { useModules } from "../../hooks/useModules";
import { getAllModules } from "../../Api/module";

export const Module = () => {
    const { id } = useParams();
    const moduleId = Number(id);

    const { modules, setModules, selectedModule, setSelectedModule } = useModules();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [localLoading, setLocalLoading] = useState(false);


    // 1) Si no hay módulos, los traemos (solo una vez)
    useEffect(() => {
        if (Array.isArray(modules) && modules.length > 0) return;

        let mounted = true;
        getAllModules()
            .then(data => {
                if (!mounted) return;
                setModules(Array.isArray(data) ? data : []);
            })
            .catch(err => console.error('No se pudieron cargar módulos:', err));

        return () => { mounted = false; };
    }, [modules, setModules]);

    // 2) Cuando modules cambian, buscamos y seteamos el módulo
    useEffect(() => {
        if (!Array.isArray(modules) || modules.length === 0) return;

        // Intenta recuperar id guardado en localStorage si no viene por params
        const storedId = moduleId || Number(localStorage.getItem('selectedModuleId'));
        const idToFind = storedId || moduleId;

        const found = modules.find(m => Number(m.id) === Number(idToFind)) ?? null;
        setSelectedModule(found);

        // Guardamos el id para persistencia
        if (found) localStorage.setItem('selectedModuleId', String(found.id));
    }, [modules, moduleId, setSelectedModule]);

    const goPrev = () => setCurrentIndex((i) => Math.max(0, i - 1));
    const goNext = () => setCurrentIndex((i) => Math.min(selectedModule.slides.length - 1, i + 1));
    const jumpTo = (index) => {
        if (index < 0 || index >= selectedModule.slides.length) return;
        setCurrentIndex(index);
        const el = document.getElementById(`module - section - ${selectedModule.slides[index].id}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };



    // Render seguro: no asumas que selectedModule existe
    return (
        <>
            <Header />
            <section className={styles.container}>
                <section className={styles.module_main_container}>
                    {selectedModule ? (
                        <>
                            <ModuleAside sections={selectedModule.slides} currentIndex={currentIndex} onJump={jumpTo} />
                            <ModuleSection
                                sections={selectedModule.slides}
                                currentIndex={currentIndex}
                                onPrev={goPrev}
                                onNext={goNext}
                                onJump={jumpTo}
                                course={selectedModule} />

                        </>
                    ) : (
                        <p>Cargando módulo...</p>
                    )}
                </section>
                <IaButton />
            </section>
        </>
    );
};
