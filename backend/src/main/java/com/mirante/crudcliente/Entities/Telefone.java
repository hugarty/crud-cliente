package com.mirante.crudcliente.Entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.mirante.crudcliente.Enums.TipoTelefoneEnum;

@Entity
public class Telefone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @NotNull
    @Size(min = 10)
    String numero;

    @Enumerated(EnumType.STRING)
    TipoTelefoneEnum tipoTelefoneEnum;

    @ManyToMany(mappedBy = "telefones")
    List<Cliente> clientes = new ArrayList<>();


    public Telefone() {
    }

    public Telefone(String numero, TipoTelefoneEnum tipoTelefoneEnum) {
        this.numero = numero;
        this.tipoTelefoneEnum = tipoTelefoneEnum;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumero() {
        return this.numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public TipoTelefoneEnum getTipoTelefoneEnum() {
        return this.tipoTelefoneEnum;
    }

    public void setTipoTelefoneEnum(TipoTelefoneEnum tipoTelefoneEnum) {
        this.tipoTelefoneEnum = tipoTelefoneEnum;
    }

    public List<Cliente> getClientes() {
        return this.clientes;
    }

    public void setClientes(List<Cliente> clientes) {
        this.clientes = clientes;
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", numero='" + getNumero() + "'" +
            ", tipoTelefoneEnum='" + getTipoTelefoneEnum() + "'" +
            ", clientes='" + getClientes() + "'" +
            "}";
    }

}