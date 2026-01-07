package com.clandestock.backend.venta.repository;

import com.clandestock.backend.venta.modelos.Reporte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReporteRepository extends JpaRepository<Reporte, Long> {
    List<Reporte> findByUsuarioEmisor_Id(Long idUsuario);

    @Query("""
        SELECT r FROM Reporte r WHERE r.estado = true AND r.fecha < :fechaLimite
    """)
    List<Reporte> findReportesEstadoTrueAndFechaBefore(LocalDateTime fechaLimite);
}
