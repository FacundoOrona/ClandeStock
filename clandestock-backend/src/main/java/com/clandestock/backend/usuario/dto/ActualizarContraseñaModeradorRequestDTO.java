package com.clandestock.backend.usuario.dto;

public record ActualizarContraseñaModeradorRequestDTO(
        String nombreUsuario,
        String nuevaContrasena
) {}
