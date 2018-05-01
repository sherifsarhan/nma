'use strict';

const Hapi = require('hapi');
const mysql = require('mysql2/promise');
const SQL = require('sql-template-strings');
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
        return connection.execute(getCompaniesSQL);
    });
}

function addCompany(company) {
    var addCompanySQL =
    SQL`INSERT INTO nma.companies (CompanyName, AgentId, SegmentId)
    VALUES (${company.companyName}, ${company.agentId}, ${company.segmentId});`
    return conn.then((connection) => {
        return connection.execute(addCompanySQL);
    });
}

var getAgentsSQL = 
`SELECT
    idagents,
    AgentFirstName,
    AgentLastName
FROM nma.internalagents;`;
function getAgents() {
    return conn.then((connection) => {
        return connection.execute(getAgentsSQL);
    });
}

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
        addCompany(JSON.parse(request.payload)).then(() => {
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

server.route({
    method: 'GET',
    path: '/getAgents',
    handler: () => {
        return getAgents().then((agents) => {
            console.log(agents);
            return agents[0];
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