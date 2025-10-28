package com.clandestock.backend.Producto.service;

import org.springframework.stereotype.Service;

import com.clandestock.backend.Producto.repository.ProductoSecundarioRepository;

@Service
public class ProductoSecundarioService {
    private ProductoSecundarioRepository pSecundarioRepository;

    public ProductoSecundarioService ( ProductoSecundarioRepository psr){
        this.pSecundarioRepository = psr;
    }
}
