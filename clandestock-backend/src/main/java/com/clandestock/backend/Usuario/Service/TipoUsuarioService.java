package com.clandestock.backend.Usuario.Service;

import org.springframework.stereotype.Service;

import com.clandestock.backend.Usuario.Repository.TipoUsuarioRepository;

@Service
public class TipoUsuarioService {
    private TipoUsuarioRepository tUsuarioRepository;

    public TipoUsuarioService(TipoUsuarioRepository tur){
        this.tUsuarioRepository = tur;
    }
}
