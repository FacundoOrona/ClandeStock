package com.clandestock.backend.venta.service;

import com.clandestock.backend.venta.repository.LocalRepository;
import org.springframework.stereotype.Service;

@Service
public class LocalService {
    private LocalRepository localRepository;

    public LocalService(LocalRepository localRepository) {
        this.localRepository = localRepository;
    }
}
