package com.mirante.crudcliente.Config.Filtros;

import java.io.IOException;
import java.util.Optional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mirante.crudcliente.Entities.Autenticacao.Usuario;
import com.mirante.crudcliente.Repositories.UsuarioRepository;
import com.mirante.crudcliente.Services.TokenJwtService;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

public class AutenticaUsuarioTokenFilter extends OncePerRequestFilter {

    TokenJwtService tokenService;
    UsuarioRepository usuarioRepository;

    public AutenticaUsuarioTokenFilter (TokenJwtService tokenService, UsuarioRepository usuarioRepository){
        this.tokenService = tokenService;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
            autenticaRequisicao(request);
            filterChain.doFilter(request, response);
    }

    private void autenticaRequisicao(HttpServletRequest request) {
        String token = getTokenFromRequest(request);
        boolean tokenValido = tokenService.verificaValidadeToken(token);
        if(tokenValido){
            Long idUsuario = tokenService.getIdUsuario(token);
            Optional<Usuario> optionalUsuario = usuarioRepository.findById(idUsuario);
            optionalUsuario.ifPresent(usuario -> autenticaUsuario(usuario));
        }
    }

    private void autenticaUsuario(Usuario usuario) {
        UsernamePasswordAuthenticationToken userAuthToken = new UsernamePasswordAuthenticationToken(
            usuario.getLogin(), null,usuario.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(userAuthToken);
    }

    private String getTokenFromRequest(HttpServletRequest request) {
        String value = request.getHeader("Authorization");
        String token = "";
        if(value != null)
            token = value.substring(7);
        return token;
    }
}