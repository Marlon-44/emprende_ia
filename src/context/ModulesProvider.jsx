// src/context/ModulesProvider.jsx
import React, { useState, useEffect, useCallback } from "react";
import ModulesContext from "./ModulesContext";
import { getAllModules } from "../Api/module";
import modulesData from "/src/Api/cursos.json";

let modulesCache = null;

export function ModulesProvider({ children }) {
    const [modules, setModules] = useState(modulesCache || []);
    const [selectedModule, setSelectedModule] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const colors = [
        "#da42daff", // rosa fucsia
        "#A64DFF",   // morado
        "#4DB8FF",   // azul celeste
        "#66E066",   // verde
        "#FFB84D",   // naranja claro
        "#FF4D4D",   // rojo coral
        "#FFD54F",   // amarillo brillante
        "#40E0D0",   // turquesa
        "#FF6EC7",   // rosado neón
        "#7C4DFF"    // violeta intenso
    ];

    // 🔹 Cargar módulos (desde cache, JSON local o API)
    const loadModules = useCallback(async () => {
        try {
            setLoading(true);

            if (modulesCache) {
                setModules(modulesCache);
                setLoading(false);
                return;
            }

            // Si no hay API externa, usa el JSON local
            let data = modulesData;
            if (!data || data.length === 0) {
                data = await getAllModules();
            }

            if (Array.isArray(data)) {
                setModules(data);
                modulesCache = data;
            } else {
                throw new Error("Formato de módulos inválido");
            }

        } catch (err) {
            console.error("Error al cargar módulos:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // 🔹 Seleccionar módulo y guardarlo en localStorage
    const selectModule = useCallback(
        (id) => {
            if (!modules || modules.length === 0) return null;
            const found = modules.find((m) => Number(m.id) === Number(id)) || null;
            setSelectedModule(found);
            if (found) {
                localStorage.setItem("selectedModuleId", String(found.id));
            } else {
                localStorage.removeItem("selectedModuleId");
            }
            return found;
        },
        [modules]
    );

    // 🔹 Cargar módulo guardado o inicializar
    useEffect(() => {
        loadModules();
    }, [loadModules]);

    useEffect(() => {
        if (modules.length > 0) {
            const storedId = localStorage.getItem("selectedModuleId");
            if (storedId) selectModule(Number(storedId));
        }
    }, [modules, selectModule]);

    const value = {
        modules,
        setModules,
        loading,
        error,
        selectedModule,
        setSelectedModule,
        selectModule,
        loadModules,
        isCached: modulesCache !== null,
        colors
    };

    return <ModulesContext.Provider value={value}>{children}</ModulesContext.Provider>;
}
