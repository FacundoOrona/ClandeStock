package com.clandestock.backend.venta.dto;

import java.util.List;

public class VentaResponseDTO {
    public String idVenta;
    public String idUsuario;
    public String idMetodoPago;
    public String precioTotal;
    public String fechaApertura;
    public String fechaCierre;
    public String estadoPago;
    public String localId;
    public List<ProductoVentaResponseDTO> productos;
    public String precioTotalConMetodoDePago;

}
