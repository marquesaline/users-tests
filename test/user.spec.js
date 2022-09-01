
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

describe('Autenticação', () => {
    it('Retornar um token quando logar', () => {
        return req.post('/users/auth')
                .send({email: mainUser.email, password: mainUser.password})
                .then(res => {
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.token).toBeDefined();
                })
                .catch(error => {throw error})

    });
    
    it('Impedir que um usuário não cadastrado faça o login', () => {
        return req.post('/users/auth')
        .send({email: "emailqualquer@email.com", password: "5015451"})
        .then(res => {
            expect(res.statusCode).toEqual(403);
            expect(res.body.errors.email).toEqual('Email não cadastrado');
        })
        .catch(error => {throw error})
    });

    it('Impedir que um usuário faça o login com uma senha errada', () => {
        return req.post('/users/auth')
        .send({email: mainUser.email, password: "5015451"})
        .then(res => {
            expect(res.statusCode).toEqual(403);
            expect(res.body.errors.password).toEqual('Senha incorreta');
        })
        .catch(error => {throw error})
    });
})