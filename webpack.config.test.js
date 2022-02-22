const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js'],
    alias: {
        // Resolve aliases required by ReactDOM when referencing 'react'
        "react": path.resolve(__dirname, 'node_modules/react/react.production.min'),
        "ReactDOM": path.resolve(__dirname, 'node_modules/react/react-dom.production.min'),
        "react-dom": "ReactDOM"
    }
  },
  optimization: {
    minimize: false
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader?sourceMap", "sass-loader?sourceMap"],
      },
      {
        test: /\.svg$/,
        loader: 'url-loader'
      }
    ],
  }
};
