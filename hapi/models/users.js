// Joi plugin & MYSQL plugins
var bcrypt = require('bcrypt'); // for password hash
const Sequelize = require('sequelize'); // ORM for Node requests to the SQL database
const { Sqlconnector } = require("./services/sqlconnector");
const Handlers = {};
//const joivalidation = require('../routes/joi-validation');

// var login_fields  = require('./routes/joi-validation');
// var opts = {
//     fields: login_fields,
//     handler: custom_handler,
//     fail_action_handler: custom_handler
// };

// establish authentication to database or throw an error message
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully to MySQL database.');
    })
    .catch(err => {
        console.error('Unable to connect to MySQL database:', err);
    });

// Here we define our User model with an username attribute of type string
// and a password attribute of type text
// by default, all tables get columns for id, createdAt, updatedAt as well.
const User = sequelize.define('users', {
    username: Sequelize.STRING,
    password_hash: Sequelize.STRING,
    password: {
        type: Sequelize.VIRTUAL,
        set: function (val) {
            // Remember to set the data value, otherwise it won't be validated
            this.setDataValue('password', val);
            this.setDataValue('password_hash', generateHash(val));
        },
        validate: {
            isLongEnough: function (val) {
                if (val.length < 3) {
                    throw new Error("Please choose a longer password")
                }
            }
        }
    },
    role: Sequelize.ENUM('agent', 'detective', 'chief'),
    active: Sequelize.BOOLEAN,
});


generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
};


User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.localPassword);
}

// Création du modèle Users sur la BDD MySQL
User.sync({force: true})
    .then(() => User.create({
        username: 'chief',
        password: 'chief',
        role: 'chief',
        active: true,
    }))
    .then(() => User.create({
        username: 'agent',
        password: 'agent',
        role: 'agent',
        active: false,
    }))
    .then(() => User.create({
        username: 'detective',
        password: 'detective',
        role: 'detective',
        active: false,
    }))
    .then(chief => {
        console.log(chief.toJSON());
    });



module.exports = {
    User
}