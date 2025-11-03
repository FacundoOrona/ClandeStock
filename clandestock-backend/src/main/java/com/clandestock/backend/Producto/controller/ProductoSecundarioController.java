package com.clandestock.backend.producto.controller;

import com.clandestock.backend.producto.dto.ProductoPrincipalRequestDTO;
import com.clandestock.backend.producto.dto.ProductoPrincipalResponseDTO;
import com.clandestock.backend.producto.dto.ProductoSecundarioRequestDTO;
import com.clandestock.backend.producto.dto.ProductoSecundarioResponseDTO;
import com.clandestock.backend.producto.service.ProductoSecundarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/productos/secundario")
public class ProductoSecundarioController {
    private ProductoSecundarioService productoSecundarioService;

    public ProductoSecundarioController(ProductoSecundarioService pss){
        this.productoSecundarioService = pss;
    }

    @PostMapping
    public ResponseEntity<?> guardarProductoSecundario(@RequestBody ProductoSecundarioRequestDTO dto){
        try {
            ProductoSecundarioResponseDTO response = productoSecundarioService.guardarProductoSecundario(dto);
            return ResponseEntity.ok(response);
        }
        catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerProductoSecundario (@PathVariable String id) {
        try {
            ProductoSecundarioResponseDTO responseDTO = productoSecundarioService.obtenerProductoSecundarioPorId(id);
            return ResponseEntity.ok(responseDTO);
        } catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<?> actualizar(@RequestBody ProductoSecundarioRequestDTO dto) {
        try {
            ProductoSecundarioResponseDTO responseDTO = productoSecundarioService.actualizarProductoSecundario(dto);
            return ResponseEntity.ok(responseDTO);
        }catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
