package com.fintrack.controller;

import com.fintrack.dto.TransactionDTO;
import com.fintrack.model.TransactionType;
import com.fintrack.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping
    public ResponseEntity<TransactionDTO> create(Authentication auth, @Valid @RequestBody TransactionDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(transactionService.create(auth.getName(), dto));
    }

    @GetMapping
    public ResponseEntity<List<TransactionDTO>> getAll(Authentication auth,
                                                         @RequestParam(required = false) TransactionType type) {
        if (type != null) {
            return ResponseEntity.ok(transactionService.getByType(auth.getName(), type));
        }
        return ResponseEntity.ok(transactionService.getAll(auth.getName()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TransactionDTO> update(Authentication auth, @PathVariable Long id,
                                                  @Valid @RequestBody TransactionDTO dto) {
        return ResponseEntity.ok(transactionService.update(auth.getName(), id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(Authentication auth, @PathVariable Long id) {
        transactionService.delete(auth.getName(), id);
        return ResponseEntity.noContent().build();
    }
}
