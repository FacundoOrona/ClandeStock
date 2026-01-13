package com.clandestock.backend.print;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clandestock.backend.seguridad.UsuarioContexto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/print")
@RequiredArgsConstructor
public class PrintController {

    private final PrintJobRepository repo;

    /**
     * 🔐 INSERTAR TICKET (React)
     */
    @PostMapping
    public ResponseEntity<Void> create(@RequestBody Map<String, String> body) {

        UsuarioContexto usuario = (UsuarioContexto) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        PrintJob job = new PrintJob();
        job.setContent(body.get("content"));

        // 🔥 SALE DIRECTO DEL JWT
        job.setLocal(usuario.getLocal());

        repo.save(job);
        return ResponseEntity.ok().build();
    }

    /**
     * 🔓 CONSULTA PARA NODE (sin JWT)
     */
    @GetMapping("/pending/{local}")
    public List<PrintJob> pending(@PathVariable String local) {
        return repo.findTop10ByPrintedFalseAndLocalOrderByCreatedAtAsc(local);
    }

    /**
     * 🔓 MARCAR COMO IMPRESO
     */
    @PostMapping("/{id}/done")
    public void done(@PathVariable Long id) {
        repo.findById(id).ifPresent(job -> {
            repo.delete(job);
        });
    }

}
