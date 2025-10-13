// src/hooks/useModules.js
import { useContext } from "react";
import ModulesContext from "../context/ModulesContext";

export function useModules() {
    const ctx = useContext(ModulesContext);
    if (ctx === null) {
        throw new Error("useModules debe usarse dentro de ModulesProvider");
    }
    return ctx;
}
