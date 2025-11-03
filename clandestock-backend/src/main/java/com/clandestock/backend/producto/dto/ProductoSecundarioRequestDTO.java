package com.clandestock.backend.producto.dto;

import jakarta.validation.constraints.NotBlank;

public record ProductoSecundarioRequestDTO(
        String id,
        @NotBlank
        String nombreProducto,
        @NotBlank
        String stock,
        @NotBlank
        String estado,
        @NotBlank
        String local
) {
}