
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    main:path.resolve(__dirname, "./app/app.js")
  },
  output:{
	  path:path.resolve(__dirname,'./dist'),
	  filename:'[name].Naruto.js'
  },
  module: {
	rules:[
		{test: /\.css$/, use: ['style-loader','css-loader']},
		{
			test:/\.(png|jpg|jeg|gif|svg)$/,
			use: ['url-loader?limit=100&name=images/[name].[ext]']
		},
		{
			test:/\.(js|jsx)$/,
			exclude:/node_modules/,
			use:{
				loader: 'babel-loader',
				options:{
					presets:['es2015','react'],
					plugins: [["import", { libraryName: "antd", style: "css" }]]
				}
			}
		}
	]  
  },
  resolve:{
	  extensions: ['.js','.jsx','.json'],
	  alias:{
		  assets:path.resolve(__dirname,'./app/assets'),
		  components: path.resolve(__dirname,'./app/components'),
		  config: path.resolve(__dirname,'./app/config'),
		  action: path.resolve(__dirname, './app/action')
	  }
  },
  devServer: {
	  hot:true,
	  inline:true,
	  port:8889
  },
  plugins: [
	 new webpack.HotModuleReplacementPlugin(),
	 new HtmlWebpackPlugin({
		 template: './app/index.html',
		 inject: "body",
		 minify:{
			removeComponents:true,
			collapseWhitespace:false
		}
	 })
  ]
};
