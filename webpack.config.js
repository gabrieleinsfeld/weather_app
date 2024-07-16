const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "/Users/gabrielsoares/repos/dropdown_menu/src/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index_bundle.js",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
