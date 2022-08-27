const controller = {};
const { User } = require('../database/models');

controller.registrationUser = async (req, res) => {

    const { user, email, password } = req.body;

    //validação dos campos vazios
    if(user == '' || email == '' || password == '' ) {
        res.sendStatus(400);
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