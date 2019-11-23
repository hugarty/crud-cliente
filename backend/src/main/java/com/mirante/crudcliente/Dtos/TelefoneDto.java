package com.mirante.crudcliente.Dtos;

import com.mirante.crudcliente.Entities.Telefone;
import com.mirante.crudcliente.Enums.TipoTelefoneEnum;

public class TelefoneDto {

    Long id;
    String numero;
    TipoTelefoneEnum tipoTelefoneEnum;

    public TelefoneDto(){

    }

    public TelefoneDto(Telefone telefone) {
        this.id = telefone.getId();
        this.numero = telefone.getNumero();
        this.tipoTelefoneEnum = telefone.getTipoTelefoneEnum();
    }

    public static TelefoneDto parseToDto(Telefone telefone) {
        TelefoneDto telefoneDto = new TelefoneDto(telefone);
        return telefoneDto;
    }

    public Long getId() {
        return this.id;
    }

    public String getNumero() {
        return this.numero;
    }

    public TipoTelefoneEnum getTipoTelefoneEnum() {
        return this.tipoTelefoneEnum;
    }
}