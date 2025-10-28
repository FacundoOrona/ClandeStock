package com.clandestock.backend.Usuario.Service;

import org.springframework.stereotype.Service;

import com.clandestock.backend.Usuario.Repository.UsuarioRepository;

@Service
public class UsuarioService {
    private UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository ur){
        this.usuarioRepository = ur;
    }
}
