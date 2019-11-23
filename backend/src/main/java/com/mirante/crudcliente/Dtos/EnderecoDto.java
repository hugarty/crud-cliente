package com.mirante.crudcliente.Dtos;

import com.mirante.crudcliente.Entities.Endereco;

/**
 * EnderecoDto
 */
public class EnderecoDto {

    Long id;
    String cep;
    String logradouro;
    String bairro;
    String cidade;
    String uf;
    String complemento;

    public EnderecoDto(Endereco endereco) {
        this.id = endereco.getId();
        this.cep = aplicaMascaraCEP(endereco.getCep());
        this.logradouro = endereco.getLogradouro();
        this.bairro = endereco.getBairro();
        this.cidade = endereco.getCidade();
        this.uf = endereco.getUf();
        this.complemento = endereco.getComplemento();
    }

    public static EnderecoDto parseToDto(Endereco endereco) {
        EnderecoDto clienteDto = new EnderecoDto(endereco);
        return clienteDto;
    }

    public Long getId() {
        return this.id;
    }

    public String getCep() {
        return this.cep;
    }

    public String getLogradouro() {
        return this.logradouro;
    }

    public String getBairro() {
        return this.bairro;
    }

    public String getCidade() {
        return this.cidade;
    }

    public String getUf() {
        return this.uf;
    }

    public String getComplemento() {
        return this.complemento;
    }

    private String aplicaMascaraCEP(String cep){
        String cepComMascara = String.format("%s-%s", 
            cep.substring(0, 6),cep.substring(6));
        return cepComMascara;
    }

}