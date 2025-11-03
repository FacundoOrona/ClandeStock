package com.clandestock.backend.producto.controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.clandestock.backend.producto.service.ProductoPrincipalService;
@RestController
@RequestMapping("/producto/principal")
public class ProductoPrincipalController {
    private ProductoPrincipalService productoPrincipalService;

    public ProductoPrincipalController(ProductoPrincipalService pps){
        this.productoPrincipalService = pps;
    }

}
