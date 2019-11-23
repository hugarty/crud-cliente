package com.mirante.crudcliente.Services;

import java.util.Date;

import com.mirante.crudcliente.Entities.Autenticacao.Usuario;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class TokenJwtService {

    Long tempoValidadeTokenMinutos = 100l;
    String nomeProjeto = "CRUD-cliente";
    String senhaBaseToken = "H]ass3fe32AQ[VB}?=5t33PL6ktF@{YZe5Jp](mXK7u8}<?Mg[sQj(=QvvaT4fkN";

    public String geraToken(Authentication auth){
        Usuario usuario = (Usuario) auth.getPrincipal();
        Date agora = new Date();
        Date dataExpiracao = geraDataDeExpiracao(agora, tempoValidadeTokenMinutos);
        String token = Jwts.builder()
            .setIssuer(nomeProjeto)
            .setSubject(usuario.getId().toString())
            .setIssuedAt(agora)
            .setExpiration(dataExpiracao)
            .signWith(SignatureAlgorithm.HS256, senhaBaseToken)
            .compact();
        return token;
    }

    public boolean verificaValidadeToken(String token){
        try {
            Jwts.parser().setSigningKey(senhaBaseToken).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Long getIdUsuario(String token) {
        Jws<Claims> claim = Jwts.parser().setSigningKey(senhaBaseToken).parseClaimsJws(token);
		return Long.parseLong(claim.getBody().getSubject());
	}

    private Date geraDataDeExpiracao (Date dataInicial, Long minutos){
        minutos = transformaMilissegundosEmMinutos(minutos);
        return new Date((Long)(dataInicial.getTime() + minutos));
    }

    private Long transformaMilissegundosEmMinutos(Long mili){
        return mili*1000*60;
    }
}