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
//
//    @PostMapping("/register")
//    public ResponseEntity<TokenResponse> registro(@RequestBody final RegisterRequest request) {
//        final TokenResponse token = service.register(request);
//        return ResponseEntity.ok(token);
//    }
}
