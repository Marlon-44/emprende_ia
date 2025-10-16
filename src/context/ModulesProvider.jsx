// src/context/ModulesProvider.jsx
import React, { useState, useCallback, useEffect } from "react";
import ModulesContext from "./ModulesContext";
import { getAllModules } from "../Api/module";
import modulesData from "/src/Api/modules.json"

// cache en memoria (a nivel de módulo)
let modulesCache = null;

export function ModulesProvider({ children, autoLoad = true }) {
    const [modules, setModules] = useState(modulesData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedModule, setSelectedModule] = useState(null)
    
    {/*useEffect(() => {
        const cargarModulos = async () => {
            setLoading(true);
            const data = await getAllModules();
            setModules(data);
            setLoading(false);
        };
        cargarModulos();
    }, []);*/}

    // función que carga desde la API y actualiza cache + estado
    

    // mutadores locales opcionales (si quieres editar en runtime)
    

    

    const value = {
        modules,         // null (no cargado) | [] | [..]
        loading,
        error,     // función para cargar (o recargar con { force: true })
        setModules, 
        isCached: modulesCache !== null,
        selectedModule,
        setSelectedModule
    };

    return <ModulesContext.Provider value={value}>{children}</ModulesContext.Provider>;
}
