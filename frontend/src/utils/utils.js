export const mascaraNome = value => {
    return value
        .replace(/([^A-Za-z0-9\s])/g, '')
}

export const mascaraCPF = value => {
    value = value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2') 
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') 
    return value
}

export const mascaraCEP = value => {
    value = value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2') 
      .replace(/(-\d{3})\d+?$/, '$1') 
    return value
}

export const mascaraTelefone = value => {
    value = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1)$2') 
        .replace(/(\d{4})(\d)/, '$1-$2') 
        .replace(/(-\d{4})\d+?$/, '$1') 
    return value
}

export const mascaraCelular = value => {
    value = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1)$2')
        .replace(/(\d{5})(\d)/, '$1-$2') 
        .replace(/(-\d{4})\d+?$/, '$1')  
    return value
}


export const apenasDigitos = value => {
    return value.replace(/\D/g, '');
}

export const retiraMascaraTelefones = telefones => {
    let telefonesSemMascara = telefones.map(telefone => {
        telefone.numero = apenasDigitos(telefone.numero);
        return telefone;
    })
    return telefonesSemMascara;
}

export function erroHandler (nome, mensagem){
    this.nome = nome || "error";
    this.mensagem = mensagem || '';
}