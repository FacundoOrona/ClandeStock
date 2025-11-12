package com.clandestock.backend.venta.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clandestock.backend.venta.dto.AbrirCajaRequestDTO;
import com.clandestock.backend.venta.dto.CajaResponseDTO;
import com.clandestock.backend.venta.service.CajaService;

import java.math.BigDecimal;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/caja")
public class CajaController {
    private final CajaService cajaService;

    public CajaController(CajaService cajaService){
        this.cajaService = cajaService;
    }

    @PostMapping("/abrir")
    public ResponseEntity<?> abrir(@RequestBody AbrirCajaRequestDTO dto) {
        try {
            CajaResponseDTO response = cajaService.abrir(new BigDecimal(dto.montoApertura));
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    
    @PostMapping("/cerrar")
    public ResponseEntity<?> cerrar() {
        try {
            CajaResponseDTO response = cajaService.cerrar();
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    
}
