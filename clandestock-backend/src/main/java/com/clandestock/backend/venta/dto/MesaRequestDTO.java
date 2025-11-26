package com.clandestock.backend.venta.dto;

import lombok.Data;

@Data
public class MesaRequestDTO {
    private Integer numeroMesa;
    private Boolean ocupada;
    private Long localId; // id del local al que pertenece
}

