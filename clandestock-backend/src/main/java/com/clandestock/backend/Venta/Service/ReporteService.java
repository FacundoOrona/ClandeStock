package com.clandestock.backend.venta.service;

import com.clandestock.backend.venta.repository.ReporteRepository;
import org.springframework.stereotype.Service;

@Service
public class ReporteService {
    private ReporteRepository reporteRepository;

    public ReporteService(ReporteRepository reporteRepository) {
        this.reporteRepository = reporteRepository;
    }
}
