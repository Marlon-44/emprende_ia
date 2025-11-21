import PropTypes from "prop-types";
import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from "react-router-dom";
import { Home, HomeFilled, HomeMaxRounded, HomeOutlined, HomeRepairService, HomeRounded, HomeWork } from "@mui/icons-material";
import ConceptosSlide from "./lessons/LessonsConcepts/ConceptosSlide";
import PrincipiosSlide from "./lessons/LessonsConcepts/PrincipiosSlide";
import styles from "./index.module.css"
import ImportanceSlide from "./lessons/LessonImportance/ImportanceSlide";
import BenefitsAndConsequencesSlide from "./lessons/LessonImportance/BenefitsAndConsequencesSlide";
import MethodsAndModulesSlide from "./lessons/LessonsTools/MethodsAndModelsSlide";
import ProcedimientoSlide from "./lessons/LessonsTools/ProcedimientoSlide";
import CasosSlide from "./lessons/LessonsCases/CasosSlide";
import ErroresSlide from "./lessons/LessonsCases/ErroresSlide";
const LessonSlide = ({ slide }) => {
    // slide: { unidadIndex, leccionIndex, data }
    const { data } = slide;

    return (
        <div>
            <div sx={{ mt: 2 }}>
                {/* Renderizado según tipo de lección */}
                {renderLessonContent(data)}
            </div>
        </div>
    );
};

function renderLessonContent(data) {
    if (!data || !data.contenido) return <Typography>No hay contenido para esta lección.</Typography>;

    // Tipos comunes en tu JSON: conceptos, importancia, herramientas, casos
    const content = data.contenido;


    // conceptos
    if (content.conceptos) {
        return (
            <ConceptosSlide content={content}></ConceptosSlide>
        );
    }
    if (content.principios) {
        return (
            <PrincipiosSlide principios={content.principios} />
        );
    }

    if (content.importancia) {
        return (
            <ImportanceSlide importancia={content.importancia} />
        );
    }

    // Si es una lección de beneficios y consecuencias
    if (content.beneficios && content.consecuencias_de_no_aplicar) {
        return (
            <div>
                <BenefitsAndConsequencesSlide beneficios={content.beneficios} consecuencias={content.consecuencias_de_no_aplicar} />
            </div>
        );
    }

    if (content.metodos && content.modelos) {
        return (
            <div>
                <MethodsAndModulesSlide metodos={content.metodos} modelos={content.modelos} />
            </div>
        );
    }
    if (content.procedimiento) {
        return (
            <div>
                <ProcedimientoSlide procedimientos={content.procedimiento} />
            </div>
        );
    }
    if (content.casos_exitosos) {
        return (
            <div>
                <CasosSlide casos={content.casos_exitosos}/>
            </div>
        );

    }
    if (content.errores_comunes) {
        return (
            <div>
                <ErroresSlide errores={content.errores_comunes} />
            </div>
        );

    }

    // fallback: mostrar JSON crudo (útil para debugging)
    return <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(content, null, 2)}</pre>;
}

export default LessonSlide