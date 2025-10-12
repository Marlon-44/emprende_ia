import { useState, useContext } from "react";
//import SesionContext from "../../features/sesion/SesionContext";
//import WelcomeCard from "../../Components/WelcomeCard";
import styles from "./dashboardEstudiante.module.css";
import SidebarEstudiante from "../../Components/DashboardLayout/SidebarEstudiante";
import Inicio from "./Views/Inicio";
//import SidebarAdmin from "../../Components/SidebarAdmin";
//import ProfileSection from "../../Components/ProfileSection";


const DashboardEstudiante = () => {
    //const { usuario } = useContext(SesionContext);
    const [opcionSeleccionada, setOpcionSeleccionada] = useState("OP1");

    const renderContenido = () => {
        switch (opcionSeleccionada) {
            case "OP1":
                return <Inicio/>
            case "OP2":
                return <h1>Modulos</h1>
            case "OP3":
                return <h1>Progreso</h1>
            case "OP4":
                return <h1>Chat con IA</h1>
            case "OP5":
                return <h1>Perfil</h1>
            default:
                return <p>Selecciona una opción del menú.</p>;
        }
    };

    return (
        <>
            <SidebarEstudiante
                onSeleccionarOpcion={setOpcionSeleccionada}
                opcionSeleccionada={opcionSeleccionada}
            />

            <div className={styles.dashboard_estudiante__container}>
                <section className={styles.option__section}>
                        {renderContenido()}
                </section>
                

            </div>
        </>
    );
};

export default DashboardEstudiante;
