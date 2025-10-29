package com.clandestock.backend.producto.modelos;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "ProductoSecundario_tb")
public class ProductoSecundario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "productoID", nullable = false)
    private ProductoPrincipal productoPrincipal;

    @Column(nullable = false, length = 100)
    private String nombreProducto;

    @Column(precision = 10, scale = 2)
    private BigDecimal precioProducto;

    @Builder.Default
    private Boolean estado = true;
}