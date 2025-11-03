package com.clandestock.backend.producto.service;

import com.clandestock.backend.producto.dto.ProductoSecundarioRequestDTO;
import com.clandestock.backend.producto.dto.ProductoSecundarioResponseDTO;
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

    private ProductoSecundario toEntity(ProductoSecundarioRequestDTO dto) {
        Local local = localService.obtenerPorId(Long.parseLong(dto.local()));

        ProductoSecundario.ProductoSecundarioBuilder builder = ProductoSecundario.builder()
                .nombreProducto(dto.nombreProducto())
                .stock(Integer.parseInt(dto.stock()))
                .estado(Boolean.valueOf(dto.estado()))
                .local(local);

        if (dto.id() != null) {
            builder.id(Long.parseLong(dto.id()));
        }

        return builder.build();
    }


//    private ProductoPrincipal toEntity(ProductoPrincipalRequestDTO dto) {
//        ProductoPrincipal producto = new ProductoPrincipal();
//        if (dto.getId() != null) {
//            producto = obtenerPorId(Long.parseLong(dto.getId()));
//        }
//        Local local = localService.obtenerPorId(Long.parseLong(dto.getIdLocal()));
//        producto.setLocal(local);
//        producto.setNombreProducto(dto.getNombre());
//        producto.setPrecioProducto(new BigDecimal(dto.getPrecio()));
//        producto.setEstado("1".equals(dto.getEstado()) || "true".equals(dto.getEstado()));
//        producto.setStock(Integer.parseInt(dto.getStock()));
//        Categoria categoria = categoriaService.obtenerCategoriaEntity(Long.parseLong(dto.getIdCategoria()));
//        if (categoria.getLocal() != local) {
//            new RuntimeException("La categoria seleccionada corresponde a otro local");
//        }
//        producto.setCategoria(categoria);
//        return producto;
//    }

}
