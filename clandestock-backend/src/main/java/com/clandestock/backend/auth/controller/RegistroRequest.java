package com.clandestock.backend.auth.controller;

import com.clandestock.backend.usuario.modelos.TipoUsuario;

import java.time.LocalDateTime;

public record RegistroRequest(
        String nombreUsuario,
        String contrasena,
        TipoUsuario tipoUsuario,
        LocalDateTime fechaCreacion
) {
}
