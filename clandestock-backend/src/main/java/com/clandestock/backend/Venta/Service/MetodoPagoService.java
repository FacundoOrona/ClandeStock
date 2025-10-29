package com.clandestock.backend.venta.service;

import com.clandestock.backend.venta.repository.MetodoPagoRepository;
import org.springframework.stereotype.Service;

@Service
public class MetodoPagoService {
    private MetodoPagoRepository metodoPagoRepository;

    public MetodoPagoService(MetodoPagoRepository metodoPagoRepository) {
        this.metodoPagoRepository = metodoPagoRepository;
    }
}
