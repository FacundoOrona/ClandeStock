package com.clandestock.backend.usuario.service;

import org.springframework.stereotype.Service;

import com.clandestock.backend.usuario.repository.TipoUsuarioRepository;

@Service
public class TipoUsuarioService {
    private TipoUsuarioRepository tUsuarioRepository;

    public TipoUsuarioService(TipoUsuarioRepository tur){
        this.tUsuarioRepository = tur;
    }
}
