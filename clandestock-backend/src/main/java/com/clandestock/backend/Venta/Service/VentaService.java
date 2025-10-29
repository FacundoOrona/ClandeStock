package com.clandestock.backend.venta.service;

import com.clandestock.backend.venta.repository.VentaRepository;
import org.springframework.stereotype.Service;

@Service
public class VentaService {
    private VentaRepository ventaRepository;

    public VentaService(VentaRepository ventaRepository) {
        this.ventaRepository = ventaRepository;
    }
}
