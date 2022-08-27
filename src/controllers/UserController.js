const controller = {};
const { User } = require('../database/models');
const { getUser } = require('../services/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

module.exports = controller;