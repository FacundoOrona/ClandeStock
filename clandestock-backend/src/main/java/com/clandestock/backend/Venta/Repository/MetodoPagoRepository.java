package com.clandestock.backend.Venta.Repository;

import com.clandestock.backend.Venta.Modelos.MetodoPago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MetodoPagoRepository extends JpaRepository<MetodoPago, Long> {

}
