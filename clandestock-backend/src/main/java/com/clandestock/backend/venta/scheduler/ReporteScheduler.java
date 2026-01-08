package com.clandestock.backend.venta.scheduler;

import com.clandestock.backend.venta.repository.ReporteRepository;
import com.clandestock.backend.venta.modelos.Reporte;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class ReporteScheduler {

    private final ReporteRepository reporteRepository;

    // Ejecuta cada 10 segundos.
    // @Scheduled(fixedRate = 10000)

    // Ejecuta cada día a las 00 hs
    @Scheduled(cron = "0 0 0 * * *")
    public void eliminarReportesAntiguos() {
        LocalDateTime fechaLimite = LocalDateTime.now().minusDays(10);

        List<Reporte> reportesAntiguos = reporteRepository.findReportesEstadoTrueAndFechaBefore(fechaLimite);

        if (!reportesAntiguos.isEmpty()) {
            reporteRepository.deleteAll(reportesAntiguos);
            log.info("🧹 Reportes eliminados: {}", reportesAntiguos.size());
        } else {
            log.info("✅ No hay reportes antiguos para eliminar.");
        }
    }
}
