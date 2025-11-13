package com.clandestock.backend.venta.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.clandestock.backend.venta.modelos.Caja;
import com.clandestock.backend.venta.modelos.Venta;

@Repository
public interface VentaRepository extends JpaRepository<Venta, Long>, JpaSpecificationExecutor<Venta> {
    boolean existsByCajaAndEstadoPago(Caja caja, Boolean estadoPago);
    
    boolean existsByCajaAndFechaCierreIsNull(Caja caja);
}
