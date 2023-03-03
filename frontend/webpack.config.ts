import webpack, {WebpackPluginInstance} from "webpack";
import * as path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import 'webpack-dev-server'

const plugins: WebpackPluginInstance[] = [
    new HtmlWebpackPlugin({
        template: './static/index.html',
    }),
];

const styleLoaders:webpack.RuleSetRule = {
    test: /\.(scss)$/,
    include: path.resolve(__dirname, 'src'),
    use: [
        {
            loader: 'style-loader'
        },
        {
            loader: 'css-loader'
        },
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: () => [
                        require('autoprefixer')
                    ]
                }
            }
        },
        {
            loader: 'sass-loader'
        }
    ]
}

const config: webpack.Configuration = {
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    entry: './src/index.ts',
    module: {
        rules: [{
            include: path.resolve(__dirname, 'src'),
            test: /\.tsx?$/,
            use: {
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                }
            },
            exclude: /node_modules/
        },
            styleLoaders]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 8081,
        client: {
            overlay: false,
        }
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 50,
    },
    devtool: 'eval',
    plugins
}

export default config;