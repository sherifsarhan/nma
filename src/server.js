'use strict';

const Hapi = require('hapi');
const mysql = require('mysql2/promise');
const fs = require('fs');

const conn = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    schema: ''
});
var getCompaniesSQL = 
`SELECT
    idcompanies,
    CompanyName,
    AgentId,
    SegmentId,
    TypeId,
    SubtypeId,
    SizeId,
    KindId,
    ConglomerateId,
    SalesLifeCycleStatusId,
    Website,
    Notes
FROM nma.companies;`;
function getCompanies() {
    return conn.then((connection) => {
        console.log("CONNECTED TO MYSQL");
        return connection.execute(getCompaniesSQL);
    });
}

var addCompanySQL =
`INSERT INTO nma.companies (CompanyName, AgentId, SegmentId)
    VALUES ('Test', 3, 5);`
function addCompany(company) {
    return conn.then((connection) => {
        console.log("CONNECTED TO MYSQL");
        return connection.execute(addCompanySQL);
    });
}

var contactId = 0;
var contacts = {};

const server = Hapi.server({
    port: 3001,
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
        getCompanies();
        return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
    }
});

server.route({
    method: 'POST',
    path: '/addCompany',
    handler: (request) => {
        console.log(request.payload);
        addCompany(request.payload).then(() => {
            console.log("add company done");
        });
        return request.payload;
    }
});

server.route({
    method: 'GET',
    path: '/getCompanies',
    handler: () => {
        return getCompanies().then((companies) => {
            console.log(companies);
            return companies[0];
        });
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