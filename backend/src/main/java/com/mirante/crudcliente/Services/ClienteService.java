package com.mirante.crudcliente.Services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.mirante.crudcliente.Dtos.ClienteDto;
import com.mirante.crudcliente.Entities.Cliente;
import com.mirante.crudcliente.Repositories.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class ClienteService {

    @Autowired
    ClienteRepository clienteRepository;

    public ClienteDto CriaNovoCliente(Cliente cliente){
        clienteRepository.save(cliente);
        return ClienteDto.parseToDto(cliente);
    }

    public List<ClienteDto> getTodosClientes (){
        List<Cliente> clientes = clienteRepository.findAll();
        List<ClienteDto> clientesDto = clientes.stream()
            .map(cliente-> ClienteDto.parseToDto(cliente))
            .collect(Collectors.toList());
        return clientesDto;
    }

	public HttpStatus deletaCliente(Long id) {
        Optional<Cliente> optionalCliente = clienteRepository.findById(id);
        if(optionalCliente.isPresent()){
            clienteRepository.delete(optionalCliente.get());
            return HttpStatus.OK;
        }
        return HttpStatus.NOT_FOUND;
	}
}