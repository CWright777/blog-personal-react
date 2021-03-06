const path = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const Neat = require('node-neat').includePaths.concat('./node_modules/breakpoint-sass/stylesheets/')
const AnimateSCSS = require('animate.scss').includePaths
//const Compass = require('compass-mixins/lib/compass')

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

process.env.BABEL_ENV = TARGET;

const common = {
  entry: {
    app: ['babel-polyfill',PATHS.app]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    //publicPath: 'https://blog.cliffordwright.com/'
  },
  module: {
    loaders: [
      //{
        //test: /\.scss$/,
        //loader: "style!css!sass?includePaths[]= " +  sassPaths,
        //include: PATHS.app,
      //},
      {
        test: /\.scss$/,
        loader: "style!css!sass?includePaths[]=" + [Neat[0][0],Neat[1],AnimateSCSS[0],path.resolve(__dirname, "./node_modules/compass-mixins/lib")],
        include: PATHS.app
      },
      {
        test: /\.css$/,
        loader: 'style!css?sourceMap' 
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      },
      //{
        //test: /\.css$/,
        //loaders: ['style', 'css'],
        //include: PATHS.app,
      //},
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.app,
      },
      {
        test: /\.json$/, loader: 'json' 
      }
    ]
  }
};

// Default configuration
if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      contentBase: PATHS.build,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new Webpack.HotModuleReplacementPlugin(),
      new NpmInstallPlugin({
        save: true // --save
      })
    ]
  });
}

if(TARGET === 'build') {
  module.exports = merge(common, {
    devtool: 'cheap-module-source-map',
    plugins: [
      new Webpack.optimize.CommonsChunkPlugin('common.js'),
      new Webpack.optimize.DedupePlugin(),
      new Webpack.optimize.UglifyJsPlugin(),
      new Webpack.optimize.AggressiveMergingPlugin()
    ]
  });
}

