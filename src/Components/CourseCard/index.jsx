import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { motion, useReducedMotion } from "framer-motion";
import { useModules } from "../../hooks/useModules";

export const CourseCard = ({ modulo, color }) => {
    const prefersReducedMotion = useReducedMotion();
    const navigate = useNavigate();
    const {selectedModule, setSelectedModule } = useModules();

    const handleClick = (mod) => {
        // primero guardamos el módulo seleccionado en el context
        setSelectedModule(mod);
        // luego navegamos
        navigate(`/module/${mod.id}`);
    };

    return (
        <motion.div
            className={styles.course__card}
            style={{ backgroundColor: `${color}` }}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 40, scale: 0.95 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{
                scale: 1.02,
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                cursor: "pointer"
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleClick(modulo)}
        >
            <h2>{`Modulo ${modulo.id }`}</h2>
            <p>{modulo.titulo}</p>

            {/* Si quieres que el botón también seleccione el módulo, lo hacemos aquí */}
            <Link to={`/module/${modulo.id}`}
                className={styles.aprende__btn}
                onClick={(e) => {
                    handleClick(modulo)
                    e.stopPropagation();         // evita que el click burbujee al div padre
                    setSelectedModule(modulo); 
                      // guarda también cuando cliquen el botón
                    // la navegación la hace el Link automáticamente
                }}
            >
                Aprende
            </Link>
        </motion.div>
    );
};
