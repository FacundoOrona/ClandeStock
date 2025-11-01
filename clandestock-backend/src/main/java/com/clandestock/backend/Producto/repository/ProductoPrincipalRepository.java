package com.clandestock.backend.producto.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.clandestock.backend.producto.modelos.ProductoPrincipal;

@Repository
public interface ProductoPrincipalRepository extends JpaRepository<ProductoPrincipal, Long> {

    Long countByCategoriaId(Long categortiaId);
    
}
