import React, {Component} from 'react'

export default class Email extends Component{
    constructor() {
        super()
        this.state = {quantidadeDeEmails :1}
    }

    geraEmails = () =>{
        let arrayDeEmails= [];
        for (let index = 0; index < this.state.quantidadeDeEmails; index++) {
            arrayDeEmails.push(<input key={index} name={"email"+index} type="email" required
                onChange={e => this.setState({[e.target.name]: e.target.value})}/>)
        }
        return arrayDeEmails;
    }

    adicionaEmail = (e) => {
        let novaQuantidadeDeEmails = this.state.quantidadeDeEmails + 1;
        this.setState({...this.setState, quantidadeDeEmails : novaQuantidadeDeEmails})
    }

    removeEmail = (e) =>{
        if(this.state.quantidadeDeEmails > 1){
            let novaQuantidadeDeEmails = this.state.quantidadeDeEmails - 1;
            this.setState({...this.setState,
                [`email${novaQuantidadeDeEmails}`]:undefined, 
                quantidadeDeEmails : novaQuantidadeDeEmails})
        }
    }

    getEmails = () => {
        let arrayDeEmails = [];
        for (let index = 0; index < this.state.quantidadeDeEmails ; index++) {
            if(this.state[`email${index}`]){
                arrayDeEmails.push(this.state[`email${index}`]);
            }
        }
        console.log(arrayDeEmails);
    }

    render(){
        return (
            <div>
                Emails:
                {this.geraEmails().map(e=>e)}
                <button type="button" onClick={this.adicionaEmail}>+</button>
                <button type="button" onClick={this.removeEmail}>-</button>
                <button type="button" onClick={this.getEmails}>getemails</button>
            </div>
        )
    }
}