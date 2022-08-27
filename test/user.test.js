
const app = require('../src/app');
const supertest = require('supertest');
let req = supertest(app);

let mainUser = { 
    name: 'Maria da Silva',
    email: 'maria@email.com',
    password: '123456'
};

beforeAll(() => {
    return req.post('/users/user')
            .send(mainUser)
            .then(res => {})
            .catch(error => console.log(error))
})

afterAll(() => {
    return req.delete(`/users/user-delete/${mainUser.email}`)
        .then(res => {})
        .catch(error => console.log(error))

})

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

        return req.post('/users/user')
            .send(user)
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body.email).toEqual(email);
            }).catch (error => {
                throw error;
            });
    });

    it('Impedir o cadastro de usuário com os dados vazios', async() => {
        let user = {
            name: '', 
            email: '',
            password: ''
        };
        return await req.post('/users/user')
            .send(user)
            .then(res => {
                expect(res.statusCode).toEqual(400); // 400 = Bad request
            }).catch (error => {
                throw error;
            });
    });

    it('Impedir o cadastro de usuário com email repetido', async () => {

       // geração de emails diferentes p/ evitar erros por emails repetidos
       let time = Date.now();
       let email = `${time}@email.com`;
       let user = {
           name: 'Aline', 
           email,
           password: '123456'
       };

       return await req.post('/users/user')
           .send(user)
           .then(res => {
               expect(res.statusCode).toEqual(200);
               expect(res.body.email).toEqual(email);

               req.post('/users/user')
               .send(user)
               .then(res => {

                    expect(res.statusCode).toEqual(400);
                    expect(res.body.error).toEqual('Email já cadastrado');

               }).catch(error => {
                throw(error);
               })
            }).catch (error => {
               throw error;
            });
    });
})