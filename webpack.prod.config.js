const MockPlugin = require('./mock/mock.plugin')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    context: path.resolve(__dirname, 'src'),
    entry: './index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public'),
        clean: true,
    },
    devServer: {
        server: 'http',
        port: 8080,
        historyApiFallback: true,
        hot: true,
        compress: true,
        static: {
            directory: path.join(__dirname, 'public'),
        },
        proxy: [{
            context: ['/api'],
            target: 'http://localhost:3000',
            secure: false,
        }]
    },
    plugins: [new HtmlWebpackPlugin({
      favicon : '',
      meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no"
      },
      title : "React Tailwind",
      filename: 'index.html',
      template : "assets/index.html"
    }), new MockPlugin({ msg : 'MockPlugin' })],
    module: {
        rules: [
          {
            test: /\.(?:js)$/,
            exclude: [/node_modules/, /public/],
            use: {
              loader: 'babel-loader',
              options: {
                targets: "defaults",
                presets: [ "@babel/preset-env", ["@babel/preset-react", {"runtime": "automatic"}] ]
              }
            }
          },
          {
            test: /\.(?:jsx)$/,
            exclude: [/node_modules/, /public/],
            use: {
              loader: 'babel-loader',
              options: {
                targets: "defaults",
                presets: [ '@babel/preset-react' ]
              }
            }
          },
          {
            test: /\.css$/i,
            use: [
              { loader: "style-loader" },
              { loader: "css-loader" },
              { loader: "postcss-loader" }
            ]
          },
          {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loader: 'file-loader',
              },
            ],
          }
        ]
    }
};