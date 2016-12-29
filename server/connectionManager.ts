import * as mongoose from 'mongoose';
import { Config } from './config';

(<any>mongoose).Promise = global.Promise;
export function startConnection() {
    const connectionString = process.env.MONGO_URI;
    let connectResult: mongoose.MongooseThenable;
    if (connectionString) {
        connectResult = mongoose.connect(connectionString, {
            server: {
                socketOptions: {
                    connectTimeoutMS: 10000,
                    socketTimeoutMS: 10000
                },
                reconnectTries: 10,
                reconnectInterval: 1000 // in milliseconds
            }
        });
    } else if (Config.isTestEnv) {
        connectResult = mongoose.connect('mongodb://localhost/transempregos-test', {
            server: {
                socketOptions: {
                    connectTimeoutMS: 5000,
                    socketTimeoutMS: 5000
                },
                reconnectTries: 5,
                reconnectInterval: 500 // in milliseconds
            }
        });
    } else if (Config.isProdEnv) {
        throw new Error('Production has to have MONGO_URI set.');
    } else {
        connectResult = mongoose.connect('mongodb://localhost/transempregos', {
            server: {
                socketOptions: {
                    connectTimeoutMS: 5000,
                    socketTimeoutMS: 5000
                },
                reconnectTries: 5,
                reconnectInterval: 500 // in milliseconds
            }
        });
    }
    connectResult.catch(err => debug(`Could not connect to Mongo.\n${err}`));
}