import React, { Component, Fragment } from 'react';
import './App.css';

import Cliente from './components/cliente/cliente'
import { listaClientes, removeTokenEPerfilDoLocalStorage, adicionaCliente, deletaCliente, atualizaCliente, ehAdministrador } from './services/ApiCrudCliente'
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
                alert("Não foi possível pegar os clientes no servidor backend.\nVou te enviar para a tela de login.")
                this.props.history.push('/');
            })
    }

    listaClientes = () => {
        if (this.state.clientes){
            return this.state.clientes.map(cliente => {
                return (
                    <div className="cliente" key={cliente.id}>
                        <div className="editar-img">
                            <div className="editar-logo-texto"
                                onClick={() => {
                                    const idCliente = cliente.id;
                                    this.mostraFormularioAtualizacaoCliente(idCliente)
                                }} >
                                <img alt="Atualizar o cliente" src={require('./icons/edit.png')} />
                                <span>Editar</span>
                            </div>
                        </div>
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
        .then(json => {
            this.setState({clientes: [...this.state.clientes, json]})
            this.fechaFormularioAdicaoCliente();
        })
        .catch(()=> ehAdministrador("Não foi possível adicionar o cliente.\n\n\nTente fazer login novamente"));
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
        })
        .catch(()=> ehAdministrador("Não foi possível atualizar o cliente.\n\n\nTente fazer login novamente"));
    }

    removeCliente(cliente){
        deletaCliente(cliente)
        .then(resp => {
            if(resp.ok){
                const novoArrayClientes = this.state.clientes.filter((obj)=> obj.id !== cliente);
                this.setState({clientes: novoArrayClientes})
            }
        })
        .catch(() => ehAdministrador("Não foi possível remover o cliente.\n\n\nTente fazer login novamente"))
    }

    mostraFormularioAdicaoCliente = () => {
        this.setState({ENUMmostraFormularioAdicao: "mostra-formulario-adicao"})
    }
    fechaFormularioAdicaoCliente = () => {
        this.setState({ENUMmostraFormularioAdicao: "nao-mostra-formulario-adicao"})
    }

    mostraFormularioAtualizacaoCliente = (cliente) => {
        this.setState({
            ENUMmostraFormularioAtualizacao: "mostra-formulario-atualizacao",
            idClienteParaSerAtualizado: cliente
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
                    <button className="adicion-cliente" onClick={this.mostraFormularioAdicaoCliente}>
                        <img alt="Adicionar cliente" src={require('./icons/plus.png')} />
                        <span>Adicionar cliente</span>
                    </button>
                    <button onClick={this.fazLogout.bind(this)}>
                        Logout
                    </button>
                </header>
                <div className="container">
                    <div className={`${this.state.ENUMmostraFormularioAdicao} formulario`}>
                        <button onClick={this.fechaFormularioAdicaoCliente}>
                           FECHAR
                        </button>
                        <div>
                            <Formulario titulo="adicionar" enviaJsonParaPai={this.appendNovoCliente.bind(this)} />
                        </div>
                    </div>
                    <div className={`${this.state.ENUMmostraFormularioAtualizacao} formulario`}>
                        <button onClick={this.fechaFormularioAtualizacaoCliente}>
                            FECHAR
                        </button>
                        <div>
                            <Formulario titulo="atualizar" enviaJsonParaPai={this.atualizaCliente.bind(this)} />
                        </div>
                    </div>
                    {this.listaClientes()}    
                </div>               
            </Fragment>
        );
    }
}

export default App;
