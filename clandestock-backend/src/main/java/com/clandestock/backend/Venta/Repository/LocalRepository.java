package com.clandestock.backend.Venta.Repository;

import com.clandestock.backend.Venta.Modelos.Local;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocalRepository extends JpaRepository<Local, Long> {
}
