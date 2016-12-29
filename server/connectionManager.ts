import * as mongoose from 'mongoose';
import { Config } from './config';
import { upMonitor } from './upmonitor';

(<any>mongoose).Promise = global.Promise;
let connectionString: string = process.env.MONGO_URI;
let connectionOptions: mongoose.ConnectionOptions = {
    server: {
        socketOptions: {
            connectTimeoutMS: 5000,
            socketTimeoutMS: 5000,
            keepAlive: 120
        },
        reconnectTries: 5,
        reconnectInterval: 1000 // in milliseconds
    },
    replset: {
        keepAlive: 120
    }
};

let reconnectTimeout: NodeJS.Timer;

async function reconnectAsync() {
    debug('Trying to reconnect...');
    switch (mongoose.connection.readyState) {
        case 0: // disconnected
            try {
                debug('Disconnected, now will try to connect...');
                await mongoose.connect(connectionString, connectionOptions);
            } catch (error) {
                debug('Could not connect when trying to reconnect.');
            }
            break;
        case 1: // connected
            debug('Already connected, we are done.');
            break;
        case 2: // connecting
            debug('Already connecting, will give up on this try.');
            break;
        case 3: // disconnecting
            debug('Still disconnecting, will try later.');
            tryToReconnect();
            break;
    }
}

function tryToReconnect() {
    reconnectTimeout = setTimeout(reconnectAsync, 5000);
}

export async function rebuildConnectionAsync() {
    clearTimeout(reconnectTimeout);
    debug('Rebuilding the connection...');
    switch (mongoose.connection.readyState) {
        case 0: // disconnected
            await reconnectAsync();
            break;
        case 1: // connected
            debug('Connected, disconnecting...');
            await mongoose.connection.close();
            await reconnectAsync();
            break;
        case 2: // connecting
            debug('Connecting, will close...');
            await mongoose.connection.close();
            await reconnectAsync();
            break;
        case 3: // disconnecting
            debug('Disconnecting, will close.');
            await mongoose.connection.close();
            await reconnectAsync();
            break;
    }
}

export async function startConnectionAsync() {
    if (connectionString) {
        connectionOptions.server.socketOptions.connectTimeoutMS = 10000;
        connectionOptions.server.socketOptions.socketTimeoutMS = 10000;
        connectionOptions.server.reconnectTries = 10;
    } else if (Config.isTestEnv) {
        connectionString = 'mongodb://localhost/transempregos-test';
    } else if (Config.isProdEnv) {
        throw new Error('Production has to have MONGO_URI set.');
    } else {
        connectionString = 'mongodb://localhost/transempregos';
    }
    try {
        await mongoose.connect(connectionString, connectionOptions);
    } catch (error) {
        debug(`Could not connect to Mongo.\n${error}`);
        tryToReconnect();
    }

    mongoose.connection.on('connecting', () => {
        debug('Mongoose connection connecting.');
    }).on('connected', () => {
        debug('Mongoose connection connected.');
    }).on('open', () => {
        debug('Mongoose connection opened.');
        upMonitor.set({ up: true }, 'Connection opened.');
    }).on('disconnecting', () => {
        debug('Mongoose connection disconnecting.');
    }).on('disconnected', () => {
        debug('Mongoose connection disconnected.');
        upMonitor.set({ down: true }, 'Connection disconnected.');
        tryToReconnect();
    }).on('close', () => {
        debug('Mongoose connection closed.');
        upMonitor.set({ down: true }, 'Connection closed.');
        tryToReconnect();
    }).on('reconnected', () => {
        debug('Mongoose connection reconnected.');
    }).on('error', (err: any) => {
        debug(`Mongoose connection error: ${err}`);
    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function () {
        mongoose.connection.close(() => {
            debug('Mongoose connection disconnected through app termination');
            process.exit(0);
        });
    });
}