package com.mirante.crudcliente.Entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @NotNull
    @Size(min = 3, max = 100)
    String nome;

    @NotNull
    @Size(min = 10, max = 12)
    String cpf;

    @Size(min=1)
    @OneToMany(cascade = CascadeType.ALL)
    List<ClienteEmail> clienteEmail= new ArrayList<>();

    @Size(min=1)
    @ManyToMany(cascade = CascadeType.ALL)
    List<Telefone> telefones = new ArrayList<>();

    @NotNull
    @OneToOne(cascade = CascadeType.ALL)
    Endereco endereco;

    public Cliente() {
    }

    public Cliente(String nome, String cpf, List<ClienteEmail> email, List<Telefone> telefones, Endereco endereco) {
        this.nome = nome;
        this.cpf = cpf;
        this.clienteEmail = email;
        this.telefones = telefones;
        this.endereco = endereco;
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

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return this.cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public List<ClienteEmail> getEmail() {
        return this.clienteEmail;
    }

    public void setEmail(List<ClienteEmail> email) {
        this.clienteEmail  = email;
    }

    public List<Telefone> getTelefones() {
        return this.telefones;
    }

    public void setTelefones(List<Telefone> telefones) {
        this.telefones = telefones;
    }

    public Endereco getEndereco() {
        return this.endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", nome='" + getNome() + "'" +
            ", cpf='" + getCpf() + "'" +
            ", email='" + getEmail() + "'" +
            ", telefones='" + getTelefones() + "'" +
            ", endereco='" + getEndereco() + "'" +
            "}";
    }
}