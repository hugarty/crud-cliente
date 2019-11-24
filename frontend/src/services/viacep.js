import {verificaRespostaRetornaPromisseJson, getHeader} from './ApiCrudCliente'

export const getCEP = cep => {
    let URL = `https://viacep.com.br/ws/${cep}/json/`
    return fetch(URL,
        {
            headers: getHeader()
        })
        .then(verificaRespostaRetornaPromisseJson);
}