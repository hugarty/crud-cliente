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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    @Autowired
    ClienteService clienteService;

    @GetMapping("oi")
    @ResponseBody
    public String oi (){
        return "Foi e  voltou";
    }

    @GetMapping("lista")
    @ResponseBody
    public ResponseEntity<List<ClienteDto>> getTodosClientes (){
        List<ClienteDto> clientes = clienteService.getTodosClientes();
        return ResponseEntity.ok(clientes);
    }
    
    @PostMapping("adiciona")
    @ResponseBody
    @Transactional
    public ResponseEntity<ClienteDto> criaNovoCliente (@RequestBody @Valid Cliente cliente){
        ClienteDto clienteDto = clienteService.CriaNovoCliente(cliente);
        return ResponseEntity.ok(clienteDto);
    }

    @DeleteMapping("deleta/{id}")
    @Transactional
    public ResponseEntity<?> deletaCliente(@PathVariable Long id){
        HttpStatus status= clienteService.deletaCliente(id);
        return ResponseEntity.status(status).build();
    }
}