package com.clandestock.backend.producto.service;

import org.springframework.stereotype.Service;

import com.clandestock.backend.producto.repository.ProdSecxProdPrimRepository;

@Service
public class ProdSecxProdPrimService {
    private ProdSecxProdPrimRepository pSecxProdPrimRepository;

    public ProdSecxProdPrimService(ProdSecxProdPrimRepository pSecxProdPrimRepository) {
        this.pSecxProdPrimRepository = pSecxProdPrimRepository;
    }

}
