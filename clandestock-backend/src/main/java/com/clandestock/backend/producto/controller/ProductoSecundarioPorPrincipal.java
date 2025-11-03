package com.clandestock.backend.producto.controller;

import com.clandestock.backend.producto.dto.ProductoSecundarioPorPrincipalRequestDTO;
import com.clandestock.backend.producto.service.ProdSecxProdPrimService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/productos/relacion")
public class ProductoSecundarioPorPrincipal {
    private ProdSecxProdPrimService prodSecxProdPrimService;
    public ProductoSecundarioPorPrincipal(ProdSecxProdPrimService prodSecxProdPrimService){
        this.prodSecxProdPrimService = prodSecxProdPrimService;
    }

    @PostMapping
    public ResponseEntity<?> guardarRelacionProductos (@RequestBody ProductoSecundarioPorPrincipalRequestDTO dto) {
        
    }

}
