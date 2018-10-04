const webpackConfig = require('./webpack/config.karma.js');

module.exports = (config) => {
  config.set({
    basePath: './app',
    browsers: ['PhantomJS'],
    singleRun: false,
    frameworks: ['jasmine'],
    plugins: [
      'karma-*',
    ],
    files: [
      '../node_modules/babel-polyfill/dist/polyfill.js',
      '../tests.webpack.js',
    ],
    preprocessors: {
      '../tests.webpack.js': ['webpack', 'sourcemap'],
    },
    reporters: ['jasmine-diff', 'progress', 'coverage', 'spec'],
    coverageReporter: {
      type: 'lcov',
      dir: '../coverage/',
      subdir: '.',
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },
  });
};
