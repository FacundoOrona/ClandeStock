package com.clandestock.backend.venta.repository;

import com.clandestock.backend.venta.modelos.Caja;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CajaRepository extends JpaRepository<Caja, Long> {

}
