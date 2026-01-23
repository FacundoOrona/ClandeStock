package com.clandestock.backend.print;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import jakarta.transaction.Transactional;

public interface PrintJobRepository extends JpaRepository<PrintJob, Long> {

    List<PrintJob> findTop10ByPrintedFalseAndLocalOrderByCreatedAtAsc(String local);

    @Transactional
    @Modifying
    void deleteAllByLocal(String local);
}