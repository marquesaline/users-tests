const controller = {};
const { User } = require('../database/models');
const { getUser } = require('../services/users');

controller.registrationUser = async (req, res) => {

    const { user, email, password } = req.body;

    //validação dos campos vazios
    if(user == '' || email == '' || password == '' ) {
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

        await User.create({ user, email, password });
        res.json({email});

    }catch(error) {
        res.sendStatus(500);
       
    }
    
}


module.exports = controller;