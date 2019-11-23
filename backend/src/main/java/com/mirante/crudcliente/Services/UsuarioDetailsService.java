package com.mirante.crudcliente.Services;

import java.util.Optional;

import com.mirante.crudcliente.Entities.Autenticacao.Usuario;
import com.mirante.crudcliente.Repositories.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UsuarioDetailsService implements UserDetailsService {

    @Autowired
    UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Usuario> optionalUsuario= usuarioRepository.findByLogin(username);
        if (optionalUsuario.isPresent()){
            return optionalUsuario.get();
        }
        return null;
    }  
}