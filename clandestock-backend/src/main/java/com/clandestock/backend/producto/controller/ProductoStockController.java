package com.clandestock.backend.producto.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clandestock.backend.producto.dto.ProductoStockResponseDTO;
import com.clandestock.backend.producto.service.ProductoStockService;

@RestController
@RequestMapping("/productos")
public class ProductoStockController {
    private ProductoStockService productoStockService;

    public ProductoStockController(ProductoStockService pss){
        this.productoStockService = pss;
    }
    
    @GetMapping("/stock")
    public ResponseEntity<?> obtenerConStock() {
        try{
            List<ProductoStockResponseDTO> response = productoStockService.productosConStock();
            return ResponseEntity.ok(response);
        }
        catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
