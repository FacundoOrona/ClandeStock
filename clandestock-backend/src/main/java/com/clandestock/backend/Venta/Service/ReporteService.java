package com.clandestock.backend.venta.service;

import com.clandestock.backend.auth.dto.RegistroRequest;
import com.clandestock.backend.usuario.modelos.Usuario;
import com.clandestock.backend.usuario.repository.UsuarioRepository;
import com.clandestock.backend.venta.dto.ReporteRequest;
import com.clandestock.backend.venta.dto.ReporteResponse;
import com.clandestock.backend.venta.modelos.Reporte;
import com.clandestock.backend.venta.repository.ReporteRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class ReporteService {
    private ReporteRepository reporteRepository;
    private UsuarioRepository usuarioRepository;

    public ReporteService(ReporteRepository reporteRepository, UsuarioRepository usuarioRepository) {
        this.reporteRepository = reporteRepository;
    }
}
