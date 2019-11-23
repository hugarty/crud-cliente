package com.mirante.crudcliente.Config;

import com.mirante.crudcliente.Config.Filtros.AutenticaUsuarioTokenFilter;
import com.mirante.crudcliente.Enums.PerfilEnum;
import com.mirante.crudcliente.Repositories.UsuarioRepository;
import com.mirante.crudcliente.Services.TokenJwtService;
import com.mirante.crudcliente.Services.UsuarioDetailsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class Seguranca extends WebSecurityConfigurerAdapter{

    @Autowired
    UsuarioDetailsService usuarioDetailsService;

    @Autowired
    TokenJwtService tokenJwtService;

    @Autowired
    UsuarioRepository usuarioRepository;
    
    @Override
    @Bean
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }
    
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(usuarioDetailsService).passwordEncoder(new BCryptPasswordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
        .antMatchers(HttpMethod.OPTIONS).permitAll()
        .antMatchers(HttpMethod.POST,"/login").permitAll()
        .antMatchers(HttpMethod.GET,"/cliente/oi").permitAll()
        .antMatchers(HttpMethod.POST,"/cliente/adiciona").hasAuthority(PerfilEnum.ADMIN.toString())
        .antMatchers(HttpMethod.DELETE,"/cliente/deleta/**").hasAuthority(PerfilEnum.ADMIN.toString())
        .antMatchers(HttpMethod.PATCH,"/cliente/atualiza/**").hasAuthority(PerfilEnum.ADMIN.toString())
        .anyRequest().authenticated()
        .and().csrf().disable().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and().addFilterBefore(new AutenticaUsuarioTokenFilter(tokenJwtService, usuarioRepository), UsernamePasswordAuthenticationFilter.class);
    }

}