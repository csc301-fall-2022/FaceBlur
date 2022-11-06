import path from "path";
import webpack, {Configuration} from "webpack";
import * as webpackDevServer from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import packageJSON = require("./package.json");
import {TsconfigPathsPlugin} from "tsconfig-paths-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

const config: webpack.Configuration = {};

const webpackConfig = (env: {production: any; development: any}): Configuration => ({
    entry: "./src/index.tsx",
    ...(env.production || !env.development ? {} : {devtool: "eval-source-map"}),
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".css", ".scss"],
        plugins: [new TsconfigPathsPlugin()]
    },
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "build.js",
        publicPath: "/"
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
            // {
            //     test: /\.css$/,
            //     use: ["style-loader", "css-loader"]
            // },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: require.resolve("style-loader"),
                        options: {
                            esModule: false
                        }
                    },
                    {
                        loader: require.resolve("dts-css-modules-loader"),
                        options: {
                            namedExport: true
                        }
                    },
                    {
                        loader: require.resolve("css-loader"),
                        options: {
                            modules: {
                                exportLocalsConvention: "camelCaseOnly",
                                localIdentName: "[hash:base64:5]"
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "public/",
                            publicPath: "/",
                            esModule: false
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        host: "0.0.0.0",
        proxy: {
            "/api": {
                target: "http://ui:8080",
                router: () => "http://backend:3000",
                logLevel: "debug"
            }
        }
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
