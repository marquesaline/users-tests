
const app = require('../src/app');
const supertest = require('supertest');
const req = supertest(app);

describe('Cadastro de usuário', () => {
    it('Cadastrar um usuário com sucesso', async () => {

        // geração de emails diferentes p/ evitar erros por emails repetidos
        let time = Date.now();
        let email = `${time}@email.com`;
        let user = {
            name: 'Aline', 
            email,
            password: '123456'
        };
        try {
            const res = await req.post('/users/user').send(user);
            expect(res.statusCode).toEqual(200);
            expect(res.body.email).toEqual(email);
        } catch (error) {
            throw error;
        }
    })

    it('Impedir o cadastro de usuário com os dados vazios', async() => {
        let user = {
            name: '', 
            email: '',
            password: ''
        };
        try {
            const res = await req.post('/users/user').send(user);
            expect(res.statusCode).toEqual(400); // 400 = Bad request
        } catch (error) {
            throw error;
        }
    })
})