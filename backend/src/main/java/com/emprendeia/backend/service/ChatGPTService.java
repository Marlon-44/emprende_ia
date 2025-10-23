package com.emprendeia.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.cdimascio.dotenv.Dotenv;
import okhttp3.*;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class ChatGPTService {

    private static final String API_URL = "https://api.groq.com/openai/v1/chat/completions";
    private final String apiKey;
    private final OkHttpClient client;
    private final ObjectMapper mapper;

    public ChatGPTService() {
        Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
        this.apiKey = dotenv.get("GROQ_API_KEY");
        this.client = new OkHttpClient();
        this.mapper = new ObjectMapper();
    }

    public String obtenerRespuesta(String pregunta, String contexto, List<String> preguntasModulo) throws IOException {
        if (pregunta == null || pregunta.isBlank()) {
            return "Por favor, ingresa una pregunta válida.";
        }

        if (contexto == null || contexto.isBlank()) {
            return "No se proporcionó información del módulo.";
        }

        if (preguntasModulo != null && !preguntasModulo.isEmpty()) {
            for (String preguntaModulo : preguntasModulo) {
                if (pregunta.toLowerCase().contains(preguntaModulo.toLowerCase())) {
                    return "Parece que tu pregunta coincide con una del curso. Intenta reflexionar sobre el contenido para comprenderla mejor.";
                }
            }
        }

        String prompt = String.format(
            "Eres un asistente educativo que ayuda a los estudiantes a comprender el contenido de un curso. " +
            "No debes dar respuestas exactas a preguntas de examen, solo orientar. " +
            "El contexto del módulo es el siguiente: %s. " +
            "Además, estas son las preguntas oficiales del módulo: %s. " +
            "El estudiante pregunta: %s. " +
            "Si la pregunta del estudiante es una reformulación de una de las preguntas del módulo, no la respondas directamente y recomiéndale estudiar esa parte.",
            contexto, preguntasModulo, pregunta
        );

        String json = mapper.writeValueAsString(Map.of(
            "model", "llama-3.3-70b-versatile",
            "messages", List.of(
                Map.of("role", "system", "content", "Eres un asistente educativo, amable y motivador, que guía al estudiante sin revelar respuestas de evaluación."),
                Map.of("role", "user", "content", prompt)
            )
        ));

        Request request = new Request.Builder()
                .url(API_URL)
                .addHeader("Authorization", "Bearer " + apiKey)
                .addHeader("Content-Type", "application/json")
                .post(RequestBody.create(json, MediaType.get("application/json")))
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                String errorBody = response.body() != null ? response.body().string() : "Sin cuerpo de respuesta";
                throw new IOException("Error en la API de Groq (" + response.code() + "): " + errorBody);
            }

            Map<?, ?> body = mapper.readValue(response.body().string(), Map.class);
            Map<?, ?> choice = (Map<?, ?>) ((List<?>) body.get("choices")).get(0);
            Map<?, ?> message = (Map<?, ?>) choice.get("message");

            return message.get("content").toString().trim();
        }
    }
}
