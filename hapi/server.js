'use strict';

const Hapi = require('hapi');
const mongojs = require('mongojs');  //<--- Added
const Config = require('config');
const Joi = require('joi');
const Handlers = {};

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

// Create a server with a host and port
const server = Hapi.server({
    // Mongo DB
    server.connection({  
        host: 'localhost', 
        port: 27017
    });
    //Config.get('api')
    // MySQL DB
    server.connection({  
        host: 'localhost', 
        port: 27017,

        password: 'example',
        database: 'CID',
        charset: 'utf8',
    });
});

//Connect to db
server.app.db = mongojs('mongo', ['books']);


# Validation du rendu des données avec Joi 
const schema = Joi.object().keys({
    id: //
    compnos: Joi.number().integer().min(0).max(100).required(),
    naturecode: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    incident_type_description: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    main_crimecode: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    reptdistrict: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).max(4),
    reportingarea: Joi.number().integer().min(0).max(20).required(),
    fromdate: Joi.date().required(),
    todate: Joi.date().required(),
    weapontype: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    shooting: Joi.boolean().valid(TRUE).invalid(FALSE).required(),
    domestic: Joi.boolean().valid(TRUE).invalid(FALSE).required(),
    shift: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    year: Joi.number().integer().min(1900).max(2018),
    month: Joi.number().integer().min(1).max(12),
    day_week: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    ucrpart: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    x: //Joi.string().email({ minDomainAtoms: 2 }),
    y: //Joi.string().email({ minDomainAtoms: 2 }),
    streetname: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    xstreetname: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    location: //Joi.string().email({ minDomainAtoms: 2 }),
    location: Joi.,
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

//Setup the routes
require('./routes/routes')(server);

init();