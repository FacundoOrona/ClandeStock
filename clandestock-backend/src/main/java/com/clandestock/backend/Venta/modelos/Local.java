package com.clandestock.backend.venta.modelos;

import java.util.List;

import com.clandestock.backend.producto.modelos.Categoria;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "Local_tb")
public class Local {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombreLocal;

    @OneToMany(mappedBy = "local")
    private List<Caja> cajas;

    @OneToMany(mappedBy = "local")
    private List<Categoria> categorias;

    @OneToMany(mappedBy = "local")
    private List<Venta> ventas;

    @OneToMany(mappedBy = "local")
    private List<Mesa> mesas;
}