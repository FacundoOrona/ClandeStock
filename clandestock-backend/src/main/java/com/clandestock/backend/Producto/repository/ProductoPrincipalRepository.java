package com.clandestock.backend.Producto.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.clandestock.backend.Producto.modelos.ProductoPrincipal;

@Repository
public interface ProductoPrincipalRepository extends JpaRepository<ProductoPrincipal, Long> {
    
}
