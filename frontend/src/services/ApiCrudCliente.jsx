const URL = "http://localhost:8080"
const METODOS = {GET:'GET', POST:'POST', DELETE: 'DELETE', PATCH: 'PATCH'};
const STORAGE = {TOKEN:"token", PERFIL:"perfil"}
const HEADERS = {
    'Accept':'application/json', 
    'Content-type':'application/json',
    'Origin':'*'
}

export const testeToken = () => {
    return fetch(`${URL}/cliente/token`,
    {
        headers: getHeaderComToken()
    });
}

export const fazLogin = (formularioLogin) =>{
    return fetch(`${URL}/login`,
    {
        method: METODOS.POST,
        headers: getHeader(),
        body: JSON.stringify(formularioLogin)
    }).then(verificaRespostaRetornaPromisseJson)
}

export const listaClientes = () =>{
    return fetch(`${URL}/cliente/lista`,
    {
        headers: getHeaderComToken()
    }).then(verificaRespostaRetornaPromisseJson)
}

export const adicionaCliente = (formularioCliente) => {
    return fetch(`${URL}/cliente/adiciona`,
    {
        method: METODOS.POST,
        headers: getHeaderComToken(),
        body: JSON.stringify(formularioCliente)
    }).then(verificaRespostaRetornaPromisseJson)
}

export const atualizaCliente = (clienteId, formularioCliente) => {
    return fetch(`${URL}/cliente/atualiza/${clienteId}`,
    {
        method: METODOS.PATCH,
        headers: getHeaderComToken(),
        body: JSON.stringify(formularioCliente)
    }).then(verificaRespostaRetornaPromisseJson)
}

export const deletaCliente = (clienteId) => {
    return fetch(`${URL}/cliente/deleta/${clienteId}`,
    {
        method: METODOS.DELETE,
        headers: getHeaderComToken()
    })
}

const verificaRespostaRetornaPromisseJson = (resposta) =>{
    if(resposta.ok)
        return resposta.json()
    return Promise.reject(resposta);
}

export const salvaTokenEPerfilNoLocalStorage = json =>{
    if(json && json.tokenDto){
        localStorage.setItem(STORAGE.TOKEN, `${json.tokenDto.tipo}:${json.tokenDto.token}`);
        localStorage.setItem(STORAGE.PERFIL, json.perfil);
    }
}

const getHeader = () =>{
    return new Headers(HEADERS);
}

const getHeaderComToken = () => {
    let header = getHeader();
    header.append("Authorization",localStorage.getItem(STORAGE.TOKEN));
    return header;
}
