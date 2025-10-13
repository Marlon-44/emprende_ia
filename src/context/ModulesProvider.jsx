// src/context/ModulesProvider.jsx
import React, { useState, useCallback, useEffect } from "react";
import ModulesContext from "./ModulesContext";
import { getAllModules } from "../Api/module";

// cache en memoria (a nivel de módulo)
let modulesCache = null;

export function ModulesProvider({ children, autoLoad = true }) {
    const [modules, setModulesState] = useState(() => modulesCache ?? null);
    const [loading, setLoading] = useState(() => modulesCache === null && autoLoad);
    const [error, setError] = useState(null);

    // función que carga desde la API y actualiza cache + estado
    const loadModules = useCallback(async (options = { force: false }) => {
        // si ya hay cache y no se fuerza, devolvemos cache
        if (modulesCache !== null && !options.force) {
            setModulesState(modulesCache);
            setLoading(false);
            setError(null);
            return modulesCache;
        }

        setLoading(true);
        setError(null);
        try {
            const data = await getAllModules();
            // normalizamos a array
            modulesCache = Array.isArray(data) ? data : [];
            setModulesState(modulesCache);
            setLoading(false);
            setError(null);
            return modulesCache;
        } catch (err) {
            setError(err);
            setLoading(false);
            // dejamos modulesState tal cual (null o lo que estuviera)
            throw err;
        }
    }, []);

    // auto-carga una vez al montar si se desea
    useEffect(() => {
        let mounted = true;
        if (autoLoad && modulesCache === null) {
            (async () => {
                try {
                    const loaded = await loadModules();
                    if (!mounted) return;
                    // ya fue seteado por loadModules
                } catch {
                    /* silence: error ya guardado en estado */
                }
            })();
        }
        return () => {
            mounted = false;
        };
    }, [autoLoad, loadModules]);

    // mutadores locales opcionales (si quieres editar en runtime)
    const setModules = useCallback((newModules) => {
        modulesCache = Array.isArray(newModules) ? newModules : [];
        setModulesState(modulesCache);
    }, []);

    const clearModules = useCallback(() => {
        modulesCache = [];
        setModulesState(modulesCache);
    }, []);

    const value = {
        modules,         // null (no cargado) | [] | [..]
        loading,
        error,
        loadModules,     // función para cargar (o recargar con { force: true })
        setModules,      // reemplaza el array en memoria y estado
        clearModules,
        isCached: modulesCache !== null
    };

    return <ModulesContext.Provider value={value}>{children}</ModulesContext.Provider>;
}
