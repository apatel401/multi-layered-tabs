const path = require('path');

module.exports = {
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  optimization: {
    minimize: true
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.svg$/,
        loader: 'url-loader'
      }
    ],
  }
};
