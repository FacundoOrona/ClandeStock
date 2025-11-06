package com.clandestock.backend.venta.service;

import com.clandestock.backend.venta.dto.MetodoPagoRequestDTO;
import com.clandestock.backend.venta.dto.MetodoPagoResponseDTO;
import com.clandestock.backend.venta.modelos.MetodoPago;
import com.clandestock.backend.venta.repository.MetodoPagoRepository;
import org.springframework.stereotype.Service;

@Service
public class MetodoPagoService {
    private MetodoPagoRepository metodoPagoRepository;

    public MetodoPagoService(MetodoPagoRepository metodoPagoRepository) {
        this.metodoPagoRepository = metodoPagoRepository;
    }

    public MetodoPagoResponseDTO insertarMetodoPago (MetodoPagoRequestDTO dto) {

        return dto;
    }

    //CASTEOS
    public MetodoPagoResponseDTO toDTO (MetodoPago metodoPago) {
        return new MetodoPagoResponseDTO(
                String.valueOf(metodoPago.getId()),
                metodoPago.getNombreMetodoPago(),
                metodoPago.getIncremento() != null ? String.valueOf(metodoPago.getIncremento()) : null,
                metodoPago.getDescuento() != null ? String.valueOf(metodoPago.getDescuento()) : null,
                metodoPago.getEstado() != null ? String.valueOf(metodoPago.getEstado()) : null,
                metodoPago.getLocal() != null ? String.valueOf(metodoPago.getLocal()) : null
        );
    }
}
