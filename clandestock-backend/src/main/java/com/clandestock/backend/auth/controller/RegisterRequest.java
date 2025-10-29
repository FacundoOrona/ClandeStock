package com.clandestock.backend.auth.controller;

import java.time.LocalDateTime;

public record RegisterRequest(
        String nombreUsuario,
        String contrasena,
        String rol,
        LocalDateTime fechaCreacion
) {
}
