exports.config = {
  directConnect: true,
  capabilities: {
    'browserName': 'chrome'
  },
  chromeDriver: require('chromedriver').path,
  framework: 'jasmine',
  specs: ['**/*.feature.js'],
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};