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
        this.usuarioRepository = usuarioRepository;
    }

    public ReporteResponse cargarReporte (ReporteRequest request){
        Reporte reporte = toEntity(request);
        reporte.setEstado(false);
        Reporte reporteGuardado = reporteRepository.save(reporte);
        return toResponse(reporteGuardado);
    }

    public Reporte toEntity (ReporteRequest request){
        Usuario usuarioEmisor = usuarioRepository.findByNombreUsuario(request.usuarioEmisor())
                .orElseThrow(()->new EntityNotFoundException("Usuario emisor "+ request.usuarioEmisor() +" inexistente"));

        return Reporte.builder()
                .descripcion(request.descripcion())
                .usuarioEmisor(usuarioEmisor)
                .build();
    }

    public ReporteResponse toResponse (Reporte reporte){
    }
}
