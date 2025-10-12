// SidebarAdmin.jsx
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { Icon } from "@mui/material";

const SidebarEstudiante = ({ onSeleccionarOpcion, opcionSeleccionada }) => {
    const navigate = useNavigate();
    const handleClickLogo = () => {

        navigate(`/homePage`)
    }
    return (
        <aside className={styles.sidebar__container}>
            <div className={styles.logo}>
                <h2 onClick={handleClickLogo}>AprendIA</h2>
            </div>
            <ul className={styles.sidebar__menu}>
                <li
                    className={`${styles.menu__option} ${opcionSeleccionada === "OP1" ? styles.active : ""}`}
                    onClick={() => onSeleccionarOpcion("OP1")}
                >
                    <div className={`${opcionSeleccionada === "OP1" ? styles.boxactive : ""}`}></div>
                    <img src="/assets/homeline.svg" alt="Inicio" className={styles.icon} />
                    <span className={styles.text}>Inicio</span>
                </li>

                <li
                    className={`${styles.menu__option} ${opcionSeleccionada === "OP2" ? styles.active : ""}`}
                    onClick={() => onSeleccionarOpcion("OP2")}
                >
                    <div className={`${opcionSeleccionada === "OP2" ? styles.boxactive : ""}`}></div>
                    <img src="/assets/documentline.svg" alt="Módulos" className={styles.icon} />
                    <span className={styles.text}>Módulos</span>
                </li>

                <li
                    className={`${styles.menu__option} ${opcionSeleccionada === "OP3" ? styles.active : ""}`}
                    onClick={() => onSeleccionarOpcion("OP3")}
                >
                    <div className={`${opcionSeleccionada === "OP3" ? styles.boxactive : ""}`}></div>
                    <img src="/assets/progresoline.svg" alt="Progreso" className={styles.icon} />
                    <span className={styles.text}>Progreso</span>
                </li>

                <li
                    className={`${styles.menu__option} ${opcionSeleccionada === "OP4" ? styles.active : ""}`}
                    onClick={() => onSeleccionarOpcion("OP4")}
                >
                    <div className={`${opcionSeleccionada === "OP4" ? styles.boxactive : ""}`}></div>
                    <img src="/assets/mensajeline.svg" alt="Chat con IA" className={styles.icon} />
                    <span className={styles.text}>Chat con IA</span>
                </li>

                <li
                    className={`${styles.menu__option} ${opcionSeleccionada === "OP5" ? styles.active : ""}`}
                    onClick={() => onSeleccionarOpcion("OP5")}
                >
                    <div className={`${opcionSeleccionada === "OP5" ? styles.boxactive : ""}`}></div>
                    <img src="/assets/perfilline.svg" alt="Perfil" className={styles.icon} />
                    <span className={styles.text}>Perfil</span>
                </li>
            </ul>

        </aside>
    )
};

export default SidebarEstudiante;
