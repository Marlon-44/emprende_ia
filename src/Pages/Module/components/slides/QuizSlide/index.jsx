import { Box, Typography } from "@mui/material";

const QuizSlide = ({ questions = [] }) => {
    // questions: array de objetos { pregunta, opciones, respuesta_correcta }
    return (
        <Box>
            <Typography variant="h4" gutterBottom>Quiz final</Typography>
            {Array.isArray(questions) && questions.length > 0 ? (
                questions.map((q, i) => (
                    <div key={i} style={{ marginBottom: 16 }}>
                        <Typography variant="subtitle1">{q.pregunta}</Typography>
                        <ul>
                            {q.opciones && Object.entries(q.opciones).map(([k, v]) => <li key={k}>{k}: {v}</li>)}
                        </ul>
                    </div>
                ))
            ) : (
                <Typography>No hay preguntas en este módulo.</Typography>
            )}
        </Box>
    );
};

export default QuizSlide;