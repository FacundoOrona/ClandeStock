package com.clandestock.backend.producto.service;

import com.clandestock.backend.producto.dto.ProductoSecundarioRequestDTO;
import com.clandestock.backend.producto.dto.ProductoSecundarioResponseDTO;
import com.clandestock.backend.producto.modelos.ProductoSecundario;
import com.clandestock.backend.venta.modelos.Local;
import com.clandestock.backend.venta.service.LocalService;

import java.util.List;

import org.springframework.stereotype.Service;

import com.clandestock.backend.producto.repository.ProductoSecundarioRepository;

@Service
public class ProductoSecundarioService {
    private ProductoSecundarioRepository productoSecundarioRepository;
    private LocalService localService;

    public ProductoSecundarioService(ProductoSecundarioRepository productoSecundarioRepository,
            LocalService localService) {
        this.productoSecundarioRepository = productoSecundarioRepository;
        this.localService = localService;
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

    public ProductoSecundarioResponseDTO guardarProductoSecundario(ProductoSecundarioRequestDTO dto) {
        ProductoSecundario productoSecundario = toEnitySinID(dto);
        productoSecundario.setId(null);
        ProductoSecundario nuevoProductoSecundario = productoSecundarioRepository.save(productoSecundario);
        return toResponseDTO(nuevoProductoSecundario);
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

    public ProductoSecundarioResponseDTO bajaProductoSecundario(String id_) {
        Long id = Long.parseLong(id_);
        ProductoSecundario producto = obtenerPorId(id);

        if (producto == null) {
            throw new RuntimeException("ProductoSecundario no encontrado con ID: " + id);
        }

        producto.setEstado(false);
        ProductoSecundario actualizado = productoSecundarioRepository.save(producto);

        return toResponseDTO(actualizado);
    }

    public ProductoSecundarioResponseDTO altaProductoSecundario(String id_) {
        Long id = Long.parseLong(id_);
        ProductoSecundario producto = obtenerPorId(id);

        if (producto == null) {
            throw new RuntimeException("ProductoSecundario no encontrado con ID: " + id);
        }

        producto.setEstado(true);
        ProductoSecundario actualizado = productoSecundarioRepository.save(producto);

        return toResponseDTO(actualizado);
    }

    public void updateStockBajo(Long idProd) {
        ProductoSecundario productoPrincipal = productoSecundarioRepository.findById(idProd)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        productoPrincipal.setStockBajo(!productoPrincipal.getStockBajo());
        productoSecundarioRepository.save(productoPrincipal);
    }

    public void updateSinStock(Long idProd) {
        ProductoSecundario productoPrincipal = productoSecundarioRepository.findById(idProd)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        productoPrincipal.setSinStock(!productoPrincipal.getSinStock());
        productoSecundarioRepository.save(productoPrincipal);
    }

    // CASTEOS : toResponseDTO, toEntity(Sin id) y toEntity

    private ProductoSecundarioResponseDTO toResponseDTO(ProductoSecundario productoSecundario) {
        return new ProductoSecundarioResponseDTO(
                productoSecundario.getId().toString(),
                productoSecundario.getNombreProducto(),
                String.valueOf(productoSecundario.getStock()),
                productoSecundario.getEstado().toString(),
                productoSecundario.getLocal().getId().toString(),
                Integer.toString(productoSecundario.getAletarStock()),
                productoSecundario.getStockBajo().toString(),
                productoSecundario.getSinStock().toString());
    }

    private ProductoSecundario toEnitySinID(ProductoSecundarioRequestDTO dto) {
        Local local = localService.obtenerPorId(Long.parseLong(dto.local()));

        ProductoSecundario productoSecundario = ProductoSecundario.builder()
                .nombreProducto(dto.nombre_producto())
                .stock(Integer.parseInt(dto.stock()))
                .estado(Boolean.valueOf(dto.estado()))
                .local(local)
                .aletarStock((dto.aletarStockBajo() == null || dto.aletarStockBajo().isBlank() ? 1
                        : Integer.parseInt(dto.aletarStockBajo())))
                .build();

        return productoSecundario;
    }

    public void actualizarStock(ProductoSecundario prod) {
        ProductoSecundario pSecundario = obtenerPorId(prod.getId());
        pSecundario.setStock(prod.getStock());
        productoSecundarioRepository.save(pSecundario);
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

    public List<ProductoSecundario> obtenerTodos() {
        return productoSecundarioRepository.findAll();
    }

}
