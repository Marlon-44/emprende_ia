import { useContext, useState } from "react";
import styles from "./index.module.css"
import TextField from "@mui/material/TextField";
import { Button, Box, Alert } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ correo: "", password: "" });
    const [errors, setErrors] = useState({});
    const [alerta, setAlerta] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let error = "";

        if (name === "correo") {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                error = "Correo inválido";
            }
        }

        if (name === "password" && !value.trim()) {
            error = "La contraseña no puede estar vacía";
        }

        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    };

    const validarTodo = () => {
        const nuevosErrores = {};
        let esValido = true;

        if (!formData.correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
            nuevosErrores.correo = "Correo inválido";
            esValido = false;
        }

        if (!formData.password.trim()) {
            nuevosErrores.password = "La contraseña es obligatoria";
            esValido = false;
        }

        setErrors(nuevosErrores);
        return esValido;
    };

    const handleSubmit = async () => {
        navigate()
    };

    const handleNav = () => {
        navigate("/dashboard")
    }
    return (
        <div className={styles.login__page}>
            <div style={{ position: "absolute", width: "auto" }}
                className={styles.logo__container}
                onClick={handleNav}>
                <h2 style={{
                    color: "#fff",
                    fontFamily: "Montserrat",
                    fontWeight: "700",
                    fontSize: "1.5rem",
                    padding: "1rem",
                    paddingLeft: "4rem",
                    position:"relative",
                    zIndex:1
                }} >EmprendIA</h2>
            </div>
            <div className={styles.image__section}>

            </div>
            <section className={styles.login__container}>


                <div className={styles.form__section}>
                    <h1>Inicia sesion en tu cuenta</h1>


                    {alerta && (
                        <Alert severity={alerta.tipo} sx={{ mb: 2 }}>
                            {alerta.mensaje}
                        </Alert>
                    )}

                    <TextField
                        label="Email"
                        variant="outlined"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        error={!!errors.correo}
                        helperText={errors.correo}

                        fullWidth
                    />

                    <TextField
                        label="Password"
                        variant="outlined"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}


                        fullWidth
                    />
                    <div style={{ display: "flex", gap: "1rem" }}>
                        <input name="remember" type="checkbox"></input>
                        <label style={{ fontSize: "0.8rem" }} htmlFor="remember">Recordarme en este dispositivo</label>

                    </div>
                    <button

                        fullWidth
                        onClick={handleNav}
                        className={styles.login__button}
                    >
                        Iniciar Sesion
                    </button>

                    <hr />

                    <button

                        fullWidth
                        onClick={handleSubmit}
                        className={styles.loginWith__button}

                    >
                        <img className={styles.button__icon} src="./assets/google.svg" alt="" /> Inicia sesion con Google
                    </button>
                    <button

                        fullWidth
                        onClick={""}
                        className={styles.loginWith__button}
                    >
                        <img className={styles.button__icon} src="/assets/outlook.svg" alt="" />
                        Inicia sesion con Outlook
                    </button>

                    <p style={{fontSize:"0.8rem"}}>
                        ¿Eres nuevo en EmprendIA? <Link to="/register" style={{ textDecoration: "none", color: "#4431b3", fontWeight: "600" }}>Crea una cuenta</Link>
                    </p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                    <img style={{ width: "3.5%", margin: 0, paddingTop: "0.1rem" }} src="/assets/lock.svg" alt="" />
                    <p style={{ margin: "0px", padding: "0px", color: "#b4b4b4" }}>Por tu seguridad, nunca compartas tus credenciales de acceso usuario, contraseña o tokens con nadie.</p>
                </div>
            </section>
        </div>
    );
};

export default Login;
