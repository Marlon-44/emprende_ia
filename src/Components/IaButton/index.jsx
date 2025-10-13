// AuroraButton.jsx
import React, { useState } from "react";
import styles from "./index.module.css";

const IaButton = () => {
  const [showChat, setShowChat] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  const handleClick = () => {
    if (showChat) {
      // Si está abierto, iniciar animación de cierre
      setAnimateOut(true);
      setTimeout(() => {
        setShowChat(false);
        setAnimateOut(false);
      }, 300); // duración de la animación
    } else {
      setShowChat(true);
    }
  };

  return (
    <>
      <button className={styles.aurora__button} onClick={handleClick}>
        <h2>Ai</h2>
      </button>

      {showChat && (
        <div
          className={`${styles.chat__window} ${
            animateOut ? styles.chat__exit : styles.chat__enter
          }`}
        >
          <h2>Chat de IA</h2>
          <div className={styles.chat__messages}>
            <p>Hola! Soy tu asistente.</p>
          </div>
          <input type="text" placeholder="Escribe un mensaje..." />
        </div>
      )}
    </>
  );
};

export default IaButton;
