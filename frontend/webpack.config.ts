import path from "path";
import webpack, {Configuration} from "webpack";
import * as webpackDevServer from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import packageJSON = require("./package.json");
import {TsconfigPathsPlugin} from "tsconfig-paths-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

const webpackConfig = (env: {production: any; development: any}): Configuration => ({
    entry: "./src/index.tsx",
    ...(env.production || !env.development ? {} : {devtool: "eval-source-map"}),
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        plugins: [new TsconfigPathsPlugin()]
    },
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "build.js",
        publicPath: "/"
    },
    devServer: {
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true
                },
                exclude: /dist/
            },
            {
                rules: [
                    {
                        test: /\.css$/,
                        use: ["style-loader", "css-loader"]
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            favicon: "./public/favicon.ico"
        }),
        new webpack.DefinePlugin({
            "process.env.PRODUCTION": env.production || !env.development,
            "process.env.NAME": JSON.stringify(packageJSON.name),
            "process.env.VERSION": JSON.stringify(packageJSON.version)
        }),
        new ForkTsCheckerWebpackPlugin(),
        new ESLintPlugin({files: "./src/**/*.{ts,tsx,js,jsx}"}),
        new CopyWebpackPlugin({
            patterns: [{from: "./public/favicon.ico"}]
        })
    ]
});

export default webpackConfig;
