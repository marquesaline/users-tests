const { UserMock } = require('../mocks/models');

const usersMocksServices = {};

usersMocksServices.getAllUsers = async () => {
    const usersMock = await UserMock.findAll();
    return usersMock;
}

usersMocksServices.getUser = async(email) => {
    const userMock = await UserMock.findOne({
        where: { email }
    });
    return userMock;
}

module.exports = usersMocksServices;