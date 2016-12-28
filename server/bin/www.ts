#!/usr/bin/env node --harmony-async-await

import app from '../app';
import * as http from 'http';
import * as Debug from 'debug';
const debug = Debug('server');

const port = normalizePort(process.env.PORT || '3000');
const server = http.createServer(app.callback());
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: string) {
    const p = parseInt(val, 10);
    if (isNaN(p))
        return val;
    if (p >= 0)
        return p;
    return false;
}

function onError(error: any) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}