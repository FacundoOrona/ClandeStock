package com.clandestock.backend.producto.dto;

public record ProductoSecundarioResponseDTO(
        String id,
        String nombre_producto,
        String stock,
        String estado,
        String local
) {
}
