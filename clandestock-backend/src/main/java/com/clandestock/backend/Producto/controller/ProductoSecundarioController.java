package com.clandestock.backend.producto.controller;

import com.clandestock.backend.producto.service.ProductoSecundarioService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/productos/secundario")
public class ProductoSecundarioController {
    private ProductoSecundarioService productoSecundarioService;

    public ProductoSecundarioController(ProductoSecundarioService pss){
        this.productoSecundarioService = pss;
    }
}
