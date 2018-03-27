'use strict';

const Hapi = require('hapi');

const server = Hapi.server({
    port: 3001,
    host: 'localhost'
});

server.route({
    method: 'GET',
    path: '/',
    handler: () => {

        return 'Hello, world!';
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: (request) => {

        return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
    }
});

server.route({
    method: 'POST',
    path: '/saveName',
    handler: (request) => {
        console.log(request.payload);
        return request.payload;
    }
});

const init = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();