package com.clandestock.backend.venta.service;

import com.clandestock.backend.venta.dto.MesaRequestDTO;
import com.clandestock.backend.venta.dto.MesaResponseDTO;
import com.clandestock.backend.venta.modelos.Local;
import com.clandestock.backend.venta.modelos.Mesa;
import com.clandestock.backend.venta.repository.LocalRepository;
import com.clandestock.backend.venta.repository.MesaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MesaService {

    private final MesaRepository mesaRepository;
    private final LocalRepository localRepository;

    public MesaResponseDTO crearMesa(MesaRequestDTO request) {
        // Buscar el Local
        Local local = localRepository.findById(request.getLocalId())
                .orElseThrow(() -> new RuntimeException("Local no encontrado"));

        // Casteo a Entity
        Mesa mesa = toEntity(request, local);

        Mesa guardada = mesaRepository.save(mesa);

        // Casteo a Response
        return toResponse(guardada);
    }

    private Mesa toEntity (MesaRequestDTO request, Local local) {
        Mesa mesa = Mesa.builder()
                .numeroMesa(request.getNumeroMesa())
                .ocupada(request.getOcupada() != null ? request.getOcupada() : false)
                .local(local)
                .build();

        return mesa;
    }

    private MesaResponseDTO toResponse(Mesa mesa) {
        return MesaResponseDTO.builder()
                .id(mesa.getId())
                .numeroMesa(mesa.getNumeroMesa())
                .ocupada(mesa.getOcupada())
                .localId(mesa.getLocal().getId())
                .build();
    }
}
