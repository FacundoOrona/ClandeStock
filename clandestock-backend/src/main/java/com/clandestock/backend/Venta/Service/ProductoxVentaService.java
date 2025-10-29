package com.clandestock.backend.Venta.Service;

import com.clandestock.backend.Venta.Repository.ProductoxVentaRepository;
import org.springframework.stereotype.Service;

@Service
public class ProductoxVentaService {
    private ProductoxVentaRepository productoxVentaRepository;

    public ProductoxVentaService(ProductoxVentaRepository productoxVentaRepository) {
        this.productoxVentaRepository = productoxVentaRepository;
    }
}
