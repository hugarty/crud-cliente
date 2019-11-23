package com.mirante.crudcliente.Dtos.Formularios;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class LoginFormulario {

    @NotNull
    @NotEmpty
    String login;

    @NotNull
    @NotEmpty
    String senha;

    public LoginFormulario() {
    }

    public LoginFormulario(String login, String senha) {
        this.login = login;
        this.senha = senha;
    }

    public String getLogin() {
        return this.login;
    }

    public String getSenha() {
        return this.senha;
    }

    @Override
    public String toString() {
        return "{" +
            " login='" + getLogin() + "'" +
            ", senha='" + getSenha() + "'" +
            "}";
    }

}