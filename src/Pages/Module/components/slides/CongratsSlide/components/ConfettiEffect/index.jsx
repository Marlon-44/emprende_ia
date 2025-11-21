import confetti from "canvas-confetti";
import { useEffect } from "react";

const ConfettiEffect = () => {
    useEffect(() => {
        const shoot = () => {
            confetti({
                particleCount: 50,
                spread: 500,
                startVelocity: 45,
                gravity: 1,
                ticks: 200,
                origin: { x: Math.random(), y: 0 },
                colors: [
                    "#FF0000", // rojo intenso
                    "#FF8700", // naranja
                    "#FFD300", // amarillo brillante
                    "#00FF85", // verde neón
                    "#00CFFF", // azul fuerte
                    "#FF00F5", // fucsia
                ],
                scalar: 1.2, // tamaño un poco más grande
                disableForReducedMotion: true,
            });
        };

        // Dispara cada medio segundo para mantener flujo continuo
        const interval = setInterval(shoot, 500);

        // limpieza
        return () => clearInterval(interval);
    }, []);

    return null;
};

export default ConfettiEffect;
