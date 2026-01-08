package com.clandestock.backend.auth.scheduler;

import com.clandestock.backend.auth.repository.TokenRepository;
import com.clandestock.backend.auth.modelos.Token;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class TokenScheduler {

    private final TokenRepository tokenRepository;


    
    // Ejecuta cada 10 segundos.
    // @Scheduled(fixedRate = 10000)

    // Ejecuta cada día a las 00:00 hs.
    @Scheduled(cron = "0 0 0 * * *")
    public void eliminarTokensInvalidos() {
        List<Token> tokensInvalidos = tokenRepository.findAllInvalidTokens();

        if (!tokensInvalidos.isEmpty()) {
            tokenRepository.deleteAll(tokensInvalidos);
        }
    }
}
