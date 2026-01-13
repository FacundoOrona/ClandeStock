package com.clandestock.backend.print;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PrintJobRepository extends JpaRepository<PrintJob, Long> {

    List<PrintJob> findTop10ByPrintedFalseAndLocalOrderByCreatedAtAsc(String local);
}