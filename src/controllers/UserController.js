const controller = {};
const { User } = require('../database/models');
const { getUser } = require('../services/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtScret = 'masdasdasdaevfg';

controller.registrationUser = async (req, res) => {

    const { name, email, password } = await req.body;

    const passwordCript = bcrypt.hashSync(password, 3)

    //validação dos campos vazios
    if(name == '' || email == '' || password == '' ) {
        res.sendStatus(400);
        return;
    }

    try {
        //checa se o email já foi cadastrado
        let findUser = await getUser(email);
        if(findUser != undefined) {
            res.statusCode = 400;
            res.json({error: 'Email já cadastrado'});
            return;
        }

        await User.create({ name, email, password: passwordCript });
        res.json({email});

    }catch(error) {
        res.sendStatus(500);
       
    }
    
}

controller.deleteUser = async (req, res) => {
    const user = await getUser(req.params.email);
    const id = user.id;
    await User.destroy({ 
        where: { id }
    })
    res.sendStatus(200);

}

controller.authentication = async (req, res) => {
    const { email, password } = req.body;
    const user = await getUser(email);

    if(user == undefined) {
        res.statusCode = 403;
        res.json({errors: { email: 'Email não cadastrado'}});
        return;
    }

    const isPasswordRight = await bcrypt.compare(password, user.password);

    if(!isPasswordRight) {
        res.statusCode = 403;
        res.json({errors: {password: 'Senha incorreta'}});
        return;
    }


    jwt.sign({email, name: user.name, id: user.id}, jwtScret, {espiresIn: '48h'}, (error, token) => {
        if(error) {
            res.sendStatus(500);
            console.log(error);
        } else {
            res.statusCode = 200;
            res.json({token});
        }
    });

}

module.exports = controller;