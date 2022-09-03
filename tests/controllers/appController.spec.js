const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/app');

chai.use(chaiHttp);
chai.should();

//teste de validação da porta e de conexão
it('A aplicação deve responser na porta 3000', (done) => {

    chai
        .request(app)
        .get('/')
        .end((err, res) => {
            res.status.should.equal(200);
            done();
        })
    
})