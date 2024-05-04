const HtmlWebpackPlugin = require("html-webpack-plugin");
const FilemanagerWebpackPlugin = require("filemanager-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const ImageMinimizerWebpackPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
    entry: path.join(__dirname, "src", "index.tsx"),
    output: {
        path: path.join(__dirname, "dist"),
        filename: "index[contenthash:8].js",
        assetModuleFilename: path.join('images', '[name].[contenthash][ext]'),
    },
    mode: "development",
    module: {
        rules: [
            // {
            //     test: /\.(js|jsx)$/,
            //     exclude: /node_modules/,
            //     use: "babel-loader",
            // },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: "asset/resource"
            },
            {
                test: /\.svg$/,
                type: 'asset/resource',
                generator: {
                    filename: path.join('icons', '[name].[contenthash][ext]'),
                },
            },
            {
                test: /\.(html)$/,
                use: ['html-loader']
            },
            {
                test: /\.(woff2|eot|ttf|otf)$/i,
                type: "asset/resource"
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "template.html"),
            filename: "index.html",
        }),
        new FilemanagerWebpackPlugin({
            events: {
                onStart: {
                    delete: ["dist"]
                },
                onEnd: {
                    copy: [
                        {
                            source: path.join(__dirname, "src", "static"),
                            destination: "dist"
                        }
                    ]
                }
            }
        }),
        new MiniCssExtractPlugin({
            filename: "main[contenthash:8].css",
        })
    ],
    devServer: {
        watchFiles: path.join(__dirname, "src"),
        port: 8000,
        open: true,
        hot: true,
        liveReload: true,
    },
    optimization: {
        minimizer: [
            new ImageMinimizerWebpackPlugin({
                minimizer: {
                    implementation: ImageMinimizerWebpackPlugin.imageminMinify,
                    options: {
                        plugins: [
                            ["gifsicle", { interlaced: true }],
                            ["jpegtran", { progressive: true }],
                            ["optipng", { optimizationLevel: 5 }],
                            ["svgo", { name: "preset-default" }]
                        ]
                    }
                }
            })
        ]
    }
}