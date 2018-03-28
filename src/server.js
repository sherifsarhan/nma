'use strict';

const Hapi = require('hapi');
const mysql = require('mysql');

// connect to mysql db
// var con = mysql.createConnection({
//     host: "localhost",
//     user: "yourusername",
//     password: "yourpassword"
// });

// create db
// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
//     con.query("CREATE DATABASE mydb", function (err, result) {
//         if (err) throw err;
//         console.log("Database created");
//     });
// });

// create table
// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
//     con.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("Table created");
//     });
// });

var contactId = 0;
var contacts = {};

const server = Hapi.server({
    port: 3001,
    host: 'localhost',
    routes: { cors: true }
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
    path: '/addContact',
    handler: (request) => {
        console.log(request.payload);
        contacts[contactId] = request.payload;
        contactId++;
        return request.payload;
    }
});

server.route({
    method: 'GET',
    path: '/getContacts',
    handler: () => {
        return contacts;
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