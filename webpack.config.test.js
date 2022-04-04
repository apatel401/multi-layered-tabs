const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js'],
    alias: {
        // Resolve aliases required by ReactDOM when referencing 'react'
        "react": path.resolve(__dirname, 'node_modules/@digital-learning/react/react.production.min'),
        "ReactDOM": path.resolve(__dirname, 'node_modules/@digital-learning/react/react-dom.production.min'),
        "react-dom": "ReactDOM",
        "material-ui": path.resolve(__dirname, 'node_modules/@digital-learning/material-ui/material-ui.production.min'),
    }
  },
  devtool: "eval-source-map",
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"]
      },
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
