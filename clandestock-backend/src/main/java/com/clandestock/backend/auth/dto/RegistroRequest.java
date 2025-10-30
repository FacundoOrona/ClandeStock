package com.clandestock.backend.auth.dto;

import java.time.LocalDateTime;

public record RegistroRequest(
        String nombreUsuario,
        String contrasena,
        Long tipoUsuarioId,
        LocalDateTime fechaCreacion
) {
}
