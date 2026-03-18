package com.udea.banco2026.service;

import com.udea.banco2026.DTO.CustomerDTO;
import com.udea.banco2026.entity.Customer;
import com.udea.banco2026.mapper.CustomerMapper;
import com.udea.banco2026.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    @Autowired
    public CustomerService(CustomerRepository customerRepository,
                           CustomerMapper customerMapper) {
        this.customerRepository = customerRepository;
        this.customerMapper = customerMapper;
    }

    // Obtener todos los clientes
    public List<CustomerDTO> getAllCustomer() {
        return customerRepository.findAll()
                .stream()
                .map(customerMapper::toDTO)
                .toList();
    }

    // Obtener cliente por ID
    public CustomerDTO getCustomerById(Long id) {
        return customerRepository.findById(id)
                .map(customerMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
    }

    // Crear cliente
    public CustomerDTO createCustomer(CustomerDTO customerDTO) {
        Customer customer = customerMapper.toEntity(customerDTO);
        return customerMapper.toDTO(customerRepository.save(customer));
    }

    // Actualizar cliente
    public CustomerDTO updateCustomer(Long id, CustomerDTO dto) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente no encontrado"));

        // Actualizar datos
        customer.setFirstName(dto.getFirstName());
        customer.setLastName(dto.getLastName());
        customer.setAccountNumber(dto.getAccountNumber());
        customer.setBalance(dto.getBalance());

        Customer updated = customerRepository.save(customer);

        // Convertir a DTO (IMPORTANTE)
        return new CustomerDTO(
                updated.getId(),
                updated.getFirstName(),
                updated.getLastName(),
                updated.getAccountNumber(),
                updated.getBalance()
        );
    }

    // Eliminar cliente
    public void deleteCustomer(Long id) {

        if (!customerRepository.existsById(id)) {
            throw new RuntimeException("Customer not found");
        }

        customerRepository.deleteById(id);
    }
}