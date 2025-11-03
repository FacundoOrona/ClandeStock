package com.clandestock.backend.producto.service;

import com.clandestock.backend.producto.dto.ProductoPrincipalResponseDTO;
import com.clandestock.backend.producto.dto.ProductoSecundarioResponseDTO;
import com.clandestock.backend.producto.modelos.Categoria;
import com.clandestock.backend.producto.modelos.ProductoPrincipal;
import com.clandestock.backend.producto.modelos.ProductoSecundario;
import com.clandestock.backend.venta.modelos.Local;
import com.clandestock.backend.venta.service.LocalService;
import org.springframework.stereotype.Service;

import com.clandestock.backend.producto.repository.ProductoSecundarioRepository;

import java.math.BigDecimal;

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

    public ProductoSecundario obtenerPorId(Long id) {
        return productoSecundarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado / inexistente"));
    }

    public ProductoSecundarioResponseDTO obtenerProductoSecundarioPorId(String id) {
        ProductoSecundario producto = obtenerPorId(Long.parseLong(id));
        return toResponseDTO(producto);
    }

    private ProductoSecundarioResponseDTO toResponseDTO(ProductoSecundario productoSecundario) {
        return new ProductoSecundarioResponseDTO(
                productoSecundario.getId().toString(),
                productoSecundario.getNombreProducto(),
                String.valueOf(productoSecundario.getStock()),
                productoSecundario.getEstado().toString(),
                productoSecundario.getLocal().toString()
        );
    }

    private ProductoSecundario toEnitySinID (ProductoSecundarioResponseDTO dto) {
        Local local = localService.obtenerPorId(Long.parseLong(dto.local()));

        ProductoSecundario productoSecundario = ProductoSecundario.builder()
                .nombreProducto(dto.nombre_producto())
                .stock(Integer.parseInt(dto.stock()))
                .estado(Boolean.valueOf(dto.estado()))
                .local(local)
                .build();

        return productoSecundario;
    }


}
