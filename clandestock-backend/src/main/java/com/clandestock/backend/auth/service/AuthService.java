package com.clandestock.backend.auth.service;

import com.clandestock.backend.auth.controller.RegistroRequest;
import com.clandestock.backend.auth.controller.TokenResponse;
import com.clandestock.backend.auth.repository.Token;
import com.clandestock.backend.auth.repository.TokenRepository;
import com.clandestock.backend.usuario.modelos.Usuario;
import com.clandestock.backend.usuario.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final UsuarioRepository usuarioRepository;
    private final JwtService jwtService;

    public TokenResponse registro(RegistroRequest request) {
        var usuario = Usuario.builder()
                .nombreUsuario(request.nombreUsuario())
                .contrasena(passwordEncoder.encode(request.contrasena()))
                .tipoUsuario(request.tipoUsuario())
                .fechaCreacion(request.fechaCreacion())
                .build();
        var usuarioGuardado = usuarioRepository.save(usuario);
        var jwtToken = jwtService.generateToken(usuario);
        var refreshToken = jwtService.generateRefreshToken(usuario);
        saveTokenUsuario(usuarioGuardado, jwtToken);
        return new TokenResponse(jwtToken, refreshToken);
    }

    private void saveTokenUsuario(Usuario usuario, String jwtToken) {
        var token = Token.builder()
                .usuario(usuario)
                .token(jwtToken)
                .tokenType(Token.TokenType.BEARER)
                .isExpired(false)
                .isRevoked(false)
                .build();
        tokenRepository.save(token);
    }
}
