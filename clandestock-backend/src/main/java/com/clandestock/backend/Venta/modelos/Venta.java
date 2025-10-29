package com.clandestock.backend.venta.modelos;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.clandestock.backend.producto.modelos.ProductoPrincipal;
import com.clandestock.backend.usuario.modelos.Usuario;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Table(name = "Ventas_tb")
public class Venta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "productoId", nullable = false)
    private ProductoPrincipal productoPrincipal;

    @ManyToOne
    @JoinColumn(name = "usuarioID", nullable = false)
    private Usuario usuario;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precioTotal;

    @ManyToOne
    @JoinColumn(name = "metodoDePago", nullable = false)
    private MetodoPago metodoPago;

    @Column(columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime fechaVenta;

    @Builder.Default
    private Boolean estadoPago = false;

    @OneToMany(mappedBy = "venta")
    private List<ProductoxVenta> productos;
}