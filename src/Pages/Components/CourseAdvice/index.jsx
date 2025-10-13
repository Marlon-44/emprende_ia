import { motion } from "framer-motion";
import styles from "./index.module.css";

export const CourseAdvice = ({ title, subtitle, img, color }) => {
    return (
        <motion.section
            className={styles.course__section__container}
            style={{ backgroundColor: color }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
        >
            <motion.div
                className={styles.info__section}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            >
                <h2>{title}</h2>
                <h6>{subtitle}</h6>

                <motion.div
                    className={styles.options__container}
                    initial="hidden"
                    whileInView="visible"
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { delayChildren: 0.3, staggerChildren: 0.15 },
                        },
                    }}
                >
                    {[
                        { label: "Aprende", style: styles.aprende },
                        { label: "Video Tutorial", style: styles.video },
                        { label: "Referencias", style: styles.ref },
                    ].map((btn, i) => (
                        <motion.a
                            key={i}
                            href="#"
                            className={`${styles.option} ${btn.style}`}
                            variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {btn.label}
                        </motion.a>
                    ))}
                </motion.div>
            </motion.div>

            <motion.img
                src={img}
                alt={title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            />
        </motion.section>
    );
};
