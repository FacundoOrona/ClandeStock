package com.clandestock.backend.venta.service;

import com.clandestock.backend.seguridad.UsuarioContexto;
import com.clandestock.backend.usuario.modelos.Usuario;
import com.clandestock.backend.usuario.service.UsuarioService;
import com.clandestock.backend.venta.dto.CajaResponseDTO;
import com.clandestock.backend.venta.modelos.Caja;
import com.clandestock.backend.venta.modelos.Local;
import com.clandestock.backend.venta.repository.CajaRepository;
import com.clandestock.backend.venta.repository.VentaRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class CajaService {
    private CajaRepository cajaRepository;
    private UsuarioService usuarioService;
    private LocalService localService;
    private final VentaRepository ventaRepository;

    public CajaService(CajaRepository cajaRepository, UsuarioService usuarioService, LocalService localService, VentaRepository ventaRepository) {
        this.cajaRepository = cajaRepository;
        this.usuarioService = usuarioService;
        this.localService = localService;
        this.ventaRepository = ventaRepository;
    }

    public CajaResponseDTO abrir(BigDecimal montoApertura) {
        // Se obtiene el contexto seteado cuando pasa el jwt authentication filters
        UsuarioContexto usuarioContext = (UsuarioContexto) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        Usuario usuario = usuarioService.obtenerPorNombreUsuario(usuarioContext.getNombreUsuario());
        Local local = localService.obtenerPorNombre(usuarioContext.getLocal());

        // Verifica si ya existe una caja abierta en ese local
        Optional<Caja> cajaAbierta = cajaRepository.findByLocalAndEstado(local, true);
        if (cajaAbierta.isPresent()) {
            throw new RuntimeException("Ya existe una caja abierta en este local");
        }

        Caja caja = new Caja();
        caja.setUsuario(usuario);
        caja.setFechaApertura(LocalDateTime.now());
        caja.setMontoApertura(montoApertura);
        caja.setLocal(local);

        Caja nuevCaja = cajaRepository.save(caja);
        return toDTO(nuevCaja);
    }

    public Caja obtenerPorLocal(Local local, Boolean cajaAbierta) {
        return cajaRepository.findByLocalAndEstado(local, cajaAbierta)
                .orElseThrow(() -> new RuntimeException("El local no posee una caja abierta"));
    }

    public CajaResponseDTO cerrar() {
        UsuarioContexto usuarioContext = (UsuarioContexto) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        Local local = localService.obtenerPorNombre(usuarioContext.getLocal());
        Caja caja = cajaRepository.findByLocalAndEstado(local, true)
                .orElseThrow(() -> new RuntimeException("No hay caja abierta en este local"));

        // Verifico que no haya ventas abiertas en esa caja
        boolean hayVentasAbiertas = cajaPoseeVentasAbiertas(caja);
        if (hayVentasAbiertas) {
            throw new RuntimeException("No se puede cerrar la caja: existen ventas abiertas");
        }

        caja.setEstado(false);
        caja.setFechaCierre(LocalDateTime.now());
        Caja cerrada = cajaRepository.save(caja);
        return toDTO(cerrada);
    }

    private boolean cajaPoseeVentasAbiertas(Caja caja) {
        return ventaRepository.existsByCajaAndEstadoPago(caja, false)
                && ventaRepository.existsByCajaAndFechaCierreIsNull(caja);
    }

    private CajaResponseDTO toDTO(Caja entity) {
        CajaResponseDTO dto = new CajaResponseDTO();
        dto.id = entity.getId().toString();
        dto.idUsuario = entity.getUsuario().getId().toString();
        dto.fechaApertura = entity.getFechaApertura().toString();
        dto.fechaCierre = entity.getFechaCierre() != null ? entity.getFechaCierre().toString() : null;
        dto.montoApertura = entity.getMontoApertura().toString();
        dto.estado = entity.getEstado().toString();
        dto.idLocal = entity.getLocal().getId().toString();
        return dto;
    }
}
