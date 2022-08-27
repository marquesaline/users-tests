const app = require('../src/app');
const supertest = require('supertest');

const req = supertest(app);


describe('Cadastro de usuário', () => {
    it('Cadastrar um usuário com sucesso', () => {

        // geração de emails diferentes p/ evitar erros por emails repetidos
        let time = Date.now();
        let email = `${time}@email.com`;
        let user = {
            name: 'Aline', 
            email,
            password: '123456'
        };
        return req.post('/user').send(user).then(res => {
            
                expect(res.statusCode).toEqual(200);
                expect(res.body.email).toEqual(email);

            }).catch(error => fail(error));
    })
})