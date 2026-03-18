package com.udea.banco2026.service;

import com.udea.banco2026.DTO.TransactionDTO;
import com.udea.banco2026.entity.Transaction;
import com.udea.banco2026.repository.TransactionRepository;
import com.udea.banco2026.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import java.time.LocalDateTime;

import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private CustomerRepository customerRepository;

    // Crear transacción
    public Transaction createTransaction(Transaction transaction) {
        transaction.setDateTime(LocalDateTime.now());
        return transactionRepository.save(transaction);
    }

    // Obtener todas las transacciones
    public List<Transaction> getTransactions() {
        return transactionRepository.findAll();
    }

    public List<Transaction> getTransactionsByAccount(String accountNumber) {

        return transactionRepository
                .findBySenderAccountNumberOrReceiverAccountNumber(
                        accountNumber,
                        accountNumber
                );
    }

    // Obtener por ID
    public Transaction getTransactionById(Long id) {
        return transactionRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Transaction not found"));
    }

    // Actualizar transacción
    public Transaction updateTransaction(Long id, Transaction updatedTransaction) {

        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Transaction not found"));

        transaction.setSenderAccountNumber(updatedTransaction.getSenderAccountNumber());
        transaction.setReceiverAccountNumber(updatedTransaction.getReceiverAccountNumber());
        transaction.setAmount(updatedTransaction.getAmount());

        return transactionRepository.save(transaction);
    }


    // Eliminar transacción
    public void deleteTransaction(Long id) {

        if (!transactionRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Transaction not found");
        }

        transactionRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return transactionRepository.existsById(id);
    }

    public Transaction transfer(Transaction transaction) {

        var sender = customerRepository
                .findByAccountNumber(transaction.getSenderAccountNumber())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cuenta origen no existe"));

        var receiver = customerRepository
                .findByAccountNumber(transaction.getReceiverAccountNumber())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cuenta destino no existe"));

        if (sender.getBalance() < transaction.getAmount()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Fondos insuficientes");
        }

        // Restar dinero al emisor
        sender.setBalance(sender.getBalance() - transaction.getAmount());

        // Sumar dinero al receptor
        receiver.setBalance(receiver.getBalance() + transaction.getAmount());

        // Guardar cambios
        customerRepository.save(sender);
        customerRepository.save(receiver);

        // Guardar la transacción
        transaction.setDateTime(LocalDateTime.now());

        return transactionRepository.save(transaction);
    }

}