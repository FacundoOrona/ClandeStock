package com.clandestock.backend.Producto.service;

import org.springframework.stereotype.Service;

import com.clandestock.backend.Producto.repository.CategoriaRepository;

@Service
public class CategoriaService {
    private CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository cr) {
        this.categoriaRepository = cr;
    }
}
