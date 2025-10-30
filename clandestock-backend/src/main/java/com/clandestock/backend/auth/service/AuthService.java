package com.clandestock.backend.auth.service;

import com.clandestock.backend.auth.dto.LoginRequest;
import com.clandestock.backend.auth.dto.RegistroRequest;
import com.clandestock.backend.auth.dto.TokenResponse;
import com.clandestock.backend.auth.modelos.Token;
import com.clandestock.backend.auth.repository.TokenRepository;
import com.clandestock.backend.usuario.modelos.TipoUsuario;
import com.clandestock.backend.usuario.modelos.Usuario;
import com.clandestock.backend.usuario.repository.TipoUsuarioRepository;
import com.clandestock.backend.usuario.repository.UsuarioRepository;

import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final UsuarioRepository usuarioRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final TipoUsuarioRepository tipoUsuarioRepository;

    public TokenResponse registro(RegistroRequest request) {
        TipoUsuario tipo = tipoUsuarioRepository.findById(request.tipoUsuarioId())
                .orElseThrow(() -> new RuntimeException("Tipo de usuario no encontrado"));

        System.out.println("NOM:" + request.nombreUsuario());
        var usuario = Usuario.builder()
                .nombreUsuario(request.nombreUsuario())
                .contrasena(passwordEncoder.encode(request.contrasena()))
                .tipoUsuario(tipo)
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

    public TokenResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(), request.getContrasena()));

        Usuario usuario = usuarioRepository.findByNombreUsuario(request.getUsername())
                .orElseThrow();
        String accessToken = jwtService.generateToken(usuario);
        String refreshToken = jwtService.generateRefreshToken(usuario);
        revocarTokens(usuario);
        saveTokenUsuario(usuario, accessToken);
        return new TokenResponse(accessToken, refreshToken);
    }

    private void revocarTokens(Usuario usuario) {
        List<Token> tokenValidos = tokenRepository.findAllValidTokenByUser(usuario.getId());
        if (!tokenValidos.isEmpty()) {
            tokenValidos.forEach(token -> {
                token.setIsExpired(true);
                token.setIsRevoked(true);
            });
            tokenRepository.saveAll(tokenValidos);
        }
    }

    public TokenResponse refreshToken(String authentication) {
        if (authentication == null || !authentication.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Invalid auth header");
        }

        final String refreshToken = authentication.substring(7);
        final String nombreUsuario = jwtService.extractUsername(refreshToken);
        if (nombreUsuario == null) {
            return null;
        }

        final Usuario usuario = usuarioRepository.findByNombreUsuario(nombreUsuario).orElseThrow();
        final boolean isTokenValid = jwtService.isTokenValid(refreshToken, usuario);
        if (!isTokenValid) {
            return null;
        }
        final String accessToken = jwtService.generateRefreshToken(usuario);
        revocarTokens(usuario);
        saveTokenUsuario(usuario, accessToken);
        return new TokenResponse(accessToken, refreshToken);
    }
}
