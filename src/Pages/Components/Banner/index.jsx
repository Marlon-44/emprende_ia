import styles from "./index.module.css";

export const Banner = () => {
    return (
        <>
            <section className={styles.banner__container}>
                <h1>Aprende a Emprender</h1>
                <h3>Desarrolla las habilidades que impulsan tus ideas hacia el éxito.</h3>

                <div className={styles.search__container}>
                    <input type="text" placeholder="Buscar cursos" className={styles.search__input} />
                    <a href="#" className={styles.search__btn}>
                        <img src="/assets/search__icon__white.svg" alt="ícono de búsqueda" />
                    </a>
                </div>
            </section>

            
            <svg
                className={styles.banner__wave}
                width="100%"
                height="70"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <path
                    id="wavepath"
                    d="M0,0 L110,0 C35,150 35,0 0,100 z"
                    fill="#282A35"
                />
            </svg>
        </>
    );
};
