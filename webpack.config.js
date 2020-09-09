const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');
// const isDev = process.env.NODE_ENV === 'development';
const isDev = process.argv.mode === 'production';

module.exports = (env, argv) => ({
    entry: './src/index.jsx',
    output: {
        filename: 'main.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/'
    },
    devtool: argv.mode === "production" ? 'hidden-source-map' : 'source-map',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new MiniCssPlugin(),
        new HtmlPlugin({
            template: './src/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?/i,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g)/i,
                use: 'file-loader'
            },
            {
                test: /\.svg$/,
                use: {
                    loader: 'svg-url-loader',
                    options: {
                        encoding: 'base64'
                    }
                }
            },
            {
                test: /\.(s*)css$/i,
                use: [
                    MiniCssPlugin.loader,
                    // Translates CSS into CommonJS
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName :
                                    isDev ?
                                    '[path][name]__[local]' :
                                    '[hash:base64]'
                            }
                        }
                    },
                    // Compiles Sass to CSS
                    'sass-loader'
                ]
            }
        ]
    },
    devServer: {
        port: 9000,
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: { index: '/' },
        hot: true,
        // headers: {
        //     "Access-Control-Allow-Origin": "*",
        //     "Access-Control-Allow-Credentials": "true",
        //     "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        //     "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        // }
    }
});