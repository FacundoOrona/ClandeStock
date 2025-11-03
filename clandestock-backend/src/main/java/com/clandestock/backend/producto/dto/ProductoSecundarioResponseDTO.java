package com.clandestock.backend.producto.dto;

import jakarta.validation.constraints.NotBlank;

public record ProductoSecundarioResponseDTO(
        String id,
        String nombreProducto,
        String stock,
        String estado
) {
}
