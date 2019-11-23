import React, { Component, Fragment } from 'react';
import './App.css';

import Cliente from './components/cliente'
import { listaClientes } from './services/ApiCrudCliente'

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
                console.log("oi",json)
                this.setState({clientes:json})
            })
            .catch()
    }

    render() {
        return (
            <Fragment>
                <p>header - add novo cliente - logout</p>
                { (this.state.clientes) ? 
                    this.state.clientes.map(cliente => <Cliente key={cliente.id} atributos={cliente}/>): ''}
            </Fragment>
        );
    }
}

export default App;
