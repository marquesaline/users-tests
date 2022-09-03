const chai = require('chai');
chai.should();

describe('Unitários', () => {
    require('./controllers/appController.spec');
    require('./controllers/userController.spec');
});