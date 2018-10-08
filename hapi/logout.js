server.route({
    method: 'GET',
    path: '/logout',
    handler: function (request, reply) {

        reply('You are logged out now').code(401);
    }
});