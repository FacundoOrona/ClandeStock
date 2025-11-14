package com.clandestock.backend.venta.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.clandestock.backend.venta.modelos.Caja;
import com.clandestock.backend.venta.modelos.Venta;

@Repository
public interface VentaRepository extends JpaRepository<Venta, Long>, JpaSpecificationExecutor<Venta> {
        boolean existsByCajaAndEstadoPago(Caja caja, Boolean estadoPago);

        boolean existsByCajaAndFechaCierreIsNull(Caja caja);

        @Query("SELECT v.caja.id, v.metodoPago.nombreMetodoPago, SUM(v.precioTotalConMetodoDePago) " +
                        "FROM Venta v " +
                        "WHERE v.caja.estado = false " +
                        "GROUP BY v.caja.id, v.metodoPago.nombreMetodoPago")
        List<Object[]> obtenerTotalesPorCajaYMetodo();

        @Query("SELECT v.caja.id, v.metodoPago.nombreMetodoPago, SUM(v.precioTotalConMetodoDePago) " +
                        "FROM Venta v " +
                        "WHERE v.caja.estado = true " +
                        "GROUP BY v.caja.id, v.metodoPago.nombreMetodoPago")
        List<Object[]> obtenerTotalesPorCajaAbiertaYMetodo();
}
