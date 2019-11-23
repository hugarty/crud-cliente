package com.mirante.crudcliente.Entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Entity
public class ClienteEmail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @NotNull
    @Email
    String email;

    @ManyToOne
    Cliente cliente;
    
    public ClienteEmail() {
    }

    public ClienteEmail(String email) {
        this.email = email;
    }

    public Long getId() {
        return this.id;
    }

    public String getEmail() {
        return this.email;
    }
}