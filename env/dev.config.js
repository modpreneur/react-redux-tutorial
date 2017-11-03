'use strict';

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const JS_ROOT = path.resolve(__dirname, '../'),
    CONFIG_PATH = path.join(JS_ROOT, 'parameters.json');
let server_domain = 'localhost';
let server_port = 3001;
let server_path = 'http://localhost:3001/';
if (fs.existsSync(CONFIG_PATH)){
    let config = JSON.parse(fs.readFileSync(CONFIG_PATH)),
        domain = config['dev-server-domain'];

    if(domain[domain.length - 1] === '/') {
        domain = domain.substring(0, domain.length - 1);
    }
    server_path = `${domain}:${config['dev-server-port']}`

    server_domain = domain;
    server_port = Number(config['dev-server-port']);
}

const SERVER_PATH = `${server_path}/`;


// preparation
let babelQuery = {
        presets: ['stage-2'],
        plugins: ['syntax-dynamic-import']
    },
    babelQueryJsx = {
        presets: ['stage-2', 'react'],
        plugins: ['syntax-dynamic-import']
    },
    nodeModulesExcludeRx = /(node_modules)/;

// module.exports = Object.keys(languages).map((language) => ({
let language = 'en';
module.exports = {
    entry: {
        necktie: path.join(JS_ROOT, 'src/index.js'),
        vendor: [
            'react',
            'react-dom',
        ],
    },
    output: {
        path: path.join(JS_ROOT, 'dist'),
        publicPath: SERVER_PATH,
        filename: `[name].bundle.${language}.js`,
        chunkFilename: `[name].${language}.js`
    },
    // Dev server
    devServer: {
        //     hot: true, // Tell the dev-server we're using HMR
        inline: true,
        contentBase: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        port: server_port,
        host: '0.0.0.0',
        public: server_domain,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },


    module: {
        rules: [
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader'
                    ]
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },


            {
                test: /\.jsx$/,
                exclude: nodeModulesExcludeRx,
                use: [{
                    loader: 'babel-loader',
                    options: babelQueryJsx
                }]
            },
            {
                test: /\.js$/,
                exclude: [nodeModulesExcludeRx],
                use: [{
                    loader: 'babel-loader',
                    options: babelQuery
                }]

            }
        ]
    },
    plugins: [
        // timestamp plugin
        function() {
            this.plugin('watch-run', function(watching, callback) {
                console.log('Begin compile at ' + new Date());
                callback();
            });
        },
        // new webpack.HotModuleReplacementPlugin(),
        // Global variables
        new webpack.DefinePlugin({
            DEVELOPMENT: true
        }),
        // Common chunks (vendor etc.)
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js'
        }),
        // Common chunk with all webpack metadata
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),
        // CSS file extraction
        new ExtractTextPlugin({
            filename: '[name].styles.css',
            allChunks: true // need for dev server
        }),

        new HtmlWebpackPlugin({
            title: 'custom template',
            template: path.resolve(JS_ROOT, 'src/index.html')
        })
    ],

    // Directory and modules path resolving
    resolve: {
        mainFields: ['browser', 'module', 'main'],
        modules: ['node_modules'],
    },

    // Orher settings
    target: 'web',
    devtool: 'source-map',

    // watch options
    watchOptions: {
        aggregateTimeout: 500, // in ms
        ignored: /node_modules/
    }
};
