package com.clandestock.backend.usuario.dto;

public record ActualizarContraseñaModeradorRequestDTO(
        Long usuarioId,
        String nuevaContrasena
) {
}
