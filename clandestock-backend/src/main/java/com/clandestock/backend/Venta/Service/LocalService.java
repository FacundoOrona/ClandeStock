package com.clandestock.backend.Venta.Service;

import com.clandestock.backend.Venta.Repository.LocalRepository;
import org.springframework.stereotype.Service;

@Service
public class LocalService {
    private LocalRepository localRepository;

    public LocalService(LocalRepository localRepository) {
        this.localRepository = localRepository;
    }
}
