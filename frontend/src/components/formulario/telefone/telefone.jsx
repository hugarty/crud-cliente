import React, {Component} from 'react'
import { mascaraTelefone } from '../../../utils/utils'

export default class Telefone extends Component{
    constructor() {
        super()
        this.state = {quantidadeDeTelefones :1}
    }

    geraTelefones = () =>{
        let arrayDeTelefones= [];
        for (let index = 0; index < this.state.quantidadeDeTelefones; index++) {
            arrayDeTelefones.push(
                <div key={index}>
                    <input name={`telefone${index}`} type="text" required
                        value={this.state[`telefone${index}`]}
                        onChange={this.handleChangeTelefone}/>
                    <select name={`telefone${index}`} 
                        onChange={e => this.setState({
                            [e.target.name]: {
                                ...this.state[e.target.name],
                                tipoTelefoneEnum: e.target.value
                            }})}>
                        <option value="RESIDENCIAL">Residencial</option>
                        <option value="COMERCIAL">Comercial</option>
                        <option value="CELULAR">Celular</option>
                    </select>
                </div>)
        }
        return arrayDeTelefones;
    }

    adicionaTelefone = (e) => {
        let novaQuantidadeDeTelefones = this.state.quantidadeDeTelefones + 1;
        this.setState({...this.setState, quantidadeDeTelefones : novaQuantidadeDeTelefones})
    }

    removeTelefone = (e) =>{
        if(this.state.quantidadeDeTelefones > 1){
            let novaQuantidadeDeTelefones = this.state.quantidadeDeTelefones - 1;
            this.setState({...this.setState,
                [`telefone${novaQuantidadeDeTelefones}`]:undefined, 
                quantidadeDeTelefones : novaQuantidadeDeTelefones})
        }
    }

    getTelefones = () => {
        let arrayDeTelefones = [];
        for (let index = 0; index < this.state.quantidadeDeTelefones ; index++) {
            let telefone = this.state[`telefone${index}`];
            if(telefone){
                if(telefone.tipoTelefoneEnum){
                    arrayDeTelefones.push(telefone);
                }else{
                    arrayDeTelefones.push({...telefone, tipoTelefoneEnum:"RESIDENCIAL"});
                }
            }
        }
        console.log(arrayDeTelefones);
    }

    handleChangeTelefone = e => {
        this.setState({
            [e.target.name]: {
                ...this.state[e.target.name],
                numero: mascaraTelefone(e.target.value)
            }
        })
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