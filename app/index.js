require('babel-register')({
  presets: [
    ['babel-preset-env', {
      targets: {
        node: 'current',
        browsers: 'last 2 versions'
      }
    }]
  ],
  plugins: [
    ['transform-object-rest-spread', { 'useBuiltIns': true }]
  ]
});
require('babel-polyfill');
require('./src/server/server');
