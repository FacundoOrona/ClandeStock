package com.clandestock.backend.producto.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductoStockResponseDTO {
    String productoPrincipalId;
    String nombreProducto;
    String stockDisponible;
    String precio;
    String stockBajo;
    String sinStock;
}
