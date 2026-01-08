package com.clandestock.backend.usuario.dto;

public record UsuarioRequestDTO(
        String nombreUsuario,
        String contrasena,
        String tipoUsuario,
        String estado
) {
}
