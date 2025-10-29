package com.clandestock.backend.Venta.Service;

import com.clandestock.backend.Venta.Repository.VentaRepository;
import org.springframework.stereotype.Service;

@Service
public class VentaService {
    private VentaRepository ventaRepository;

    public VentaService(VentaRepository ventaRepository) {
        this.ventaRepository = ventaRepository;
    }
}
