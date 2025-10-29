package com.clandestock.backend.producto.service;

import org.springframework.stereotype.Service;

import com.clandestock.backend.producto.repository.CategoriaRepository;

@Service
public class CategoriaService {
    private CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository cr) {
        this.categoriaRepository = cr;
    }
}
