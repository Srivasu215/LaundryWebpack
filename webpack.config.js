const path = require('path');

module.exports = {
  entry: {
    bundle: './resources/js/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'resources/dist'),
    filename: '[name].js',
  },
};