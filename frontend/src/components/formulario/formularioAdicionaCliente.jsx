import React, {Component} from 'react'

import './formulario.css'
import Email from './email/email'
import {mascaraCPF, mascaraCEP, apenasDigitos, retiraMascaraTelefones} from '../../utils/utils'
import {getCEP} from '../../services/viacep'
import Telefone from './telefone/telefone'


class Formulario extends Component {
    constructor() {
        super()
        this.state = {
            nome: "",
            cpf: "",
            email:[],
            telefones:[],
            endereco:{
                cep:"",
                logradouro:"",
                bairro:"",
                cidade:"",
                uf:"",
                complemento:""
            },
            html :{
                mostraEnderecoCompleto: 'endereco'
            }
        }
    }
 
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleChangeCPF = event => {
        this.setState({ [event.target.name]: mascaraCPF(event.target.value) })
    }

    handleChangeEndereco = (event, mascaraParaCEP) =>{
        if(mascaraParaCEP){
            const cpfComMascara = mascaraCEP(event.target.value);
            this.setState({ endereco :{...this.state.endereco, [event.target.name]:cpfComMascara}})
            if(cpfComMascara.length === 9){
                getCEP(cpfComMascara)
                .then(this.populaComAPIEMostraEndereco);
            }
        }
        else
            this.setState({ endereco :{...this.state.endereco, [event.target.name]: (event.target.value)}})
    }

    populaComAPIEMostraEndereco = json =>{
        this.setState({html : {
            mostraEnderecoCompleto: 'endereco'
        }})
        if(!json.erro){
            this.setState({ endereco : {
                ...this.state.endereco,
                logradouro:json.logradouro,
                bairro:json.bairro,
                cidade:json.localidade,
                uf:json.uf
                },
                html : {
                    mostraEnderecoCompleto: 'endereco-completo'
                }
            })
        }
    }

    getEmails (emails){
        this.setState({email: emails})
    }
    
    getTelefones (telefones){
        this.setState({telefones: telefones})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let json = {}
        json.nome = this.state.nome;
        json.cpf = apenasDigitos(this.state.cpf);
        json.email = this.state.email;
        json.telefones = retiraMascaraTelefones(this.state.telefones);
        json.endereco = {
            bairro : this.state.endereco.bairro,
            cep : apenasDigitos(this.state.endereco.cep),
            cidade : this.state.endereco.cidade,
            complemento : this.state.endereco.complemento,
            logradouro : this.state.endereco.logradouro,
            uf : this.state.endereco.uf,
        }
        this.props.enviaJsonParaPai(json);
        this.limpaFormulario();
    }
    
    limpaFormulario(){
        this.setState({
            nome: "",
            cpf: "",
            email:[],
            telefones:[],
            endereco:{
                cep:"",
                logradouro:"",
                bairro:"",
                cidade:"",
                uf:"",
                complemento:""
            }
        })
    }

    render(){
        return (
        <form onSubmit={this.handleSubmit}>
            <h1>Formulário para {this.props.titulo} cliente</h1>
            <label htmlFor="nome">Nome do cliente</label>
            <input type="text" name="nome" minLength="3" maxLength="100" required
                value={this.state.nome}
                onChange={this.handleChange}/>
            <label htmlFor="cpf">CPF </label>
            <input type="text" name="cpf"  minLength="14" required
                value={this.state.cpf}  
                onChange={this.handleChangeCPF}/>
            <Email teste={this.state.teste}getEmails={this.getEmails.bind(this)}/>
            <Telefone getTelefones={this.getTelefones.bind(this)}/>
            <section>
                <legend>Endereço</legend>
                <label htmlFor="cep">cep</label>
                <input type="text" name="cep" required minLength="9"
                    value={this.state.endereco.cep} 
                    onChange={e => this.handleChangeEndereco(e, true)}/>
                <div className={this.state.html.mostraEnderecoCompleto}>
                    <label htmlFor="uf">uf</label>
                    <input type="text" name="uf" required
                        value={this.state.endereco.uf}  
                        onChange={this.handleChangeEndereco}/>

                    <label htmlFor="cidade">Cidade</label>
                    <input type="text" name="cidade" required
                        value={this.state.endereco.cidade}  
                        onChange={this.handleChangeEndereco}/>

                    <label htmlFor="logradouro">Logradouro</label>
                    <input type="text" name="logradouro" required
                        value={this.state.endereco.logradouro}  
                        onChange={this.handleChangeEndereco}/>

                    <label htmlFor="bairro">Bairro</label>
                    <input type="text" name="bairro" required
                        value={this.state.endereco.bairro}  
                        onChange={this.handleChangeEndereco}/>

                    <label htmlFor="complemento">Complemento</label>
                    <input type="text" name="complemento" onChange={this.handleChangeEndereco}/>
                </div>
            </section>
            <button type="submit">enviar</button>
        </form>
        )
    }
}

export default Formulario;