package com.clandestock.backend.venta.modelos;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Table(name = "Mesa_tb")
public class Mesa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer numeroMesa;

    @Builder.Default
    private Boolean ocupada = false;

    // Relación 1 a 1 con Local
    @OneToOne
    @JoinColumn(name = "local_id", nullable = false)
    private Local local;

    // Relación 1 a muchos con Venta
    @OneToMany(mappedBy = "mesa")
    private List<Venta> ventas;
}
