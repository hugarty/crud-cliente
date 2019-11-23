package com.mirante.crudcliente.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableWebSecurity
public class Seguranca extends WebSecurityConfigurerAdapter{

     @Override
     protected void configure(HttpSecurity http) throws Exception {
         http.authorizeRequests()
            .antMatchers(HttpMethod.GET,"/cliente/oi").permitAll()
            .antMatchers(HttpMethod.POST,"/login").permitAll()
            .antMatchers(HttpMethod.POST, "/cliente/add").permitAll()
            .antMatchers(HttpMethod.OPTIONS).permitAll()
            .anyRequest().authenticated()
            .and().csrf().disable().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
     }
}