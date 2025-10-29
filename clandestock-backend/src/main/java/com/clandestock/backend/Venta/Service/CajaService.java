package com.clandestock.backend.Venta.Service;

import com.clandestock.backend.Venta.Repository.CajaRepository;
import org.springframework.stereotype.Service;

@Service
public class CajaService {
    private CajaRepository cajaRepository;

    public CajaService(CajaRepository cajaRepository) {
        this.cajaRepository = cajaRepository;
    }
}
