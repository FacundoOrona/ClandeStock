package com.clandestock.backend.producto.service;

import org.springframework.stereotype.Service;

import com.clandestock.backend.producto.repository.ProductoPrincipalRepository;

@Service
public class ProductoPrincipalService {
    private ProductoPrincipalRepository productoPrincipalRepository;

    public ProductoPrincipalService (ProductoPrincipalRepository ppr){
        this.productoPrincipalRepository = ppr;
    }
}
