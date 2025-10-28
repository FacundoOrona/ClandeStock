package com.clandestock.backend.Usuario.Service;

import org.springframework.stereotype.Service;

import com.clandestock.backend.Usuario.Repository.TokenRepository;

@Service
public class TokenService {
    private TokenRepository tokenRepository;

    public TokenService(TokenRepository tr) {
        this.tokenRepository = tr;
    }
}
