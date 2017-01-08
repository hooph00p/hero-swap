/**
 * Webpack Configuration file
 * More Info: https://github.com/hooph00p/hero-swap#readme
 */

var path = require('path'),
    /* Package information */
    package = require('./package.json'),
    htmlWebpackPlugin = require('html-webpack-plugin');

var reactEntry = './src/main.js';


module.exports = {
    entry: reactEntry,
    output: {
        /* This outputs to the bin directory with the filename bundle.js */
        path: __dirname + '/bin',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                /* Allows the webpacking of .json files */
                test: /.json$/,
                loader: 'json-loader'
            },
            {
                /* Allows the webpacking of .jsx/.js javascript files */
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                /* Allows the webpacking of .css stylesheet files */
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                /* Allows the webpacking of .png image files */
                test: /\.png$/,
                loader: "url-loader?limit=100000"
            },
            {
                /* Allows the webpacking of .png image files */
                test: /\.jpg$/,
                loader: "file-loader"
            },
            {
                /* Allows the webpacking of .woff/.woff2 font files */
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                /* Allows the webpacking of .tff font files */
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                /* Allows the webpacking of .svg vector graphic image files */
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            },
            {
                /* Allows the webpacking of SASS stylesheet files */
                test: /\.(scss|sass)$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/template.html',
            title: package.title,
        })
    ]
};