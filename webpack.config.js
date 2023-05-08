const webpackNodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = {
  entry: {
    // project chay bat dau tu file index.js
    server: "./index.js",
  },
  output: {
    // duong dan chi toi folder
    path: path.join(__dirname, "dist"),
    // ten file
    filename: "bundle.js",
  },
  target: "node",
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [webpackNodeExternals()],
  module: {
    rules: [
      {
        // dich tu ES5 -> ES6
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
