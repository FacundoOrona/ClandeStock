package com.clandestock.backend.producto.service;

import com.clandestock.backend.producto.modelos.ProductoSecundario;
import com.clandestock.backend.venta.service.LocalService;
import org.springframework.stereotype.Service;

import com.clandestock.backend.producto.repository.ProductoSecundarioRepository;

@Service
public class ProductoSecundarioService {
    private ProductoSecundarioRepository productoSecundarioRepository;
    private LocalService localService;
    private CategoriaService categoriaService;

    public ProductoSecundarioService (ProductoSecundarioRepository productoSecundarioRepository,
                                      LocalService localService,
                                      CategoriaService categoriaService){
        this.productoSecundarioRepository = productoSecundarioRepository;
        this.localService = localService;
        this.categoriaService = categoriaService;
    }

    public ProductoSecundario obtenerProductoSecundarioPorId(Long id) {
        return productoSecundarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado / inexistente"));
    }
}
