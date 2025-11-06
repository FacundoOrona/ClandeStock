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

    private MetodoPago obtenerMetodoPagoPorID (Long id) {
        MetodoPago metodoPago = metodoPagoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Metodo de pago con ID "+ id +" no encontrado."));
        return metodoPago;
    }

    public MetodoPagoResponseDTO insertarMetodoPago (MetodoPagoRequestDTO dto) {
        MetodoPago metodoPago = toEntity(dto);
        MetodoPago metodoPagoGuardado = metodoPagoRepository.save(metodoPago);
        return toDTO(metodoPagoGuardado);
    }

    public MetodoPagoResponseDTO actualizarMetodoPago (MetodoPagoRequestDTO dto) {
        MetodoPago metodoPagoInicial = obtenerMetodoPagoPorID(Long.parseLong(dto.id()));


        metodoPagoInicial.setNombreMetodoPago(dto.nombre_metodo_pago());
        metodoPagoInicial.setDescuento(Long.parseLong(dto.descuento()));
        metodoPagoInicial.setIncremento(Long.parseLong(dto.incremento()));
        metodoPagoInicial.setEstado(Boolean.parseBoolean(dto.estado()));
        if (dto.local_id() != null){
            Local local = localRepository.findById(Long.parseLong(dto.local_id()))
                            .orElseThrow(() -> new EntityNotFoundException("El id del local al que se quiere actualizar, no existe"));
            metodoPagoInicial.setLocal(local);
        }

        MetodoPago metodoPagoGuardado = metodoPagoRepository.save(metodoPagoInicial);
        return toDTO(metodoPagoGuardado);
    }

    public MetodoPagoResponseDTO bajaLogica (Long id) {
        MetodoPago metodoPago = obtenerMetodoPagoPorID(id);
        metodoPago.setEstado(false);
        MetodoPago metodoPagoActualizado = metodoPagoRepository.save(metodoPago);
        return toDTO(metodoPagoActualizado);
    }

    public MetodoPagoResponseDTO altaLogica (Long id) {
        MetodoPago metodoPago = obtenerMetodoPagoPorID(id);
        metodoPago.setEstado(true);
        MetodoPago metodoPagoActualizado = metodoPagoRepository.save(metodoPago);
        return toDTO(metodoPagoActualizado);
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
