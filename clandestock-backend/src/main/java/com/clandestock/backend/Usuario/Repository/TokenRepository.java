package com.clandestock.backend.Usuario.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.clandestock.backend.Usuario.modelos.Token;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {
    
}
