package com.clandestock.backend.usuario.controller;

import com.clandestock.backend.usuario.dto.UsuarioResponseDTO;
import com.clandestock.backend.usuario.repository.UsuarioRepository;
import com.clandestock.backend.usuario.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    private UsuarioService usuarioService;
    public UsuarioController (UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public List<UsuarioResponseDTO> obtenerTodosModeradores() {
        try {
            return usuarioService.listarModeradoresEspeciales();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping("baja/{id}")
    public ResponseEntity<?> darBajaModerador 
}
