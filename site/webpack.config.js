const path = require("path");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        "app-main": "./src/app-main.js",
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: "index.html",
        }),
        new CopyWebpackPlugin([{
            from: "data",
            to: "data",
        }]),
    ],
    resolve: {
        modules: ["node_modules"],
        extensions: [".js"],
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "build"),
        publicPath: "/",
    },
    devServer: {
        historyApiFallback: true,
    },
    devtool: "source-map",
};
