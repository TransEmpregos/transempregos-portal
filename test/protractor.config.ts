import './_specHelper';
exports.config = {
    directConnect: true,
    capabilities: {
        'browserName': 'chrome'
    },
    chromeDriver: process.env.SNAP_CI ? '/usr/local/bin/chromedriver' : require('chromedriver').path,
    framework: 'mocha',
    specs: ['**/*.feature.js'],
    mochaOpts: {
        reporter: 'spec',
        slow: 3000,
        timeout: 4000
    },
    plugins: [{
        axe: true,
        chromeA11YDevTools: true,
        package: 'protractor-accessibility-plugin'
    }],
    rootElement: 'trans-app',
    baseUrl: 'http://localhost:3000',
    useAllAngular2AppRoots: true
};