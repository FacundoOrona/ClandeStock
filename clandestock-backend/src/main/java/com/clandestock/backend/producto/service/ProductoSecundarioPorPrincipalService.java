package com.clandestock.backend.producto.service;

import com.clandestock.backend.producto.dto.ProductoSecundarioPorPrincipalRequestDTO;
import com.clandestock.backend.producto.dto.ProductoSecundarioPorPrincipalResponseDTO;
import com.clandestock.backend.producto.modelos.ProductoPrincipal;
import com.clandestock.backend.producto.modelos.ProductoSecundario;
import com.clandestock.backend.producto.modelos.ProductoSecundarioPorPrincipal;
import com.clandestock.backend.producto.repository.ProductoPrincipalRepository;
import com.clandestock.backend.producto.repository.ProductoSecundarioRepository;
import org.springframework.stereotype.Service;

import com.clandestock.backend.producto.repository.ProductoSecundarioPorPrincipalRepository;

@Service
public class ProductoSecundarioPorPrincipalService {
    private ProductoSecundarioPorPrincipalRepository relacionRepository;
    private ProductoPrincipalRepository productoPrincipalRepository;
    private ProductoSecundarioRepository productoSecundarioRepository;
    private ProductoPrincipalService productoPrincipalService;
    private ProductoSecundarioService productoSecundarioService;

    public ProductoSecundarioPorPrincipalService(ProductoSecundarioPorPrincipalRepository relacionRepository,
                                                 ProductoSecundarioRepository productoSecundarioRepository,
                                                 ProductoPrincipalRepository productoPrincipalRepository,
                                                 ProductoPrincipalService productoPrincipalService,
                                                 ProductoSecundarioService productoSecundarioService) {
        this.relacionRepository = relacionRepository;
        this.productoPrincipalRepository = productoPrincipalRepository;
        this.productoSecundarioRepository = productoSecundarioRepository;
        this.productoPrincipalService = productoPrincipalService;
        this.productoSecundarioService = productoSecundarioService;
    }

    //CRUD
    public ProductoSecundarioPorPrincipalResponseDTO guardarRelacion(ProductoSecundarioPorPrincipalRequestDTO dto) {
        ProductoSecundarioPorPrincipal entidad = toEntity(dto);
        ProductoSecundarioPorPrincipal guardado = relacionRepository.save(entidad);
        return toResponseDTO(guardado);
    }

    //CASTEOS
    private ProductoSecundarioPorPrincipalResponseDTO toResponseDTO(ProductoSecundarioPorPrincipal entidad) {
        return new ProductoSecundarioPorPrincipalResponseDTO(
                entidad.getId().toString(),
                entidad.getProductoPrimario().getId().toString(),
                entidad.getProductoSecundario().getId().toString()
        );
    }

    private ProductoSecundarioPorPrincipal toEntitySinID(ProductoSecundarioPorPrincipalRequestDTO dto) {
        ProductoPrincipal productoPrincipal = productoPrincipalService.obtenerPorId(
                Long.parseLong(dto.id_producto_principal())
        );

        ProductoSecundario productoSecundario = productoSecundarioService.obtenerPorId(
                Long.parseLong(dto.id_producto_secundario())
        );

        return ProductoSecundarioPorPrincipal.builder()
                .productoPrimario(productoPrincipal)
                .productoSecundario(productoSecundario)
                .build();
    }

    private ProductoSecundarioPorPrincipal toEntity(ProductoSecundarioPorPrincipalRequestDTO dto) {
        ProductoPrincipal productoPrincipal = productoPrincipalService.obtenerPorId(
                Long.parseLong(dto.id_producto_principal())
        );

        ProductoSecundario productoSecundario = productoSecundarioService.obtenerPorId(
                Long.parseLong(dto.id_producto_secundario())
        );

        ProductoSecundarioPorPrincipal.ProductoSecundarioPorPrincipalBuilder builder =
                ProductoSecundarioPorPrincipal.builder()
                        .productoPrimario(productoPrincipal)
                        .productoSecundario(productoSecundario);

        if (dto.id() != null && !dto.id().isBlank()) {
            builder.id(Long.parseLong(dto.id()));
        }

        return builder.build();
    }





}
