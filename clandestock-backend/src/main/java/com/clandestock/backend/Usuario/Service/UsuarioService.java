package com.clandestock.backend.usuario.service;

import org.springframework.stereotype.Service;

import com.clandestock.backend.usuario.repository.UsuarioRepository;

@Service
public class UsuarioService {
    private UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository ur){
        this.usuarioRepository = ur;
    }
}
