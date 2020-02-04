const path = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin');
const {
    NODE_ENV = 'production',
} = process.env;
module.exports = {
    entry: './src/index.ts',
    mode: NODE_ENV,
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'ts-loader',
                ]
            }
        ]
    },
    watch: NODE_ENV === 'development',
    plugins: [
        new WebpackShellPlugin({
            onBuildEnd: ['npm run dev']
        })
    ]
}