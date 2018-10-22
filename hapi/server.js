'use strict';

const Hapi = require('hapi');
const { Sqlconnector } = require("./services/sqlconnector");
const route = require('./routes');
const server = Hapi.server({
    load: {
        sampleInterval: 1000
    },
    host: "192.168.110.133",
    port: 80,
    autoListen: true,
});
server.route(route.endpoints);
server.start()
    .then(() => {
        console.log('Server running at:', server.info.uri)
    }).catch(err => {
    console.log(err)
    process.exit(1)
});

//var login_fields  = require('./routes/joi-validation');
// var opts = {
//     fields: login_fields,
//     handler: custom_handler,
//     fail_action_handler: custom_handler
//   };
