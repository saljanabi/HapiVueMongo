'use strict';

const Hapi = require('hapi');
const Config = require('config');

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

const server = Hapi.server({
    port: 80,
    load: {
        sampleInterval: 1000
    },
});

server.connection(Config.get('api'));

server.ext({
    type: 'onRequest',
    method: function (request, h) {

        // Change all requests to '/test'

        request.setUrl('/test');
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
        handler: function (request, reply) => {
            reply('Hello, world!');
        }
    })
}
    );

const init = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
};

init();