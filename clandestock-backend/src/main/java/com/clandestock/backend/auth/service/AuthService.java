package com.clandestock.backend.auth.service;

import com.clandestock.backend.auth.controller.RegistroRequest;
import com.clandestock.backend.auth.controller.TokenResponse;
import com.clandestock.backend.auth.repository.TokenRepository;
import com.clandestock.backend.usuario.modelos.Usuario;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final TokenRepository tokenRepository;

    public TokenResponse registro(RegistroRequest request) {
        var usuario = Usuario.builder()
                .nombreUsuario(request.nombreUsuario())
                .contrasena(request.contrasena())
                .tipoUsuario(request.tipoUsuario())
                .fechaCreacion(request.fechaCreacion())
                .build();
    }
}
