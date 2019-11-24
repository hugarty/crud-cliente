import React, {Component} from 'react'

export default class Email extends Component{
    constructor() {
        super()
        this.state = {emails :[""]}
    }

    handleChangeEmail = (e) => {
        const posicao = parseInt(e.target.name);
        const emailsAlterado = this.state.emails.map((obj,index)=>{
            if(index === posicao){
                obj = e.target.value;
            }
            return obj;
        })
        this.setState({emails: emailsAlterado})
        this.getEmails(emailsAlterado);
    }

    geraEmails = () =>{
        return this.state.emails.map((obj, index)=>(
            <input key={index} name={index} type="email" required
                onChange={this.handleChangeEmail}/>
        ))
    }
    
    adicionaEmail = () =>{
        this.setState({emails :[...this.state.emails,""]})
    }
    
    removeEmail = () =>{
        if(this.state.emails.length > 1){
            let novosEmails = this.state.emails.map(t=>t);
            novosEmails.pop()
            this.setState({emails : novosEmails})
            this.getEmails(novosEmails);
        }
    }

    getEmails = (emails) => {
        this.props.getEmails(emails);
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