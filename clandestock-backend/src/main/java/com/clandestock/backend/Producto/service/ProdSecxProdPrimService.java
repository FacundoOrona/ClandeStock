package com.clandestock.backend.Producto.service;

import org.springframework.stereotype.Service;

import com.clandestock.backend.Producto.repository.ProdSecxProdPrimRepository;

@Service
public class ProdSecxProdPrimService {
    private ProdSecxProdPrimRepository pSecxProdPrimRepository;

    public ProdSecxProdPrimService(ProdSecxProdPrimRepository pSecxProdPrimRepository) {
        this.pSecxProdPrimRepository = pSecxProdPrimRepository;
    }

}
