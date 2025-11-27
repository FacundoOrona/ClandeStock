package com.clandestock.backend.venta.service;

import com.clandestock.backend.seguridad.UsuarioContexto;
import com.clandestock.backend.venta.dto.MozoRequestDTO;
import com.clandestock.backend.venta.dto.MozoResponseDTO;
import com.clandestock.backend.venta.modelos.Local;
import com.clandestock.backend.venta.modelos.Mozo;
import com.clandestock.backend.venta.repository.MozoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MozoService {

    private final MozoRepository mozoRepository;
    private final LocalService localService;

    public MozoResponseDTO crearMozo(MozoRequestDTO dto, UsuarioContexto usuarioContexto) {
        if (usuarioContexto.esAdminGeneral()) {
            throw new RuntimeException("El administrador general no puede crear mozos directamente");
        }

        Local local = localService.obtenerPorNombre(usuarioContexto.getLocal());

        Mozo mozo = Mozo.builder()
                .nombre(dto.getNombre())
                .local(local)
                .build();

        mozo = mozoRepository.save(mozo);

        return toResponseDTO(mozo);
    }

    public List<MozoResponseDTO> listarMozos(UsuarioContexto usuarioContexto) {
        List<Mozo> mozos;

        if (usuarioContexto.esAdminGeneral()) {
            mozos = mozoRepository.findAll();
        } else {
            mozos = mozoRepository.findByLocal_NombreLocal(usuarioContexto.getLocal());
        }

        return mozos.stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    private MozoResponseDTO toResponseDTO(Mozo mozo) {
        return MozoResponseDTO.builder()
                .id(mozo.getId())
                .nombre(mozo.getNombre())
                .localId(mozo.getLocal().getId())
                .nombreLocal(mozo.getLocal().getNombreLocal())
                .build();
    }
}

