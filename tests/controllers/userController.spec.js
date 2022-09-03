
const { expect } = require('chai').expect;
const { throws } = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { error } = require('console');

const app = require('../../src/app');
const {
    userExemple,
    goodRequest,
    badRequestEmpty,
    userUnregistered
} = require('../mocks/mockUser');




chai.use(chaiHttp);
chai.should();

before(() => {
    chai
        .request(app)
        .post('/users/user')
        .send(userExemple)
        .end(res => {})
});

after(() => {
    chai 
        .request(app)
        .delete(`/users/user-delete/${userExemple.email}`)
        .end(res => {})

});
describe('Cadastro de usuário', () => {
    it('Cadastrar um usuário com sucesso', (done) => {
        chai
            .request(app)
            .post('/users/user')
            .send(goodRequest)
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.should.have.property('email').equal(goodRequest.email);
                done();
            });

            
    });

    it('Impedir o cadastro de usuário com os dados vazios', (done) => {
        
        chai
            .request(app)
            .post('/users/user')
            .send(badRequestEmpty)
            .end((err, res) => {
                res.status.should.equal(400);
                done();
            });

    });

    // it('Impedir o cadastro de usuário com email repetido', (done) => {
    //     // chai
    //     //    .request(app)
    //     //    .post('/users/user')
    //     //    .send(mocks.goodRequest)
    //     //    .end((err, res) => {
    //     //        res.status.should.equal(200);
    //     //        res.body.should.have.property('email').equal(mocks.goodRequest.email);
    //     //        done();
             
    //     //    });
    //     chai
    //         .request(app)
    //         .post('/users/user')
    //         .send(mainUser)
    //         .end((err, res) => {
    //             res.status.should.equal(400);
    //             res.body.shoud.have.error().equal('Email já cadastrado')
    //             done();
    //         });
            
    // });
});

describe('Autenticação', () => {
    it('Retornar um token quando logar', (done) => {
        chai
            .request(app)
            .post('/users/auth')
            .send(userExemple)
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.token.should.not.be.undefined;
                done();

            })
    });
    
    it('Impedir que um usuário não cadastrado faça o login', (done) => {

        chai 
            .request(app)
            .post('/users/auth')
            .send(userUnregistered)
            .end((err, res) => {
                res.status.should.equal(403);
                res.body.errors.email.should.equal('Email não cadastrado');
                done();
            })
    });

    it('Impedir que um usuário faça o login com uma senha errada', (done) => {
        chai 
            .request(app)
            .post('/users/auth')
            .send({name: userExemple.name, email: userExemple.email, password: '51514141'})
            .end((err, res) => {
                res.status.should.equal(403);
                res.body.errors.password.should.equal('Senha incorreta');
                done();
            })
    });
});





