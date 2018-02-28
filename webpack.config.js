const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const Dotenv = require('dotenv-webpack');

const config = (env) => {
    const isProduction = !!env.production;
    const publicPath = resolvePath('public/');
    const exclude = /(node_modules|public|__tests__)/;
    const bundleCss = new ExtractTextPlugin('bundle.css');

    const styleLoader = [
        'css-loader',
        'postcss-loader',
        'sass-loader',
    ];

    const htmlSinglePage = new HtmlWebpackPlugin({
        filename: 'index.html',
        template: resolvePath('src/index.html'),
        favicon: resolvePath('src/images/favicon.ico'),
        hash: true,
    });

    const eslintRules = !isProduction ? {} : {
        'no-console': [2, { allow: ['warn', 'error'] }],
    };

    return {
        devtool: isProduction
            ? 'hidden-source-map'
            : 'cheap-module-eval-source-map',
        resolve: { extensions: ['.js', '.jsx'] },
        context: resolvePath('src'),
        entry: './index.js',
        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.(js|jsx)$/,
                    exclude,
                    loader: 'eslint-loader',
                    options: {
                        fix: true,
                        failOnError: isProduction,
                        rules: eslintRules,
                    },
                },
                {
                    exclude,
                    test: /\.(js|jsx)$/,
                    use: 'babel-loader',
                },
                {
                    exclude,
                    test: /\.s*css$/,
                    use: isProduction ? bundleCss.extract(styleLoader) : ['style-loader', ...styleLoader],
                },
                {
                    exclude,
                    test: /\.(png|jpg)$/,
                    use: 'file-loader?name=[path][name].[ext]',
                },
                {
                    test: /\.svg$/,
                    include: resolvePath('src/svg'),
                    use: [
                        {
                            loader: 'svg-sprite-loader',
                            options: {
                                extract: true,
                            },
                        },
                        {
                            loader: 'svgo-loader',
                            options: {
                                plugins: [
                                    {
                                        removeAttrs: { attrs: '(fill|fill-opacity|stroke|stroke-width)' },
                                    },
                                ],
                            },
                        },
                    ],
                },
                {
                    exclude,
                    test: /\.json$/,
                    use: 'file-loader?name=data/[name].[ext]',
                },
                {
                    exclude,
                    test: /\.(eot|ttf|woff|woff2)$/,
                    use: 'file-loader?name=fonts/[name].[ext]',
                },
                {
                    exclude,
                    test: /robots\.txt$/,
                    use: 'file-loader?name=robots.txt',
                },
            ],
        },
        output: {
            filename: '[name].js',
            path: publicPath,
        },
        plugins: [
            new webpack.DefinePlugin({
                IS_PRODUCTION: JSON.stringify(isProduction),
            }),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new SpriteLoaderPlugin(),
            bundleCss,
            htmlSinglePage,
            new Dotenv({
                path: './.env', // Path to .env file (this is the default)
                // safe: true // load .env.example (defaults to "false" which does not use dotenv-safe)
            }),
        ],
        devServer: {
            contentBase: publicPath,
            host: '0.0.0.0',
            port: 9000,
            stats: 'minimal',
            historyApiFallback: true,
        },
    };

    function resolvePath(toResolve) {
        return path.resolve(__dirname, toResolve);
    }
};

module.exports = config;
