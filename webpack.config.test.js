const path = require("path");

module.exports = {
  resolve: {
    extensions: [".js"],
    alias: {
      // Resolve aliases required by ReactDOM when referencing 'react'
    },
  },
  optimization: {
    minimize: false,
  },
  node: {
    fs: "empty",
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader?sourceMap", "sass-loader?sourceMap"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: "url-loader",
      },
    ],
  },
};
