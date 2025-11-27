package com.clandestock.backend.venta.repository;

import com.clandestock.backend.venta.modelos.Mozo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MozoRepository extends JpaRepository<Mozo, Long> {
    List<Mozo> findByLocal_NombreLocal(String nombreLocal);
}
