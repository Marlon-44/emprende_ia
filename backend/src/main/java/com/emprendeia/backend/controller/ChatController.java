package com.emprendeia.backend.controller;

import com.emprendeia.backend.service.ChatGPTService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class ChatController {

    @Autowired
    private ChatGPTService chatGPTService;

    @Autowired
    private ObjectMapper mapper;

    @PostMapping
    public ResponseEntity<?> obtenerRespuesta(@RequestBody Map<String, Object> body) {
        try {
            String pregunta = (String) body.get("pregunta");
            String contexto = (String) body.get("contexto");

            List<String> preguntasModulo = mapper.convertValue(
                    body.get("preguntasModulo"),
                    mapper.getTypeFactory().constructCollectionType(List.class, String.class));

            String respuesta = chatGPTService.obtenerRespuesta(pregunta, contexto, preguntasModulo);
            return ResponseEntity.ok(Map.of("respuesta", respuesta));

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Error procesando la solicitud: " + e.getMessage()));
        }
    }

}
