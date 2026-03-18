package com.udea.banco2026.mapper;

import com.udea.banco2026.DTO.CustomerDTO;
import com.udea.banco2026.entity.Customer;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
@Mapper(componentModel = "spring")
public interface CustomerMapper {
    CustomerMapper INSTANCE = Mappers.getMapper(CustomerMapper.class);
    CustomerDTO toDTO(Customer customer);
    Customer toEntity(CustomerDTO customerDTO);
}
