const URL = "http://localhost:8080"
const METODOS = {GET:'GET', POST:'POST', DELETE: 'DELETE', PATCH: 'PATCH'};

export const teste = () => {
    return fetch(`${URL}/cliente/oi`,{
        headers: getHeader()
    })
    .then(resposta => {
        
        console.log(resposta)
        console.dir(resposta)
        return resposta.text();
    })
    .then(resposta => console.log(resposta));
}

export const login = (formularioLogin) =>{
    return fetch(`${URL}/login`,
    {
        method: METODOS.POST,
        headers: getHeader(),
        body: JSON.stringify(formularioLogin)
    }).then(resposta => resposta.json())
    .then(json => console.log(json))
}

export const listaClientes = () =>{
    return fetch(`${URL}/cliente/lista`,
    {
        headers: getHeader()
    }).then(resposta => resposta.json())
    .then(json => console.log(json))
}



const getHeader = () =>{
    return new Headers({
        'Accept':'application/json', 
        'Content-type':'application/json',
        'Origin':'*'});
  }