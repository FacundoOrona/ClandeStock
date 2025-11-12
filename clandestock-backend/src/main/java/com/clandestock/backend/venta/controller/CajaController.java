package com.clandestock.backend.venta.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.clandestock.backend.venta.service.CajaService;
@RestController
@RequestMapping("/caja")
public class CajaController {
    private final CajaService cajaService;

    public CajaController(CajaService cajaService){
        this.cajaService = cajaService;
    }

    
}
