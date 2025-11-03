package com.clandestock.backend.producto.service;

import com.clandestock.backend.producto.dto.ProductoPrincipalRequestDTO;
import com.clandestock.backend.producto.dto.ProductoPrincipalResponseDTO;
import com.clandestock.backend.producto.dto.ProductoSecundarioRequestDTO;
import com.clandestock.backend.producto.dto.ProductoSecundarioResponseDTO;
import com.clandestock.backend.producto.modelos.ProductoPrincipal;
import com.clandestock.backend.producto.modelos.ProductoSecundario;
import com.clandestock.backend.venta.modelos.Local;
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

    // BUSQUEDA / SEARCH

    public ProductoSecundario obtenerPorId(Long id) {
        return productoSecundarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado / inexistente"));
    }

    public ProductoSecundarioResponseDTO obtenerProductoSecundarioPorId(String id) {
        ProductoSecundario producto = obtenerPorId(Long.parseLong(id));
        return toResponseDTO(producto);
    }

    // CRUD

    public ProductoSecundarioResponseDTO guardarProductoSecundario (ProductoSecundarioRequestDTO dto) {
        ProductoSecundario productoSecundario = toEnitySinID(dto);
        productoSecundario.setId(null);
        ProductoSecundario nuevoProductoSecundario = productoSecundarioRepository.save(productoSecundario);

        System.out.println("Nuevo producto insertado! Numero de ID: " + nuevoProductoSecundario.getId());

        return  toResponseDTO(nuevoProductoSecundario);
    }

    public ProductoSecundarioResponseDTO actualizarProductoSecundario(ProductoSecundarioRequestDTO dto) {
        ProductoSecundario productoSecundario = obtenerPorId(Long.parseLong(dto.id()));
        Local local = localService.obtenerPorId(Long.parseLong(dto.local()));

        productoSecundario.setNombreProducto(dto.nombre_producto());
        productoSecundario.setStock(Integer.parseInt(dto.stock()));
        productoSecundario.setEstado(Boolean.valueOf(dto.estado()));
        productoSecundario.setLocal(local);

        ProductoSecundario actualizado = productoSecundarioRepository.save(productoSecundario);
        return toResponseDTO(actualizado);
    }

    // CASTEOS : toResponseDTO, toEntity(Sin id) y toEntity

    private ProductoSecundarioResponseDTO toResponseDTO(ProductoSecundario productoSecundario) {
        return new ProductoSecundarioResponseDTO(
                productoSecundario.getId().toString(),
                productoSecundario.getNombreProducto(),
                String.valueOf(productoSecundario.getStock()),
                productoSecundario.getEstado().toString(),
                productoSecundario.getLocal().toString()
        );
    }

    private ProductoSecundario toEnitySinID (ProductoSecundarioRequestDTO dto) {
        Local local = localService.obtenerPorId(Long.parseLong(dto.local()));

        ProductoSecundario productoSecundario = ProductoSecundario.builder()
                .nombreProducto(dto.nombre_producto())
                .stock(Integer.parseInt(dto.stock()))
                .estado(Boolean.valueOf(dto.estado()))
                .local(local)
                .build();

        return productoSecundario;
    }

    private ProductoSecundario toEntity(ProductoSecundarioRequestDTO dto) {
        Local local = localService.obtenerPorId(Long.parseLong(dto.local()));

        ProductoSecundario.ProductoSecundarioBuilder builder = ProductoSecundario.builder()
                .nombreProducto(dto.nombre_producto())
                .stock(Integer.parseInt(dto.stock()))
                .estado(Boolean.valueOf(dto.estado()))
                .local(local);

        if (dto.id() != null) {
            builder.id(Long.parseLong(dto.id()));
        }

        return builder.build();
    }

}
