package com.clandestock.backend.Venta.Service;

import com.clandestock.backend.Venta.Repository.ReporteRepository;
import org.springframework.stereotype.Service;

@Service
public class ReporteService {
    private ReporteRepository reporteRepository;

    public ReporteService(ReporteRepository reporteRepository) {
        this.reporteRepository = reporteRepository;
    }
}
