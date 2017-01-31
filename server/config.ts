export const nodeEnv = process.env.NODE_ENV || 'development';
export const isDevEnv = nodeEnv === 'development';
export const isTestEnv = nodeEnv === 'test';
export const isProdEnv = nodeEnv === 'production';
export const secretKey = (() => {
    let key = process.env.SECRET_KEY;
    if (key) return key;
    if (isProdEnv) throw new Error('Secret key is missing.');
    return nodeEnv;
})();
export const adminPassword = (() => {
    let password = process.env.ADMIN_PASSWORD;
    if (password) return password;
    if (isProdEnv) throw new Error('Admin password is missing.');
    return 'admin';
})();
log(`Environment is '${nodeEnv}'`);