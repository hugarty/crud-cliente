package com.mirante.crudcliente.Entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Entity
public class Endereco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @NotNull
    @Size(min = 8, max = 8)
    @Digits(integer = 8, fraction = 0)
    String cep;
    @NotNull
    String logradouro;
    @NotNull
    String bairro;
    @NotNull
    String cidade;
    @NotNull
    String uf;
    
    String complemento;

    @OneToOne(mappedBy = "endereco")
    Cliente cliente;

    public Endereco (){
    }

    public Endereco(String cep, String logradouro, String bairro, String cidade, String uf, String complemento) {
        this.cep = cep;
        this.logradouro = logradouro;
        this.bairro = bairro;
        this.cidade = cidade;
        this.uf = uf;
        this.complemento = complemento;
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

}