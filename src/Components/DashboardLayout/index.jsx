import styles from "./index.module.css";/*
import { useContext } from "react";
import SesionContext from "../../features/sesion/SesionContext";*/
import { useNavigate } from "react-router-dom";
//import ProfileSection from "../ProfileSection";
import NotificationsIcon from '@mui/icons-material/Notifications';

const DashboardLayout = ({ children }) => {
    //const { usuario, cerrarSesion } = useContext(SesionContext);
    const navigate = useNavigate();

    const handleCerrarSesion = () => {
        //cerrarSesion();
        navigate("/");
    };

    return (
        <div className={styles.dashboard__container}>
            <section className={styles.dashboard__content}>
                    {children}
            </section>
        </div>
    );
};

export default DashboardLayout;
