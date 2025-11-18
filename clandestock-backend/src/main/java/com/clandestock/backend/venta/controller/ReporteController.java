package com.clandestock.backend.venta.controller;

import com.clandestock.backend.venta.dto.CajaResponseDTO;
import com.clandestock.backend.venta.dto.ReporteRequest;
import com.clandestock.backend.venta.dto.ReporteResponse;
import com.clandestock.backend.venta.service.CajaService;
import com.clandestock.backend.venta.service.ReporteService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/reporte")
public class ReporteController {
}
