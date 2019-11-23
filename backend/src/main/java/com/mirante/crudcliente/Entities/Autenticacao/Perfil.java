package com.mirante.crudcliente.Entities.Autenticacao;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.mirante.crudcliente.Enums.PerfilEnum;

import org.springframework.security.core.GrantedAuthority;

@Entity
public class Perfil implements GrantedAuthority{

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Enumerated(EnumType.STRING)
    PerfilEnum perfilEnum;

    @ManyToMany(mappedBy = "perfis")
    List<Usuario> usuario;

    @Override
    public String getAuthority() {
        return perfilEnum.name();
    }


    public Long getId() {
        return this.id;
    }

    public PerfilEnum getPerfilEnum() {
        return this.perfilEnum;
    }

    public void setPerfilEnum(PerfilEnum perfilEnum) {
        this.perfilEnum = perfilEnum;
    }

    public List<Usuario> getUsuario() {
        return this.usuario;
    }

    public void setUsuario(List<Usuario> usuario) {
        this.usuario = usuario;
    }
}