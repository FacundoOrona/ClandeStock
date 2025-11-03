package com.clandestock.backend.producto.dto;

import jakarta.validation.constraints.NotBlank;

public record ProductoSecundarioPorPrincipalRequestDTO(
   String id,
   @NotBlank
   String idProductoPrincipal,
   @NotBlank
   String idProductoSecundario
) {
}
