package com.clandestock.backend.Venta.Repository;

import com.clandestock.backend.Venta.Modelos.ProductoxVenta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoxVentaRepository extends JpaRepository<ProductoxVenta, Long> {
}
