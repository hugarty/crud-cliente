package com.mirante.crudcliente.Services;

import java.util.stream.Collectors;

import com.mirante.crudcliente.Dtos.AutenticacaoDto;
import com.mirante.crudcliente.Dtos.Formularios.LoginFormulario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    TokenJwtService tokenService;

    public AutenticacaoDto doLogin(LoginFormulario loginForm){
        UsernamePasswordAuthenticationToken userAuthToken = new UsernamePasswordAuthenticationToken(loginForm.getLogin(), loginForm.getSenha());
        try {
            Authentication auth =  authenticationManager.authenticate(userAuthToken);
            String token = tokenService.geraToken(auth);
            String perfis = auth.getAuthorities().stream().map(s -> s.getAuthority()).collect(Collectors.joining(","));
            AutenticacaoDto autenticacaoDto = new AutenticacaoDto(token,perfis);
            return autenticacaoDto;
        }
        catch (AuthenticationException e){
            throw e;
        }
    }
}