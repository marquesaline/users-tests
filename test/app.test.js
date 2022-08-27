const app = require('../src/app');
const supertest = require('supertest');
const req = supertest(app);

//teste de validação da porta e de conexão
test('A aplicação deve responser na porta 3000', async () => {

    return req.get('/').then(res => { 

       const status = res.statusCode;
       expect(status).toEqual(200);
       
    }).catch(error => { 
        throw error 
    });
    
})