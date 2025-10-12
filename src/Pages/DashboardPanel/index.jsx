import DashboardLayout from "../../Components/DashboardLayout";
import DashboardEstudiante from "./dashboardEstudiante";
import styles from "./index.module.css"

const DashboardPanel = () => {
    //const { usuario } = useContext(SesionContext);

    //const idRol = usuario?.idRol || usuario?.rol?.idRol;
    const renderContenidoDashboard = () => {
        switch ("1") {
            case "1":
                return <DashboardEstudiante/>;
            default:
                return <h1>Rol no reconocido o no tienes acceso al dashboard.</h1>;
        }
    };
    return(
        <>
            <DashboardLayout>
                {renderContenidoDashboard()}
            </DashboardLayout>
        </>
    )
}

export default DashboardPanel;