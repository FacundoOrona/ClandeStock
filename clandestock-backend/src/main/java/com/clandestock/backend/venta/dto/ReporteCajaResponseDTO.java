package com.clandestock.backend.venta.dto;

import java.math.BigDecimal;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class ReporteCajaResponseDTO {
    public Long cajaId;
    public BigDecimal totalGeneral;
    public List<DetalleCajaResponseDTO> detallePorMetodo;
}
