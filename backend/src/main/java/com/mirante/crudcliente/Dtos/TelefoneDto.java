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
        this.numero = aplicaMascaraTelefone(telefone.getNumero(), telefone.getTipoTelefoneEnum());
        this.tipoTelefoneEnum = telefone.getTipoTelefoneEnum();
    }

    private String aplicaMascaraTelefone(String telefone, TipoTelefoneEnum tipo){
        String telefoneComMascara = "";

        if(tipo.equals(TipoTelefoneEnum.CELULAR)){
            telefoneComMascara = String.format("(%s)%s-%s", 
                telefone.substring(0, 2), telefone.substring(2, 7), telefone.substring(7));
        }else{   
            telefoneComMascara = String.format("(%s)%s-%s", 
                telefone.substring(0, 2), telefone.substring(2, 6), telefone.substring(6));
        }
        
        return telefoneComMascara;
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