package com.clandestock.backend.usuario.dto;

public record ActualizarContrasenaModeradorRequestDTO(
        String nombreUsuario,
        String nuevaContrasena
) {}
