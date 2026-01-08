package com.clandestock.backend.auth.dto;

public record RegistroResponse (
        String nombreUsuario,
        String tipoUsuario,
        String fechaCreacion
) {
}
