package com.udea.banco2026.controller;

import com.udea.banco2026.entity.Transaction;
import com.udea.banco2026.service.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    // Obtener todas las transacciones
    @GetMapping
    public List<Transaction> getTransactions() {
        return transactionService.getTransactions();
    }

    // Obtener transacción por ID
    @GetMapping("/{id}")
    public Transaction getTransactionById(@PathVariable Long id) {
        return transactionService.getTransactionById(id);
    }
    @GetMapping("/account/{accountNumber}")
    public List<Transaction> getTransactionsByAccount(@PathVariable String accountNumber) {

        return transactionService.getTransactionsByAccount(accountNumber);
    }

    @PostMapping("/transfer")
    public Transaction transfer(@RequestBody Transaction transaction) {
        return transactionService.transfer(transaction);
    }
    // Crear transacción
    @PostMapping
    public Transaction createTransaction(@RequestBody Transaction transaction) {
        return transactionService.createTransaction(transaction);
    }

    // Actualizar transacción
    @PutMapping("/{id}")
    public Transaction updateTransaction(@PathVariable Long id, @RequestBody Transaction transaction) {
        return transactionService.updateTransaction(id, transaction);
    }

    // Eliminar transacción
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<String> deleteTransaction(@PathVariable Long id) {

        if (!transactionService.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Transaction not found");
        }

        transactionService.deleteTransaction(id);
        return ResponseEntity.ok("Transaction deleted successfully");
    }
}