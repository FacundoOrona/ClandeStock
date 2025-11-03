package com.clandestock.backend.producto.repository;

import com.clandestock.backend.producto.modelos.ProductoPrincipal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.clandestock.backend.producto.modelos.ProductoSecundario;

import java.util.List;

@Repository
public interface ProductoSecundarioRepository extends JpaRepository <ProductoSecundario, Long> {
}
