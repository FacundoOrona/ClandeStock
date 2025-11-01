package com.clandestock.backend.venta.modelos;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

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

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Caja_tb")
public class Caja {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuarioID", nullable = false)
    private Usuario usuario;

    private LocalDateTime fechaApertura;

    private LocalDateTime fechaCierre;

    @Column(precision = 10, scale = 2)
    private BigDecimal montoApertura;

    @Column(precision = 10, scale = 2)
    private BigDecimal montoCierre;

    @Builder.Default
    private Boolean estado = true;

    @Column(nullable = true)
    @OneToMany(mappedBy = "caja")
    private List<Local> locales;
}