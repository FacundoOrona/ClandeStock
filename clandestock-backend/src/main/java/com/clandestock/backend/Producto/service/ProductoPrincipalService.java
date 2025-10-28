package com.clandestock.backend.Producto.service;

import org.springframework.stereotype.Service;

import com.clandestock.backend.Producto.repository.ProductoPrincipalRepository;

@Service
public class ProductoPrincipalService {
    private ProductoPrincipalRepository productoPrincipalRepository;

    public ProductoPrincipalService (ProductoPrincipalRepository ppr){
        this.productoPrincipalRepository = ppr;
    }
}
