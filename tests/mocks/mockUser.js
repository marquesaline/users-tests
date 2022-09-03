let time = Date.now();
let emailRight = `${time}@email.com`;

const mocks = {};

mocks.userExemple = {
    name: 'Maria da Silva',
    email: 'maria@email.com',
    password: '123456'
}

mocks.goodRequest = {
    name: 'Aline', 
    email: emailRight,
    password: '123456'
}

mocks.badRequestEmpty = {
    name: '', 
    email: '',
    password: ''
}

mocks.userUnregistered = {
    nome: 'Qualquer nome',
    email: "emailqualquer@email.com", 
    password: "5015451"
}

module.exports = mocks;