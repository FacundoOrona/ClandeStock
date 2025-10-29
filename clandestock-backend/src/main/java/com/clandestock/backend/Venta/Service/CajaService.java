package com.clandestock.backend.venta.service;

import com.clandestock.backend.venta.repository.CajaRepository;
import org.springframework.stereotype.Service;

@Service
public class CajaService {
    private CajaRepository cajaRepository;

    public CajaService(CajaRepository cajaRepository) {
        this.cajaRepository = cajaRepository;
    }
}
