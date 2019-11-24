import React from 'react';


function Cliente ({atributos, removeCliente}){


    const onClickRemoveCliente = () => {
        if(window.confirm(`Quer remover o cliente ${atributos.nome}?`)){
            removeCliente(atributos.id);
        }
    }

    return (
        <div>
            <p>{atributos.id}- {atributos.nome}</p>
            <p>{atributos.cpf}</p>
            {atributos.email.map((email,itemIndex) => <span key={itemIndex}>{email}</span>)}
            {atributos.telefones.map((telefone) => <p key={telefone.id}>{telefone.numero}{telefone.tipoTelefoneEnum}</p>)}
            <p>Endereço</p>
            {atributos.endereco.bairro}
            {atributos.endereco.cep}
            {atributos.endereco.cidade}
            {atributos.endereco.complemento}
            <button onClick={onClickRemoveCliente}>remover cliente</button>
        </div>
    )
}

export default Cliente;