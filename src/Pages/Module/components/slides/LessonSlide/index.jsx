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

    // importancia
    // Si es una lección de importancia pura
    if (content.importancia) {
        return (
            <ImportanceSlide importancia={content.importancia}/>
        );
    }

    // Si es una lección de beneficios y consecuencias
    if (content.beneficios || content.consecuencias_de_no_aplicar) {
        return (
            <div>
                {content.beneficios && (
                    <>
                        <Typography variant="subtitle1">Beneficios</Typography>
                        <ul>
                            {content.beneficios.map((b, i) => <li key={i}>{b}</li>)}
                        </ul>
                    </>
                )}

                {content.consecuencias_de_no_aplicar && (
                    <>
                        <Typography variant="subtitle1">Consecuencias de no aplicar</Typography>
                        <ul>
                            {content.consecuencias_de_no_aplicar.map((c, i) => <li key={i}>{c}</li>)}
                        </ul>
                    </>
                )}
            </div>
        );
    }


    // herramientas (metodos / modelos / procedimientos)
    if (content.metodos || content.modelos || content.procedimiento) {
        return (
            <div>
                {content.metodos && (
                    <>
                        <Typography variant="subtitle1">Métodos</Typography>
                        {content.metodos.map((m) => (
                            <div key={m.id_metodo}>
                                <strong>{m.titulo}</strong>
                                <p>{m.descripcion}</p>
                                {m.pasos && <ol>{m.pasos.map((p, i) => <li key={i}>{p}</li>)}</ol>}
                            </div>
                        ))}
                    </>
                )}
                {content.modelos && (
                    <>
                        <Typography variant="subtitle1">Modelos</Typography>
                        <ul>
                            {content.modelos.map((mo) => <li key={mo.id_modelo}><strong>{mo.titulo}</strong>: {mo.descripcion}</li>)}
                        </ul>
                    </>
                )}
                {content.procedimiento && (
                    <>
                        <Typography variant="subtitle1">Procedimiento</Typography>
                        <ol>{content.procedimiento.map((p, i) => <li key={i}>{p}</li>)}</ol>
                    </>
                )}
            </div>
        );
    }

    // casos
    if (content.casos_exitosos || content.errores_comunes || content.errores_comunes) {
        return (
            <div>
                {content.casos_exitosos && (
                    <>
                        <Typography variant="subtitle1">Casos de éxito</Typography>
                        {content.casos_exitosos.map((c) => (
                            <div key={c.id_caso} style={{ marginBottom: 12 }}>
                                <strong>{c.titulo}</strong> — <em>{c.organizacion}</em>
                                <p>{c.que_hicieron}</p>
                                <p><strong>Resultados:</strong> {c.resultados}</p>
                            </div>
                        ))}
                    </>
                )}
                {content.errores_comunes && (
                    <>
                        <Typography variant="subtitle1">Errores comunes</Typography>
                        {content.errores_comunes.map((e) => (
                            <div key={e.id_error}>
                                <strong>{e.titulo}</strong>
                                <p>{e.descripcion}</p>
                                <div style={{ fontStyle: "italic" }}>{e.leccion}</div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        );
    }

    // fallback: mostrar JSON crudo (útil para debugging)
    return <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(content, null, 2)}</pre>;
}

export default LessonSlide