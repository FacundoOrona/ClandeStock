package com.clandestock.backend.venta.controller;


import com.clandestock.backend.venta.dto.MetodoPagoRequestDTO;
import com.clandestock.backend.venta.dto.MetodoPagoResponseDTO;
import com.clandestock.backend.venta.service.MetodoPagoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/metodopago")
public class MetodoPagoController {

    private MetodoPagoService metodoPagoService;

    public MetodoPagoController (MetodoPagoService metodoPagoService) {
        this.metodoPagoService = metodoPagoService;
    }

    //Recibe id de local, y no obtiene de usuario porque el unico que va a agregar metodos de pago es el administrador
    //Es decir, va a tener que elegir a que local, por lo tanto se enviara ID de local.
    @PostMapping
    public ResponseEntity<?> insertarMetodoPago (@RequestBody MetodoPagoRequestDTO dto) {
        try{
            MetodoPagoResponseDTO response = metodoPagoService.insertarMetodoPago(dto);
            return ResponseEntity.ok(response);
        }
        catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<?> actualizarMetodoPago (@RequestBody MetodoPagoRequestDTO dto) {
        try {
            MetodoPagoResponseDTO response = metodoPagoService.actualizarMetodoPago(dto);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
