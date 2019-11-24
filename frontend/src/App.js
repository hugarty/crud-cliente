import React, { Component, Fragment } from 'react';
import './App.css';

import Cliente from './components/cliente/cliente'
import { listaClientes, removeTokenEPerfilDoLocalStorage, adicionaCliente, deletaCliente, atualizaCliente } from './services/ApiCrudCliente'
import Formulario from './components/formulario/formularioAdicionaCliente';

class App extends Component {
    constructor() {
        super()
        this.state = {
            clientes: '',
            ENUMmostraFormularioAdicao: 'nao-mostra-formulario-adicao',
            ENUMmostraFormularioAtualizacao: "nao-mostra-formulario-atualizacao",
            idClienteParaSerAtualizado: ''
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

    listaClientes = () => {
        if (this.state.clientes){
            return this.state.clientes.map(cliente => {
                return (
                    <div key={cliente.id}>
                        <button name={cliente.id} 
                            onClick={this.mostraFormularioAtualizacaoCliente}>
                                Altera Cliente {cliente.id}</button>
                        <Cliente
                            removeCliente={this.removeCliente.bind(this)} 
                            atributos={cliente}/>
                    </div>
                )
            }) 
        }
        return '';
    }

    fazLogout(){
        removeTokenEPerfilDoLocalStorage();
        this.props.history.push('/');
    }

    appendNovoCliente(cliente){
        adicionaCliente(cliente)
        .then(json => this.setState({clientes: [...this.state.clientes, json]}));
        
    }

    atualizaCliente(cliente){
        atualizaCliente(this.state.idClienteParaSerAtualizado, cliente)
        .then(json => {
            const novoArrayClientes = this.state.clientes.map((obj)=>{
                if(obj.id === parseInt(this.state.idClienteParaSerAtualizado)){
                    obj = json;
                }
                return obj
            })
            this.setState({clientes : novoArrayClientes});
            this.fechaFormularioAtualizacaoCliente();
        });
    }

    removeCliente(cliente){
        deletaCliente(cliente)
        .then(resp => {
            if(resp.ok){
                const novoArrayClientes = this.state.clientes.filter((obj)=> obj.id !== cliente);
                this.setState({clientes: novoArrayClientes})
            }
        })
    }

    mostraFormularioAdicaoCliente = () => {
        this.setState({ENUMmostraFormularioAdicao: "mostra-formulario-adicao"})
    }
    fechaFormularioAdicaoCliente = () => {
        this.setState({ENUMmostraFormularioAdicao: "nao-mostra-formulario-adicao"})
    }

    mostraFormularioAtualizacaoCliente = (e) => {
        this.setState({
            ENUMmostraFormularioAtualizacao: "mostra-formulario-atualizacao",
            idClienteParaSerAtualizado: e.target.name
        })
    }
    fechaFormularioAtualizacaoCliente = () => {
        this.setState({
            ENUMmostraFormularioAtualizacao: "nao-mostra-formulario-atualizacao",
            idClienteParaSerAtualizado: ''
        })
    }

    render() {
        return (
            <Fragment>
                <header>
                    <button onClick={this.mostraFormularioAdicaoCliente}>
                        Adicionar cliente
                    </button>
                    <button onClick={this.fazLogout.bind(this)}>
                        Logout
                    </button>
                </header>
                <div className={this.state.ENUMmostraFormularioAdicao}>
                    <button onClick={this.fechaFormularioAdicaoCliente}>
                        fechar
                    </button>
                    <Formulario titulo="adicionar" enviaJsonParaPai={this.appendNovoCliente.bind(this)} />
                </div>
                <div className={this.state.ENUMmostraFormularioAtualizacao}>
                    <button onClick={this.fechaFormularioAtualizacaoCliente}>
                        fechar
                    </button>
                    <Formulario titulo="atualizar" enviaJsonParaPai={this.atualizaCliente.bind(this)} />
                </div>
                {this.listaClientes()}                    
            </Fragment>
        );
    }
}

export default App;
