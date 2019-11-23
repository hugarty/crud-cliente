package com.mirante.crudcliente.Repositories;

import java.util.Optional;
import com.mirante.crudcliente.Entities.Autenticacao.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{ 

    Optional<Usuario> findByLogin(String login);
}