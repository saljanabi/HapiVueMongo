'use strict';

const Hapi = require('hapi');
const mongojs = require('mongojs');
const Config = require('config');
const Joi = require('joi');
const Handlers = {};                                                                                        

var custom_fields = {
    email     : Joi.string().email().required(), // Required
    password  : Joi.string().required().min(6)   // minimum length 6 characters
  }

// good-squeeze is a collection of small transform streams
const options = {
    ops: {
        interval: 1000
    },
    reporters: {
        myConsoleReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{
                log: '*',
                response: '*'
            }]
        }, {
            module: 'good-console'
        }, 'stdout']
    }
}

// Connexion à la base de données MongoDB 
const mongoserver = Hapi.server({
    // Mongo DB
    mongoserver:connection({  
        host: 'localhost', 
        port: 27017
    }),
});

mongoserver.app.db = mongojs('mongo', ['HapiVueMongo']);

// Connexion à la base de données MySQL
const server = Hapi.server({
    server:connection({  
        host: 'localhost', 
        port: 3306,
        
        password: 'example',
        database: 'police',
        charset: 'utf8',
    }),
});

server.app.db = mongojs('mongo', ['HapiVueMongo']);

//Connect to db


// Validation du rendu des données Mongo DB CID avec Joi 
const schema = Joi.object().keys({
    id: [Joi.string(), Joi.number().required()],
    compnos: Joi.number().integer().max(100).required(),
    incident_type_description: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).max(200),
    computedcrimecodedesc: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).max(255),
    computedcrimecode: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).max(20),
    reportingarea: Joi.number().integer().max(20),
    fromdate: Joi.date().max(7),
    todate: Joi.date().max(7),
    reptdistrict: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).max(100),
    streetname: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    xstreetname: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    weapontype: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).max(100),
    buildingtype: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).max(100),
    placeofentry: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).max(100),
    perpetratorsnos: Joi.number().integer().min(1).max(12),
    suspecttransportation: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).max(100),
    victimactivity: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).max(300),
    unusualactions: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).max(300),
    main_crimecode: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).max(15),
    naturecode: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    weather: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).max(100),
    shooting: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).max(10),
    domestic: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).max(10),
    shift: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).max(50),
    year: Joi.number().integer().min(1900).max(2018),
    month: Joi.number().integer().min(1).max(12),
    day_week: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).max(50),
    ucrpart: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).max(20),
    x: Joi.number().float().max(100).required(),
    y: Joi.number().float().required(),
    location: Joi.string().email({ minDomainAtoms: 2 }),
}).with('username', 'birthyear').without('password', 'access_token');

// Validation du rendu des données SQL DB authentication avec Joi 
const schema = Joi.object().keys({
    id: [Joi.string(), Joi.number().max(11).required()],
    username: Joi.string().alphanum().max(180).required(),
    nom: Joi.string().alphanum().max(180).required(),
    pnom: Joi.string().alphanum().max(180).required(),
    role: Joi.string().alphanum().max(180).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).max(128).required()
}).with('username', 'birthyear').without('password', 'access_token');

const result = Joi.validate({ username: 'abc', birthyear: 1994 }, schema);

Joi.validate({ username: 'abc', birthyear: 1994 }, schema, function (err, value) { });  // err === null -> valid

server.ext({
    type: 'onRequest',
    method: function (request, h) {
        
        // Change all requests to '/test'
        
        server.log('info', 'onRequest')
        return h.continue;
    }
});


server.register({
    register: require('good'),
    options,
}, (err) => {
    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply('Hello, world!');
        }
    })
});

server.route({
    method: ['PUT', 'POST'],
    path: '/todo',
    config: {
        payload: {
            parse: true
        },
        validate: {
            payload: Joi.object( {
                user: Joi.number().min(1),
                test: Joi.bool()
            })
        }
    },
    handler: Handlers.etna
});

next();
};


Handlers.example = (request, reply) => {
    reply('todo');
}

Handlers.etna = (request, reply) => {
    reply(request, payload)
}

const init = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

server.start((err) => {
    
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});



// HAPIJS MYSQL
// Register plugin:

var server = Hapi.createServer('0.0.0.0', 88888);
server.pack.require('hapi-mysql', Config.db, function(err) {
    if (err) {
        console.error(err);
        throw err;
    }
});

// Use plugin:

request.server.plugins['hapi-mysql'].pool.getConnection(function(err, connection) {
    
    // Use the connection
    connection.query(
        'SELECT 1 FROM mytable',
        function(err, rows) {
            
            if(err) {
                throw new Error(err)
            }
        }
        )
        
        // And done with the connection.
        connection.release();
    })
});


hpco
//Setup the routes
require('./routes/routes')(server);

init();