package com.clandestock.backend.Venta.Repository;

import com.clandestock.backend.Venta.Modelos.Caja;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CajaRepository extends JpaRepository<Caja, Long> {

}
