package com.mirante.crudcliente.Controllers;

import java.util.List;

import javax.transaction.Transactional;
import javax.validation.Valid;

import com.mirante.crudcliente.Dtos.ClienteDto;
import com.mirante.crudcliente.Entities.Cliente;
import com.mirante.crudcliente.Services.ClienteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    @Autowired
    ClienteService clienteService;

    @CrossOrigin
    @GetMapping("oi")
    public String oi (){
        return "Foi e  voltou";
    }

    @CrossOrigin
    @GetMapping("lista")
    public ResponseEntity<List<ClienteDto>> getTodosClientes (){
        final List<ClienteDto> clientes = clienteService.getTodosClientes();
        return ResponseEntity.ok(clientes);
    }

    @CrossOrigin
    @PostMapping("adiciona")
    @Transactional
    public ResponseEntity<ClienteDto> criaNovoCliente(@RequestBody @Valid final Cliente cliente) {
        final ClienteDto clienteDto = clienteService.CriaNovoCliente(cliente);
        return ResponseEntity.ok(clienteDto);
    }

    @CrossOrigin
    @DeleteMapping("deleta/{id}")
    @Transactional
    public ResponseEntity<?> deletaCliente(@PathVariable Long id) {
        HttpStatus status = clienteService.deletaCliente(id);
        return ResponseEntity.status(status).build();
    }

    @CrossOrigin
    @PatchMapping("atualiza/{id}")
    @Transactional
    public ResponseEntity<ClienteDto> atualizaCliente(@PathVariable Long id,@RequestBody @Valid final Cliente cliente) {
        ClienteDto clienteDto = clienteService.atualizaCliente(id, cliente);
        return ResponseEntity.status(HttpStatus.OK).body(clienteDto);
    }
}