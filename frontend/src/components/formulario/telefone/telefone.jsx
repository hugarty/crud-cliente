import React, {Component} from 'react'
import { mascaraTelefone, mascaraCelular} from '../../../utils/utils'

export default class Telefone extends Component{
    constructor() {
        super()
        this.state = {telefones : [{
            numero:'', 
            tipoTelefoneEnum:'CELULAR'}]
        }
    }

    handleChangeNumero = (e) => {
        const posicao = parseInt(e.target.name);
        const novosTelefones = this.state.telefones.map((obj,index)=>{
            if(index === posicao){
                obj.numero = this.mascaraDeAcordoComTipo(e.target.value, obj.tipoTelefoneEnum);
            }
            return obj;
        })
        this.setState({telefones: novosTelefones})
        this.getTelefones(novosTelefones);
    }

    handleChangeTipoNumero = (e) => {
        const posicao = parseInt(e.target.name);
        const novosTelefones = this.state.telefones.map((obj,index)=>{
            if(index === posicao){
                obj.tipoTelefoneEnum = e.target.value;
                obj.numero = this.mascaraDeAcordoComTipo(obj.numero, obj.tipoTelefoneEnum)
            }
            return obj;
        })
        this.setState({telefones: novosTelefones})
        this.getTelefones(novosTelefones);
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
            this.getTelefones(novosTelefones);
        }
    }

    getTelefones = (telefones) => {
        this.props.getTelefones(telefones)
    }

    render(){
        return (
            <div>
                Telefones:
                {this.geraTelefones()}
                <button type="button" onClick={this.adicionaTelefone}>+</button>
                <button type="button" onClick={this.removeTelefone}>-</button>
                <button type="button" onClick={this.getTelefones}>getTelefones</button>
            </div>
        )
    }
}