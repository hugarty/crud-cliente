import React, { Component, Fragment } from 'react';
import './App.css';

import Cliente from './components/cliente/cliente'
import { listaClientes, removeTokenEPerfilDoLocalStorage } from './services/ApiCrudCliente'
import Formulario from './components/formulario/formularioAdicionaCliente';

class App extends Component {
    constructor() {
        super()
        this.state = {
            clientes: ''
        }
    }

    componentDidMount() {
        listaClientes()
            .then(json => {
                this.setState({clientes:json})
            })
            .catch( any => {
                alert("Não consegui pegar os clientes no servidor backend.\nVou te enviar para a tela de login.")
                this.props.history.push('/');
            })
    }

    fazLogout(){
        removeTokenEPerfilDoLocalStorage();
        this.props.history.push('/');
    }

    render() {
        return (
            <Fragment>
                <header>
                    <button>
                        Adicionar cliente
                    </button>
                    <button onClick={this.fazLogout.bind(this)}>
                        Logout
                    </button>
                </header>
                <Formulario />
                { (this.state.clientes) ? 
                    this.state.clientes.map(cliente => <Cliente key={cliente.id} atributos={cliente}/>): ''}
            </Fragment>
        );
    }
}

export default App;
