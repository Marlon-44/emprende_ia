import { Box, Typography } from "@mui/material";

const CongratsSlide = ({ module }) => (
    <Box sx={{ textAlign: "center" }}>
        <Typography variant="h3" gutterBottom>¡Felicidades!</Typography>
        <Typography variant="h6">Completaste el módulo: {module?.titulo}</Typography>
        <Typography sx={{ mt: 2 }}>Ahora realiza el quiz final.</Typography>
    </Box>
);
export default CongratsSlide;
