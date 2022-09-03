const app = require('../../src/app');
const supertest = require('supertest');
const request = supertest(app);

//teste de validação da porta e de conexão
it('A aplicação deve responser na porta 3000', async () => {

    return request.get('/').then(res => { 

       const status = res.statusCode;
       expect(status).toEqual(200);
       
    }).catch(error => { 
        throw error 
    });
    
})