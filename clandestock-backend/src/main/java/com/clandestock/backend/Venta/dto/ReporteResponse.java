package com.clandestock.backend.venta.dto;

public record ReporteResponse(
        String descripcion,
        String usuarioEmisor,
        String estado
) {
}
