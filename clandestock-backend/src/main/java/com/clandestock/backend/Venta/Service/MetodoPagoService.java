package com.clandestock.backend.venta.service;

import com.clandestock.backend.venta.dto.MetodoPagoRequestDTO;
import com.clandestock.backend.venta.dto.MetodoPagoResponseDTO;
import com.clandestock.backend.venta.modelos.Local;
import com.clandestock.backend.venta.modelos.MetodoPago;
import com.clandestock.backend.venta.repository.LocalRepository;
import com.clandestock.backend.venta.repository.MetodoPagoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import javax.swing.text.html.parser.Entity;

@Service
public class MetodoPagoService {
    private MetodoPagoRepository metodoPagoRepository;
    private LocalRepository localRepository;

    public MetodoPagoService(MetodoPagoRepository metodoPagoRepository,
                             LocalRepository localRepository) {
        this.metodoPagoRepository = metodoPagoRepository;
        this.localRepository = localRepository;
    }

    public MetodoPagoResponseDTO insertarMetodoPago (MetodoPagoRequestDTO dto) {

        MetodoPago metodoPago = toEntity(dto);

        MetodoPago metodoPagoGuardado = metodoPagoRepository.save(metodoPago);

        return toDTO(metodoPagoGuardado);
    }

    //CASTEOS
    //Metodo pago (Entidad) a DTO.
    public MetodoPagoResponseDTO toDTO (MetodoPago metodoPago) {
        return new MetodoPagoResponseDTO(
                String.valueOf(metodoPago.getId()),
                metodoPago.getNombreMetodoPago(),
                metodoPago.getIncremento() != null ? String.valueOf(metodoPago.getIncremento()) : null,
                metodoPago.getDescuento() != null ? String.valueOf(metodoPago.getDescuento()) : null,
                metodoPago.getEstado() != null ? String.valueOf(metodoPago.getEstado()) : null,
                metodoPago.getLocal() != null ? String.valueOf(metodoPago.getLocal()) : null
        );
    }

    //DTO a MetodoPago (Entidad)
    public MetodoPago toEntity (MetodoPagoRequestDTO dto) {
        Local local = localRepository.findById(Long.parseLong(dto.local_id()))
                .orElseThrow(() -> new EntityNotFoundException("Local con ID " + dto.local_id() + "no encontrado"));

        return MetodoPago.builder()
                .id(dto.id() != null ? Long.parseLong(dto.id()) : null)
                .nombreMetodoPago(dto.nombre_metodo_pago())
                .incremento(dto.incremento() != null ? Long.parseLong(dto.incremento()) : null)
                .descuento(dto.descuento() != null ? Long.parseLong(dto.descuento()) : null)
                .estado(dto.estado() != null ? Boolean.parseBoolean(dto.estado()) :null)
                .local(local)
                .build();
    }
}
