const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const mode = process.env.NODE_ENV;
const isDev = mode === 'development';

module.exports = {
    entry: path.resolve(__dirname, 'src/index.ts'),
    output: {
        filename: '[hash].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/img/[name][ext]',
    },
    mode: mode,
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.[tj]s$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            title: 'Laptops-Store',
            filename: 'index.html',
            favicon: 'src/favicon.ico',
        }),
    ],
    devServer: {
        static: './dist',
        port: 8181, // порт default 8080
        compress: true, // сжатие gzip
        hot: isDev, // при добавлении новых модулей сразу их подключать
        historyApiFallback: true, // использование history HTML5
        open: true, // открывать браузер при запуске
        client: {
            overlay: true, // оверлей при ошибках
        },
    },
    devtool: isDev && 'eval-source-map',
};
