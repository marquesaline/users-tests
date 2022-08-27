const { User } = require('../database/models');

const usersServices = {};

usersServices.getAllUsers = async () => {
    const users = await User.findAll();
    return users;
}

usersServices.getUser = async(email) => {
    const user = await User.findOne({
        where: { email }
    });
    return user;
}


module.exports = usersServices;