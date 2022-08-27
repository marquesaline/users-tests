const controller = {};
const { User } = require('../database/models');

controller.registrationUser = async (_req, _res) => {

    const { user, email, password } = _req.body;

    //validação dos campos vazios
    if(user == '' || email == '' || password == '' ) {
        _res.sendStatus(400);
        return;
    }

    try {
        
        await User.create({ user, email, password});
        res.json({email});
    }catch(error) {
        res.sendStatus(500);
    }
    
}


module.exports = controller;