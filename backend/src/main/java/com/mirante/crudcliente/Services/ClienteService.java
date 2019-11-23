package com.mirante.crudcliente.Services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.mirante.crudcliente.Dtos.ClienteDto;
import com.mirante.crudcliente.Entities.Cliente;
import com.mirante.crudcliente.Exceptions.ClienteNaoAtualizadoException;
import com.mirante.crudcliente.Repositories.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class ClienteService {

    @Autowired
    ClienteRepository clienteRepository;

    public ClienteDto CriaNovoCliente(final Cliente cliente){
        clienteRepository.save(cliente);
        return ClienteDto.parseToDto(cliente);
    }

    public List<ClienteDto> getTodosClientes (){
        final List<Cliente> clientes = clienteRepository.findAll();
        final List<ClienteDto> clientesDto = clientes.stream()
            .map(cliente-> ClienteDto.parseToDto(cliente))
            .collect(Collectors.toList());
        return clientesDto;
    }

	public HttpStatus deletaCliente(final Long id) {
        final Optional<Cliente> optionalCliente = clienteRepository.findById(id);
        if(optionalCliente.isPresent()){
            clienteRepository.delete(optionalCliente.get());
            return HttpStatus.OK;
        }
        return HttpStatus.NOT_FOUND;
	}

	public ClienteDto atualizaCliente(final Long id, final Cliente novoCliente) {
        Optional<Cliente> optional = clienteRepository.findById(id);
        if(optional.isPresent()){
            Cliente cliente = optional.get();
            cliente.atualizaCliente(novoCliente);
            clienteRepository.save(cliente);
            return ClienteDto.parseToDto(cliente);
        }
        throw new ClienteNaoAtualizadoException();
	}
}