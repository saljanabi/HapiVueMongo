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
});

//Connect to db
server.app.db = mongojs('mongo', ['books']);

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

init();


// // Create a server with a host and port
// const server = new Hapi.Server();  
// server.connection({  
//     host: 'localhost', 
//     port: 3000
// });