package com.mirante.crudcliente.Exceptions.ExceptionHandlers;

import com.mirante.crudcliente.Exceptions.ClienteNaoAtualizadoException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ClienteExceptionHandler {

    @ExceptionHandler(ClienteNaoAtualizadoException.class)
    @ResponseStatus(code = HttpStatus.NOT_FOUND)
    public String atualizaClienteExceptionHandler (ClienteNaoAtualizadoException e){
        return "Cliente não foi encontrado";
    }    
}