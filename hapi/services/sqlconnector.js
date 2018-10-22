const Sequelize = require('sequelize');

// configure connection to db host, user, pass - not required for SQLite
module.exports = new Sequelize('police', 'root', 'example', {
    host: '192.168.0.11',
    dialect: 'mysql',
    operatorsAliases: false,
});
