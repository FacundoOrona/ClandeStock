package com.clandestock.backend.venta.service;

import com.clandestock.backend.producto.modelos.ProductoPrincipal;
import com.clandestock.backend.producto.modelos.ProductoSecundario;
import com.clandestock.backend.producto.modelos.ProductoSecundarioPorPrincipal;
import com.clandestock.backend.producto.service.ProductoPrincipalService;
import com.clandestock.backend.producto.service.ProductoSecundarioPorPrincipalService;
import com.clandestock.backend.producto.service.ProductoSecundarioService;
import com.clandestock.backend.producto.service.ProductoStockService;
import com.clandestock.backend.seguridad.UsuarioContexto;
import com.clandestock.backend.usuario.modelos.Usuario;
import com.clandestock.backend.usuario.service.UsuarioService;
import com.clandestock.backend.venta.dto.NuevaVentaRequestDTO;
import com.clandestock.backend.venta.dto.ProductoVentaResponseDTO;
import com.clandestock.backend.venta.dto.VentaResponseDTO;
import com.clandestock.backend.venta.modelos.Local;
import com.clandestock.backend.venta.modelos.ProductoxVenta;
import com.clandestock.backend.venta.modelos.TipoVenta;
import com.clandestock.backend.venta.modelos.Venta;
import com.clandestock.backend.venta.repository.VentaRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class VentaService {

    private final VentaRepository ventaRepository;
    private final UsuarioService usuarioService;
    private final MetodoPagoService metodoPagoService;
    private final ProductoPrincipalService productoPrincipalService;
    private final ProductoSecundarioPorPrincipalService productoSecundarioPorPrincipalService;
    private final ProductoStockService productoStockService;
    private final ProductoSecundarioService productoSecundarioService;
    private final ProductoxVentaService productoxVentaService;
    private final LocalService localService;

    public VentaService(
            VentaRepository ventaRepository,
            UsuarioService usuarioService,
            MetodoPagoService metodoPagoService,
            ProductoPrincipalService prodPrincipalService,
            ProductoSecundarioPorPrincipalService psxpps,
            ProductoStockService prodStockService,
            ProductoSecundarioService prodSecundarioService,
            ProductoxVentaService prodxVentaService,
            LocalService localService) {
        this.ventaRepository = ventaRepository;
        this.usuarioService = usuarioService;
        this.metodoPagoService = metodoPagoService;
        this.productoPrincipalService = prodPrincipalService;
        this.productoSecundarioPorPrincipalService = psxpps;
        this.productoStockService = prodStockService;
        this.productoSecundarioService = prodSecundarioService;
        this.productoxVentaService = prodxVentaService;
        this.localService = localService;
    }

    public VentaResponseDTO nueva(NuevaVentaRequestDTO dto) {
        UsuarioContexto usuarioContexto = (UsuarioContexto) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        if (usuarioContexto.esAdminGeneral()) {
            throw new RuntimeException("Usuario administrador no puede iniciar venta");
        }
        Usuario usuario = usuarioService.obtenerPorNombreUsuario(usuarioContexto.getNombreUsuario());
        Local local = localService.obtenerPorNombre(usuarioContexto.getLocal());;
        Venta venta = Venta.builder()
                .usuario(usuario)
                .metodoPago(null)
                .fechaApertura(LocalDateTime.now())
                .estadoPago(false)
                .precioTotal(null)
                .fechaCierre(null)
                .local(local)
                .tipoVenta(dto.tipoVenta)
                .detalleEntrega(dto.detalleEntrega)
                .build();
        venta = ventaRepository.save(venta);
        return toResponseDTO(venta);
    }

    public VentaResponseDTO agregarProducto(Long idVenta, Long idProducto) {
        Venta venta = ventaRepository.findById(idVenta)
                .orElseThrow(() -> new RuntimeException("Venta no encontrada"));
        if (venta.getFechaCierre() != null || Boolean.TRUE.equals(venta.getEstadoPago())) {
            throw new RuntimeException("La venta ya está cerrada o pagada");
        }
        ProductoPrincipal producto = productoPrincipalService.obtenerPorId(idProducto);
        if(venta.getLocal()!=producto.getLocal()){
            throw new RuntimeException("Producto no corresponde al local");
        }
        List<ProductoSecundarioPorPrincipal> secundarios = productoSecundarioPorPrincipalService
                .obtenerSecundariosPorPrincipal(producto);
        // Validar stock
        int stockDisponible = secundarios.isEmpty()
                ? producto.getStock()
                : productoStockService.calcularStockDisponible(secundarios);
        if (stockDisponible < 1) {
            throw new RuntimeException("Stock insuficiente para agregar este producto");
        }
        // Descontar stock
        if (secundarios.isEmpty()) {
            producto.setStock(producto.getStock() - 1);
            productoPrincipalService.actualizarStock(producto);
        } else {
            Map<Long, Long> requerimientos = secundarios.stream()
                    .collect(Collectors.groupingBy(
                            rel -> rel.getProductoSecundario().getId(),
                            Collectors.counting()));
            for (Map.Entry<Long, Long> entry : requerimientos.entrySet()) {
                ProductoSecundario sec = productoSecundarioService.obtenerPorId(entry.getKey());
                sec.setStock(sec.getStock() - entry.getValue().intValue());
                productoSecundarioService.actualizarStock(sec);
            }
        }
        // Crear ProductoPorVenta
        ProductoxVenta pxv = ProductoxVenta.builder()
        .venta(venta)
        .idProducto(producto.getId())
        .nombreProducto(producto.getNombreProducto())
        .precioProducto(producto.getPrecioProducto())
        .build();
        productoxVentaService.guardar(pxv);
        // Actualizar venta
        venta.getProductos().add(pxv);
        // aca hacer nueva funcion para calculo de total si hay metodo de pago
        BigDecimal nuevoTotal = venta.getPrecioTotal() == null
                ? producto.getPrecioProducto()
                : venta.getPrecioTotal().add(producto.getPrecioProducto());
        venta.setPrecioTotal(nuevoTotal);
        ventaRepository.save(venta);
        return toResponseDTO(venta);
    }

    public VentaResponseDTO quitarProducto(Long idVenta, Long idProductoxVenta) {
        Venta venta = ventaRepository.findById(idVenta)
                .orElseThrow(() -> new RuntimeException("Venta no encontrada"));
        if (venta.getFechaCierre() != null || Boolean.TRUE.equals(venta.getEstadoPago())) {
            throw new RuntimeException("La venta ya está cerrada o pagada");
        }
        ProductoxVenta pxv = productoxVentaService.obtenerPorId(idProductoxVenta);
        if(venta != pxv.getVenta()){
            throw new RuntimeException("Producto no corresponde a la venta seleccionada");
        }
        ProductoPrincipal producto = productoPrincipalService.obtenerPorId(pxv.getIdProducto());
        List<ProductoSecundarioPorPrincipal> secundarios = productoSecundarioPorPrincipalService
                .obtenerSecundariosPorPrincipal(producto);
        // Revertir stock
        if (secundarios.isEmpty()) {
            producto.setStock(producto.getStock() + 1);
            productoPrincipalService.actualizarStock(producto);
        } else {
            Map<Long, Long> requerimientos = secundarios.stream()
                    .collect(Collectors.groupingBy(
                            rel -> rel.getProductoSecundario().getId(),
                            Collectors.counting()));
            for (Map.Entry<Long, Long> entry : requerimientos.entrySet()) {
                ProductoSecundario sec = productoSecundarioService.obtenerPorId(entry.getKey());
                sec.setStock(sec.getStock() + entry.getValue().intValue());
                productoSecundarioService.actualizarStock(sec);
            }
        }
        // Eliminar entrada
        productoxVentaService.eliminar(pxv.getId());
        // Actualizar venta
        venta.getProductos().removeIf(p -> p.getId().equals(idProductoxVenta));
        // aca hacer nueva funcion para calculo de total si hay metodo de pago
        BigDecimal nuevoTotal = venta.getPrecioTotal().subtract(pxv.getPrecioProducto());
        venta.setPrecioTotal(nuevoTotal.compareTo(BigDecimal.ZERO) > 0 ? nuevoTotal : null);
        ventaRepository.save(venta);
        return toResponseDTO(venta);
    }

    public VentaResponseDTO obtenerPorId(Long id){
        Venta venta = ventaRepository.findById(id).orElseThrow(()-> new RuntimeException("Venta no encontrada"));
        return toResponseDTO(venta);
    }

    private VentaResponseDTO toResponseDTO(Venta venta) {
        VentaResponseDTO dto = new VentaResponseDTO();
        dto.idVenta = venta.getId().toString();
        dto.idUsuario = venta.getUsuario().getId().toString();
        dto.idMetodoPago = venta.getMetodoPago() != null ? venta.getMetodoPago().getId().toString() : null;
        dto.precioTotal = venta.getPrecioTotal() != null ? venta.getPrecioTotal().toString() : null;
        dto.fechaApertura = venta.getFechaApertura().toString();
        dto.fechaCierre = venta.getFechaCierre() != null ? venta.getFechaCierre().toString() : null;
        dto.estadoPago = venta.getEstadoPago().toString();
        dto.tipoVenta = venta.getTipoVenta().toString();
        dto.detalleEntrega = venta.getDetalleEntrega();
        dto.localId = venta.getLocal().getId().toString();
        dto.productos = venta.getProductos() != null ? venta.getProductos().stream().map(p -> {
            ProductoVentaResponseDTO prod = new ProductoVentaResponseDTO();
            prod.idProductoPorVenta = p.getId().toString();
            prod.nombreProducto = p.getNombreProducto();
            prod.precioProducto = p.getPrecioProducto().toString();
            return prod;
        }).toList() : List.of();
        return dto;
    }

}
