package com.mirante.crudcliente.Controllers;

import javax.validation.Valid;

import com.mirante.crudcliente.Dtos.AutenticacaoDto;
import com.mirante.crudcliente.Dtos.Formularios.LoginFormulario;
import com.mirante.crudcliente.Services.LoginService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    LoginService loginService;

    @PostMapping
    @ResponseBody
    public ResponseEntity<AutenticacaoDto> doLogin(@RequestBody @Valid LoginFormulario loginForm){
        AutenticacaoDto autenticacaoDto = loginService.doLogin(loginForm);
        return ResponseEntity.ok(autenticacaoDto);
    }
}