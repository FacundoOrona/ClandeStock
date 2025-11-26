package com.clandestock.backend.venta.repository;

import com.clandestock.backend.venta.modelos.Mesa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MesaRepository extends JpaRepository<Mesa, Long> {
}
