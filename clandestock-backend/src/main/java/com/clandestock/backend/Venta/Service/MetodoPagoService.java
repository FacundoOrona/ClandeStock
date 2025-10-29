package com.clandestock.backend.Venta.Service;

import com.clandestock.backend.Venta.Repository.MetodoPagoRepository;
import org.springframework.stereotype.Service;

@Service
public class MetodoPagoService {
    private MetodoPagoRepository metodoPagoRepository;

    public MetodoPagoService(MetodoPagoRepository metodoPagoRepository) {
        this.metodoPagoRepository = metodoPagoRepository;
    }
}
