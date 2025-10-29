package com.clandestock.backend.venta.service;

import com.clandestock.backend.venta.repository.ProductoxVentaRepository;
import org.springframework.stereotype.Service;

@Service
public class ProductoxVentaService {
    private ProductoxVentaRepository productoxVentaRepository;

    public ProductoxVentaService(ProductoxVentaRepository productoxVentaRepository) {
        this.productoxVentaRepository = productoxVentaRepository;
    }
}
