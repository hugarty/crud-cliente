package com.mirante.crudcliente.Dtos;


public class AutenticacaoDto {

    TokenDto tokenDto;
    String perfil;

    public AutenticacaoDto (){
    }

    public AutenticacaoDto (String token, String perfil){
        this.tokenDto = new TokenDto(token);
        this.perfil= perfil;
    }

    public String getPerfil() {
        return perfil;
    }

    public TokenDto getTokenDto() {
        return tokenDto;
    }

    

    class TokenDto {
        String token;
        String tipo;

        public TokenDto(){
        }

        
        public TokenDto(String token){
            this.token = token;
            this.tipo = "Bearer";
        }

        public String getTipo() {
            return tipo;
        }

        public String getToken() {
            return token;
        }
    }
}