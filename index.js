const Hapi = require('hapi');

const server = Hapi.server({
    port: 80,
    load: { sampleInterval: 1000 },
});

const init = async () => {

    await server.start();
    console.log( `Server running at: ${ server.info.uri }` );
};

server.start(err => {

    if (err) {

        // Fancy error handling here
        console.error( 'Error was handled!' );
        console.error( err );

    }

    console.log( `Server started at ${ server.info.uri }` );

});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {

        return 'Hello, world!';
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: (request, h) => {

        return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
    }
});

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();