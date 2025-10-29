package com.clandestock.backend.producto.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.clandestock.backend.producto.modelos.ProdSecxProdPrim;

@Repository
public interface ProdSecxProdPrimRepository extends JpaRepository<ProdSecxProdPrim, Long> {
    
}
