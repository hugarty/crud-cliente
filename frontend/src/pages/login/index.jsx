import React, {useState} from 'react';

import './index.css'
import {fazLogin, salvaTokenEPerfilNoLocalStorage} from '../../services/ApiCrudCliente'

export default function Login ({history}) {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [erroMsg, setMessage] = useState('');

    const handleSubmit = e =>{
        e.preventDefault();
        fazLogin({login:login, senha:senha})
            .then(json => {
                salvaTokenEPerfilNoLocalStorage(json);
                history.push('/home');
            })
            .catch(() =>{
                setMessage("Login ou senha incorretos");
            })
    }

    return(
        <form onSubmit={handleSubmit}>
            <fieldset>
                <span>{erroMsg}</span>
                <legend>Logar</legend>
                <label htmlFor="login">Nome de usuario</label>
                <input type="text" name="email" required
                    onChange={e => setLogin(e.target.value)}/>

                <label htmlFor="senha">Senha</label>
                <input type="password" name="senha" required
                    onChange={e => setSenha(e.target.value)}/>

                <button type="submit">Login</button>
            </fieldset>
        </form>
    )
}

