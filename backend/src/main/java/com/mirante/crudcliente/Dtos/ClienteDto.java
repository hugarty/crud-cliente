package com.mirante.crudcliente.Dtos;

import java.util.List;
import java.util.stream.Collectors;

import com.mirante.crudcliente.Entities.Cliente;

public class ClienteDto{

    Long id;
    String nome;
    String cpf;
    List<String> email;
    List<TelefoneDto> telefones;
    EnderecoDto endereco;
    

    public ClienteDto(Cliente cliente) {
        this.id = cliente.getId();
        this.nome = cliente.getNome();
        this.cpf = aplicaMascaraCPF(cliente.getCpf());
        this.email = cliente.getEmail().stream()
            .map(email -> email.getEmail()).collect(Collectors.toList());
        this.telefones = cliente.getTelefones().stream()
            .map(telefone -> TelefoneDto.parseToDto(telefone))
            .collect(Collectors.toList());
        this.endereco = EnderecoDto.parseToDto(cliente.getEndereco());
    }

    public static ClienteDto parseToDto(Cliente cliente) {
        ClienteDto clienteDto = new ClienteDto(cliente);
        return clienteDto;
    }


    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public String getCpf() {
        return this.cpf;
    }

    public List<String> getEmail() {
        return this.email;
    }

    public List<TelefoneDto> getTelefones() {
        return this.telefones;
    }

    public EnderecoDto getEndereco() {
        return this.endereco;
    }

    private String aplicaMascaraCPF(String cpf){
        String cpfComMascara = String.format("%s.%s.%s-%s", 
            cpf.substring(0, 3),cpf.substring(3, 6),cpf.substring(6, 9),cpf.substring(9));
        return cpfComMascara;
    }
}