import React, {Component} from 'react'

import './formulario.css'
import {mascaraCPF, mascaraCEP, apenasDigitos, retiraMascaraTelefones,mascaraCelular, mascaraTelefone, mascaraNome, erroHandler} from '../../utils/utils'
import {getCEP} from '../../services/viacep'

class Formulario extends Component {
    constructor() {
        super()
        this.state = {
            nome: "",
            cpf: "",
            email:[""],
            telefones : [{
                numero:'', 
                tipoTelefoneEnum:'CELULAR'}],
            endereco:{
                cep:"",
                logradouro:"",
                bairro:"",
                cidade:"",
                uf:"",
                complemento:""
            },
            html :{
                mostraEnderecoCompleto: 'endereco',
                mostraWarning: "esconde-warning-png"
            }
        }
    }
 
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }
    
    handleChangeNome = event => {
        this.setState({ [event.target.name]: mascaraNome(event.target.value) })
    }

    handleChangeCPF = event => {
        this.setState({ [event.target.name]: mascaraCPF(event.target.value) })
    }

    handleChangeEndereco = (event, mascaraParaCEP) =>{
        if(mascaraParaCEP){
            const cepComMascara = mascaraCEP(event.target.value);
            this.setState({ endereco :{...this.state.endereco, [event.target.name]:cepComMascara}})
            if(cepComMascara.length === 9){
                this.setState({html:{...this.state.html, mostraWarning: "mostra-warning-png"}});
                getCEP(cepComMascara)
                .then(this.populaComAPIEMostraEndereco);
            }
        }
        else
            this.setState({ endereco :{...this.state.endereco, [event.target.name]: (event.target.value)}})
    }

    populaComAPIEMostraEndereco = json =>{
        this.setState({html : {...this.state.html,
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
                    mostraEnderecoCompleto: 'endereco-completo',
                    mostraWarning: "esconde-warning-png"
                }
            })
        }
    }

    getTelefones (telefones){
        this.setState({telefones: telefones})
    }

    handleChangeEmail = (e) => {
        const posicao = parseInt(e.target.name);
        const emailsAlterado = this.state.email.map((obj,index)=>{
            if(index === posicao){
                obj = e.target.value;
            }
            return obj;
        })
        this.setState({email: emailsAlterado})
    }

    geraEmails = () =>{
        return this.state.email.map((obj, index)=>(
            <input key={index} name={index} type="email" required
                value={this.state.email[index]}
                onChange={this.handleChangeEmail}/>
            )
        )
    }
    
    adicionaEmail = () =>{
        this.setState({email :[...this.state.email,""]})
    }
    
    removeEmail = () =>{
        if(this.state.email.length > 1){
            let novosEmails = this.state.email.map(t=>t);
            novosEmails.pop()
            this.setState({email : novosEmails})
        }
    }

    handleChangeNumero = (e) => {
        const posicao = parseInt(e.target.name);
        const novosTelefones = this.state.telefones.map((obj,index)=>{
            if(index === posicao){
                obj.numero = this.mascaraDeAcordoComTipo(e.target.value, obj.tipoTelefoneEnum);
            }else{
                obj.numero = this.mascaraDeAcordoComTipo(obj.numero, obj.tipoTelefoneEnum);
            }
            return obj;
        })
        this.setState({telefones: novosTelefones})
    }

    handleChangeTipoNumero = (e) => {
        const posicao = parseInt(e.target.name);
        const novosTelefones = this.state.telefones.map((obj,index)=>{
            if(index === posicao){
                obj.tipoTelefoneEnum = e.target.value;
                obj.numero = this.mascaraDeAcordoComTipo(obj.numero, obj.tipoTelefoneEnum)
            }else{
                obj.numero = this.mascaraDeAcordoComTipo(obj.numero, obj.tipoTelefoneEnum);
            }
            return obj;
        })
        this.setState({telefones: novosTelefones})
    }

    mascaraDeAcordoComTipo = (numero, tipo) =>{
        if(tipo === "CELULAR"){
            numero = mascaraCelular(numero);
        }
        else{
            numero = mascaraTelefone(numero);
        }
        return numero;
    }

    geraTelefones = () =>{
        return this.state.telefones.map((telefone, index) => (
            <div key={index}>
                <input name={index} type="text" required minLength="13"
                    value={this.state.telefones[index].numero}
                    onChange={this.handleChangeNumero}/>
                <select name={index}
                    onChange={this.handleChangeTipoNumero}>
                    <option value="CELULAR">Celular</option>
                    <option value="RESIDENCIAL">Residencial</option>
                    <option value="COMERCIAL">Comercial</option>
                </select>
            </div>
        ));
    }
    
    adicionaTelefone = () =>{
        this.setState({telefones :[...this.state.telefones, {numero:'', tipoTelefoneEnum:'CELULAR'}]})
    }

    removeTelefone = () => {
        if(this.state.telefones.length > 1){
            let novosTelefones = this.state.telefones.map(t=>t);
            novosTelefones.pop()
            this.setState({telefones : novosTelefones})
        }
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
        try {
            if(json.cpf.length !== 11)
                throw new erroHandler("CPF");

            json.telefones.forEach((obj, index) => {
                if(obj.numero.length < 10){
                    throw new erroHandler("Telefone",`(Campo número:${index+1})`)
                }
            })
            
            if(json.endereco.cep.length !== 8)
                throw new erroHandler("CEP")
            
            this.props.enviaJsonParaPai(json);
            this.limpaFormulario();
        } catch (error) {
            alert(`Preencha o ${error.nome}${error.mensagem} corretamente.`)
        }
    }
    
    limpaFormulario(){
        this.setState({
            nome: "",
            cpf: "",
            email:[""],
            telefones:[{
                ...this.state.telefones[0],
                numero:''}],
            endereco:{
                cep:"",
                logradouro:"",
                bairro:"",
                cidade:"",
                uf:"",
                complemento:""
            },
            html : {...this.state.html,
                mostraEnderecoCompleto: 'endereco'
            }
        })
    }

    render(){
        return (
        <form className="conteudo-formulario" onSubmit={this.handleSubmit}>
            <h1>Formulário para {this.props.titulo} cliente</h1>
            <label htmlFor="nome">Nome do cliente</label>
            <input type="text" name="nome" minLength="3" maxLength="100" required
                value={this.state.nome}
                onChange={this.handleChangeNome}/>
            <label htmlFor="cpf">CPF </label>
            <input type="text" name="cpf"  minLength="14" required
                value={this.state.cpf}  
                onChange={this.handleChangeCPF}/>
            <div>
                <div>
                <label>Emails:</label>
                    <button type="button" onClick={this.adicionaEmail}>+</button>
                    <button type="button" onClick={this.removeEmail}>-</button>    
                </div>
                {this.geraEmails()}
            </div>
            <div>
                <label>Telefones:</label>
                <button type="button" onClick={this.adicionaTelefone}>+</button>
                <button type="button" onClick={this.removeTelefone}>-</button>
            </div>
            <div className="telefones">
                    {this.geraTelefones()}
            </div>
            <section>
                <legend>Endereço</legend>
                <label htmlFor="cep">CEP: <img className={`${this.state.html.mostraWarning} loading-gif`} alt="asdf" src={require('../../icons/warning.png')} /><br/></label>
                <input type="text" name="cep" required minLength="9"
                    value={this.state.endereco.cep} 
                    onChange={e => this.handleChangeEndereco(e, true)}/> 
                <div className={this.state.html.mostraEnderecoCompleto}>
                    <label htmlFor="uf">uf: 
                        <input type="text" name="uf" required
                            value={this.state.endereco.uf}  
                            onChange={this.handleChangeEndereco}/>
                    </label>
                    <label htmlFor="cidade">Cidade: 
                        <input type="text" name="cidade" required
                            value={this.state.endereco.cidade}  
                            onChange={this.handleChangeEndereco}/>
                    </label>    
                    <label htmlFor="logradouro">Logradouro: 
                        <input type="text" name="logradouro" required
                            value={this.state.endereco.logradouro}  
                            onChange={this.handleChangeEndereco}/>
                    </label>
                    <label htmlFor="bairro">Bairro:
                        <input type="text" name="bairro" required
                            value={this.state.endereco.bairro}  
                            onChange={this.handleChangeEndereco}/>
                    </label>
                    <label htmlFor="complemento">Complemento:
                        <input type="text" name="complemento" onChange={this.handleChangeEndereco}/>
                    </label>
                </div>
            </section>
            <button type="submit">enviar</button>
        </form>
        )
    }
}

export default Formulario;