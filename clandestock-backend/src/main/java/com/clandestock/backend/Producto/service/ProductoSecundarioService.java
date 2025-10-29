package com.clandestock.backend.producto.service;

import org.springframework.stereotype.Service;

import com.clandestock.backend.producto.repository.ProductoSecundarioRepository;

@Service
public class ProductoSecundarioService {
    private ProductoSecundarioRepository pSecundarioRepository;

    public ProductoSecundarioService ( ProductoSecundarioRepository psr){
        this.pSecundarioRepository = psr;
    }
}
