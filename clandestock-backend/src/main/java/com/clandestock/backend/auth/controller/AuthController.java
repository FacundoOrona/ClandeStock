package com.clandestock.backend.auth.controller;

import com.clandestock.backend.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService service;

    @PostMapping("/register")
    public ResponseEntity<TokenResponse> registro(@RequestBody final RegistroRequest request) {
        final TokenResponse token = service.registro(request);
        return ResponseEntity.ok(token);
    }

//    @PostMapping("/login")
//    public ResponseEntity<TokenResponse> authenticate(@RequestBody AuthRequest request) {
//        final TokenResponse response = service.authenticate(request);
//        return ResponseEntity.ok(response);
//    }
//
//    @PostMapping("/refresh-token")
//    public TokenResponse refreshToken(
//            @RequestHeader(HttpHeaders.AUTHORIZATION) final String authentication
//    ) {
//        return service.refreshToken(authentication);
//    }
}
