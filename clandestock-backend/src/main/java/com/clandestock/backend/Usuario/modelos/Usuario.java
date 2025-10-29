package com.clandestock.backend.usuario.modelos;

import java.time.LocalDateTime;
import java.util.List;

import com.clandestock.backend.auth.repository.Token;
import com.clandestock.backend.venta.modelos.Caja;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Table(name = "Usuario_tb")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String nombreUsuario;

    @Column(nullable = false, length = 255)
    private String contrasena;

    @ManyToOne
    @JoinColumn(name = "tipoUsuario", nullable = false)
    private TipoUsuario tipoUsuario;

    @Column(columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime fechaCreacion;

    private Boolean estado;

    @OneToMany(mappedBy = "usuario", fetch = FetchType.LAZY)
    private List<Token> tokens;

    @OneToMany(mappedBy = "usuario", fetch = FetchType.LAZY)
    private List<Caja> cajas;
}