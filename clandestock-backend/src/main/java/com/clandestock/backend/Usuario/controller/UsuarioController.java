package com.clandestock.backend.usuario.controller;

import com.clandestock.backend.seguridad.UsuarioContexto;
import com.clandestock.backend.usuario.dto.*;
import com.clandestock.backend.usuario.repository.UsuarioRepository;
import com.clandestock.backend.usuario.service.UsuarioService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @PutMapping("/{id}/baja")
    public ResponseEntity<?> darDeBaja(@PathVariable Long id) {
        try {
            UsuarioResponseDTO response = usuarioService.darDeBaja(id);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al dar de baja el usuario");
        }
    }

    @PutMapping("/{id}/alta")
    public ResponseEntity<?> darDeAlta(@PathVariable Long id) {
        try {
            UsuarioResponseDTO response = usuarioService.darDeAlta(id);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al dar de alta el usuario");
        }
    }

    @PutMapping("/{id}/editar")
    public ResponseEntity<?> editarUsuario(@PathVariable Long id,
                                           @RequestBody UsuarioRequestDTO dto) {
        try {
            UsuarioResponseDTO response = usuarioService.editarUsuario(id, dto);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al editar el usuario");
        }
    }

    // ACTUALIZAR CONTRASEÑA PROPIA DEL ADMIN
    @PreAuthorize("hasAuthority('ADMIN_GENERAL')")
    @PutMapping("/actualizarContrasena")
    public ResponseEntity<?> actualizarContrasena(@RequestBody ActualizarContrasenaRequestDTO request) {
        try {
            UsuarioContexto usuario = (UsuarioContexto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            ActualizarContrasenaResponse response = usuarioService.actualizarContrasena(usuario.getNombreUsuario(), request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar la contraseña");
        }
    }

    // ACTUALIZAR CONTRASEÑA A MODERADORES DESDE ADMIN
    @PreAuthorize("hasAuthority('ADMIN_GENERAL')")
    @PutMapping("/cambiarContrasenaAdmin")
    public ResponseEntity<?> cambiarContrasenaComoAdmin(@RequestBody ActualizarContraseñaModeradorRequestDTO request) {
        try {
            ActualizarContrasenaResponse response = usuarioService.actualizarContraseñaAModeradores(request);
            return ResponseEntity.ok(response);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al cambiar la contraseña del usuario: " + e.getMessage());
        }
    }
}
