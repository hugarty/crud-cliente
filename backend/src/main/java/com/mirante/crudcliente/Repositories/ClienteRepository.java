package com.mirante.crudcliente.Repositories;

import com.mirante.crudcliente.Entities.Cliente;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long>{

    
}