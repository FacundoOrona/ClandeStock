package com.clandestock.backend.producto.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.clandestock.backend.producto.dto.ProductoPrincipalRequestDTO;
import com.clandestock.backend.producto.dto.ProductoPrincipalResponseDTO;
import com.clandestock.backend.producto.modelos.Categoria;
import com.clandestock.backend.producto.modelos.ProductoPrincipal;
import com.clandestock.backend.producto.repository.ProductoPrincipalRepository;
import com.clandestock.backend.seguridad.UsuarioContexto;
import com.clandestock.backend.venta.modelos.Local;
import com.clandestock.backend.venta.service.LocalService;

@Service
public class ProductoPrincipalService {
    private ProductoPrincipalRepository productoPrincipalRepository;
    private LocalService localService;
    private CategoriaService categoriaService;

    public ProductoPrincipalService(ProductoPrincipalRepository ppr, LocalService ls, CategoriaService cs) {
        this.productoPrincipalRepository = ppr;
        this.localService = ls;
        this.categoriaService = cs;
    }

    public ProductoPrincipal obtenerPorId(Long id) {
        return productoPrincipalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    public ProductoPrincipalResponseDTO guardar(ProductoPrincipalRequestDTO dto) {
        ProductoPrincipal producto = toEntitySinID(dto);
        producto.setId(null);
        ProductoPrincipal nuevoProducto = productoPrincipalRepository.save(producto);
        return toResponseDTO(nuevoProducto);
    }

    public ProductoPrincipalResponseDTO obtenerPorId(String id) {
        ProductoPrincipal producto = obtenerPorId(Long.parseLong(id));
        return toResponseDTO(producto);
    }

    public ProductoPrincipalResponseDTO actualizar(ProductoPrincipalRequestDTO dto) {
        ProductoPrincipal producto = obtenerPorId(Long.parseLong(dto.getId()));
        producto = toEntity(dto);
        ProductoPrincipal actualizado = productoPrincipalRepository.save(producto);
        return toResponseDTO(actualizado);
    }

    public List<ProductoPrincipalResponseDTO> obtenerTodos() {
        UsuarioContexto usuario = (UsuarioContexto) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();

        List<ProductoPrincipal> productos;

        if (usuario.esAdminGeneral()) {
            productos = productoPrincipalRepository.findAll();
        } else {
            productos = productoPrincipalRepository.findByLocal_NombreLocal(usuario.getLocal());
        }

        if (productos.isEmpty()) {
            throw new RuntimeException("No se encontraron productos");
        }

        return productos.stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    // =======================CASTEO DE ENTIDAD<--->DTO==========================
    private ProductoPrincipal toEntity(ProductoPrincipalRequestDTO dto) {
        ProductoPrincipal producto = new ProductoPrincipal();
        if (dto.getId() != null) {
            producto = obtenerPorId(Long.parseLong(dto.getId()));
        }
        Local local = localService.obtenerPorId(Long.parseLong(dto.getIdLocal()));
        producto.setLocal(local);
        producto.setNombreProducto(dto.getNombre());
        producto.setPrecioProducto(new BigDecimal(dto.getPrecio()));
        producto.setEstado("1".equals(dto.getEstado()) || "true".equals(dto.getEstado()));
        producto.setStock(Integer.parseInt(dto.getStock()));
        Categoria categoria = categoriaService.obtenerCategoriaEntity(Long.parseLong(dto.getIdCategoria()));
        if (categoria.getLocal() != local) {
            new RuntimeException("La categoria seleccionada corresponde a otro local");
        }
        producto.setCategoria(categoria);
        return producto;
    }

    private ProductoPrincipalResponseDTO toResponseDTO(ProductoPrincipal producto) {
        ProductoPrincipalResponseDTO dto = new ProductoPrincipalResponseDTO();
        dto.id = producto.getId().toString();
        dto.idLocal = producto.getLocal().getId().toString();
        dto.nombre_producto = producto.getNombreProducto().toString();
        dto.precio_producto = producto.getPrecioProducto().toString();
        dto.estado = producto.getEstado().toString();
        dto.stock = String.valueOf(producto.getStock());
        dto.idCategoria = producto.getCategoria().getId().toString();
        return dto;
    }

    private ProductoPrincipal toEntitySinID(ProductoPrincipalRequestDTO dto) {
        ProductoPrincipal producto = new ProductoPrincipal();
        Local local = localService.obtenerPorId(Long.parseLong(dto.getIdLocal()));
        producto.setLocal(local);
        producto.setNombreProducto(dto.getNombre());
        producto.setPrecioProducto(new BigDecimal(dto.getPrecio()));
        producto.setEstado("1".equals(dto.getEstado()) || "true".equals(dto.getEstado()));
        producto.setStock(Integer.parseInt(dto.getStock()));
        Categoria categoria = categoriaService.obtenerCategoriaEntity(Long.parseLong(dto.getIdCategoria()));
        if (categoria.getLocal() != local) {
            new RuntimeException("La categoria seleccionada corresponde a otro local");
        }
        producto.setCategoria(categoria);
        return producto;
    }
}
