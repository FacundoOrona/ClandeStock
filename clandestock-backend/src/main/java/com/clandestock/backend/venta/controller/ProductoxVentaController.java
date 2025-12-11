package com.clandestock.backend.venta.controller;
import com.clandestock.backend.venta.service.ProductoxVentaService;
@RestController
@RequestMapping("/productoxventa")
public class ProductoxVentaController {
        private final ProductoxVentaService productoxVentaService;
        public ProductoxVentaController(ProductoxVentaService productoxVentaService) {
            this.productoxVentaService = productoxVentaService;
        }
    }
