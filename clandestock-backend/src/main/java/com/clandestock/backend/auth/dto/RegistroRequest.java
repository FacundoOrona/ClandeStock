package com.clandestock.backend.auth.dto;

import java.time.LocalDateTime;

import com.clandestock.backend.usuario.modelos.TipoUsuarioEnum;

public record RegistroRequest(
        String nombreUsuario,
        String contrasena,
        TipoUsuarioEnum tipoUsuario,
        LocalDateTime fechaCreacion
) {
}
