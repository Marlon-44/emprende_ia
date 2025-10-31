// AuroraButton.jsx
import React, { useState, useRef, useEffect } from "react";
import styles from "./index.module.css";

const IaButton = () => {
  const [showChat, setShowChat] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [input, setInput] = useState("");           // texto que el usuario escribe -> campo "pregunta"
  const [contexto, setContexto] = useState("");     // campo opcional de contexto
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hola! Soy tu asistente." }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef(null);

  // endpoint desde .env (Vite). Fallback a localhost si no está la var.
  const endpoint = import.meta.env.VITE_API_URL || "http://localhost:8080/api/chat";

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, showChat]);

  const handleClick = () => {
    if (showChat) {
      setAnimateOut(true);
      setTimeout(() => {
        setShowChat(false);
        setAnimateOut(false);
      }, 300);
    } else {
      setShowChat(true);
    }
  };

  const enviarPregunta = async () => {
    const pregunta = input.trim();
    // no enviamos si pregunta vacía
    if (!pregunta) return;

    // si el campo contexto está vacío, usamos el valor por defecto pedido
    const contextoFinal = contexto.trim() || "economia, emprendimiento y habilidades emprendedoras";

    // preguntasModulo fijas según lo que te pasó el compañero
    const preguntasModulo = [
      "¿Qué es el marketing digital?",
      "¿Cuáles son los beneficios del marketing digital?",
      "¿Qué herramientas se utilizan en el marketing digital?"
    ];

    const payload = {
      pregunta,
      contexto: contextoFinal,
      preguntasModulo
    };

    // mostrar mensaje del usuario
    setMessages(prev => [...prev, { from: "user", text: pregunta }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error ${res.status}: ${text}`);
      }

      const data = await res.json();
      // Ajusta según la forma real de la respuesta (answer, respuesta, message...)
      const botText = data.answer ?? data.respuesta ?? data.reply ?? JSON.stringify(data);

      setMessages(prev => [...prev, { from: "bot", text: botText }]);
    } catch (err) {
      console.error("Error al enviar pregunta:", err);
      setMessages(prev => [...prev, { from: "bot", text: "Error: no se pudo conectar con el servidor." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!loading) enviarPregunta();
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

          <div
            ref={messagesRef}
            className={styles.chat__messages}
            style={{ overflowY: "auto", maxHeight: 300, padding: 8 }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: m.from === "user" ? "flex-end" : "flex-start",
                  margin: "6px 0"
                }}
              >
                <div style={{
                  maxWidth: "80%",
                  padding: "8px 12px",
                  borderRadius: 12,
                  background: m.from === "user" ? "#DCF8C6" : "#F1F0F0",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word"
                }}>
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ marginTop: 6 }}>
                <small>Escribiendo...</small>
              </div>
            )}
          </div>

          {/* Campo de contexto (opcional). Si lo prefieres, puedes ocultarlo y siempre usar el valor por defecto) */}
          <input
            type="text"
            placeholder="Contexto (opcional). Si lo dejas vacío se usará el por defecto."
            value={contexto}
            onChange={(e) => setContexto(e.target.value)}
            className={styles.context__input}
            style={{ width: "100%", marginTop: 8, padding: 8, borderRadius: 6 }}
          />

          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <input
              type="text"
              placeholder="Escribe tu pregunta..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className={styles.chat__input}
              style={{ flex: 1, padding: 8, borderRadius: 6 }}
            />
            <button
              onClick={enviarPregunta}
              disabled={loading}
              className={styles.send__button}
              style={{ padding: "8px 12px" }}
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default IaButton;
