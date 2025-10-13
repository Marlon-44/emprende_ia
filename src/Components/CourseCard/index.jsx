import { Link } from "react-router-dom";
import styles from "./index.module.css";
import { motion, useReducedMotion } from "framer-motion";

export const CourseCard = ({ title, subtitle, color }) => {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            className={styles.course__card}
            style={{ backgroundColor: color }}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 40, scale: 0.95 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{
                scale: 1.01,
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            }}
            whileTap={{ scale: 0.97 }}
        >
            <h2>{title}</h2>
            <p>{subtitle}</p>
            <Link className={styles.aprende__btn} to="/">
                Aprende
            </Link>
        </motion.div>
    );
};
