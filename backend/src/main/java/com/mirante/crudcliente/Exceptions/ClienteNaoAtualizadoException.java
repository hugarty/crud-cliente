package com.mirante.crudcliente.Exceptions;


public class ClienteNaoAtualizadoException extends RuntimeException{
    private static final long serialVersionUID = 1L;

    
    public ClienteNaoAtualizadoException (){
        super();
    }

    public ClienteNaoAtualizadoException (String arg){
        super(arg);
    }
}