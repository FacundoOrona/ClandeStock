package com.clandestock.backend.producto.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.clandestock.backend.producto.dto.ProductoStockResponseDTO;
import com.clandestock.backend.producto.modelos.ProductoPrincipal;
import com.clandestock.backend.producto.modelos.ProductoSecundario;
import com.clandestock.backend.producto.modelos.ProductoSecundarioPorPrincipal;

@Service
public class ProductoStockService {

    private ProductoPrincipalService productoPrincipalService;
    private ProductoSecundarioPorPrincipalService productoSecundarioPorPrincipalService;

    public ProductoStockService(ProductoPrincipalService pps, ProductoSecundarioPorPrincipalService psxpps) {
        this.productoPrincipalService = pps;
        this.productoSecundarioPorPrincipalService = psxpps;
    }

    // Tiene filtro de JWT aplicado(retorna segun el rol del token)
    public List<ProductoStockResponseDTO> productosConStock() {
        List<ProductoPrincipal> productos = productoPrincipalService.obtenerTodosEntity();
        List<ProductoStockResponseDTO> resultado = new ArrayList<>();

        for (ProductoPrincipal principal : productos) {
            List<ProductoSecundarioPorPrincipal> secundarios = productoSecundarioPorPrincipalService
                    .obtenerSecundariosPorPrincipal(principal);

            int stockDisponible;
            if (secundarios.isEmpty()) {
                stockDisponible = principal.getStock();
            } else {
                stockDisponible = calcularStockDisponible(secundarios);
            }

            resultado.add(new ProductoStockResponseDTO(
                    principal.getId().toString(),
                    principal.getNombreProducto(),
                    String.valueOf(stockDisponible),
                    principal.getPrecioProducto().toString()));
        }

        return resultado;
    }

    public int calcularStockDisponible(List<ProductoSecundarioPorPrincipal> relaciones) {
        // Agrupar por producto secundario y contar cuántas veces aparece
        Map<Long, Long> requerimientos = relaciones.stream()
                .collect(Collectors.groupingBy(
                        rel -> rel.getProductoSecundario().getId(),
                        Collectors.counting()));

        // Mapear ID a entidad para acceder al stock
        Map<Long, ProductoSecundario> secundariosMap = relaciones.stream()
                .map(ProductoSecundarioPorPrincipal::getProductoSecundario)
                .collect(Collectors.toMap(
                        ProductoSecundario::getId,
                        Function.identity(),
                        (a, b) -> a // en caso de duplicado, conservar uno
                ));

        // Calcular el mínimo stock disponible según los requerimientos
        return requerimientos.entrySet().stream()
                .mapToInt(entry -> {
                    ProductoSecundario sec = secundariosMap.get(entry.getKey());
                    int stock = Math.max(0, sec.getStock());
                    long vecesRequerido = entry.getValue();
                    return (int) (stock / vecesRequerido);
                })
                .min()
                .orElse(0);
    }
}