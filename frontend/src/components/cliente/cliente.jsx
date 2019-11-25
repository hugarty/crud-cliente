import React from 'react';
import "./index.css"

function Cliente ({atributos, removeCliente}){


    const onClickRemoveCliente = () => {
        if(window.confirm(`Quer remover o cliente ${atributos.nome}?`)){
            removeCliente(atributos.id);
        }
    }

    return (
        <div className="conteudo-cliente">
            <div className="conteudo-texto">
                <div>
                    <h2>Nome: {atributos.nome}</h2>
                    <p>CPF: <span>{atributos.cpf}</span></p>
                    <div>Emails:<br/> {atributos.email.map((email,itemIndex) => <span key={itemIndex}>{email}<br/></span>)}</div>
                    <div>Telefones:<br/> {atributos.telefones.map((telefone) => <span className="numero-telefone" key={telefone.id}>{telefone.tipoTelefoneEnum}: {telefone.numero}<br/></span>)}</div>
                </div>
                <div>
                    <h3>Endereço:</h3>
                    <p>CEP: <span>{atributos.endereco.cep}</span></p>
                    <p>Cidade: <span>{atributos.endereco.cidade}</span></p>
                    <p>Bairro: <span>{atributos.endereco.bairro}</span></p>
                    <p>Complemento: <span>{atributos.endereco.complemento}</span></p>
                </div>
            </div>
            <button onClick={onClickRemoveCliente}>remover cliente</button>
        </div>
    )
}

export default Cliente;