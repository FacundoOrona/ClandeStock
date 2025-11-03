package com.clandestock.backend.producto.controller;

import com.clandestock.backend.producto.dto.ProductoSecundarioRequestDTO;
import com.clandestock.backend.producto.dto.ProductoSecundarioResponseDTO;
import com.clandestock.backend.producto.service.ProductoSecundarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/productos/secundario")
public class ProductoSecundarioController {
    private ProductoSecundarioService productoSecundarioService;

    public ProductoSecundarioController(ProductoSecundarioService pss){
        this.productoSecundarioService = pss;
    }

    @PostMapping
    public ResponseEntity<?> guardar(@RequestBody ProductoSecundarioRequestDTO dto){
        try {
            ProductoSecundarioResponseDTO response = productoSecundarioService.guardar(dto);
            return ResponseEntity.ok(response);
        }
        catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
