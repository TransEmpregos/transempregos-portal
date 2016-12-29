export class Config {
    static nodeEnv = process.env.NODE_ENV || 'development';
    static isDevEnv = Config.nodeEnv === 'development';
    static isTestEnv = Config.nodeEnv === 'test';
    static isProdEnv = Config.nodeEnv === 'production';
}
debug(`Environment is '${Config.nodeEnv}'`);