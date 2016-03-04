var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: './src/js/index.js',
  output: {
    path: './dist/webpack/js',
    publicPath: './dist/webpack/js',
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        // make sure to exclude 3rd party code in node_modules
        exclude: /node_modules/
      },
       { 
        test: /\.jade$/, 
        loader: "template-html" 
      },
       { 
        test: /\.styl$/, 
        loader: "style!css!stylus" 
      }
      ,
      {
        // edit this for additional asset file types
        test: /\.(png|jpg|gif)$/,
        loader: 'url',
        // query: {
        //   // // inline files smaller then 10kb as base64 dataURL
          limit: 1000,
        //   // // fallback to file-loader with this naming scheme
          name: '[name].[ext]?[hash]'
        // }
      }
    ]
  },
  // vue-loader config:
  // lint all JavaScript inside *.vue files with ESLint
  // make sure to adjust your .eslintrc
  vue: {
    loaders: {
      js: 'babel',
      css: ExtractTextPlugin.extract("css"),
      // you can also include <style lang="less"> or other langauges
      less: ExtractTextPlugin.extract("css!less")
    }
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  plugins: [
    new ExtractTextPlugin("../css/style.css")
  ]
}
