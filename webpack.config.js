const webpack=require('webpack');
const path=require('path');
const htmlwebpackplugin=require('html-webpack-plugin');
module.exports={
	entry:{
		"main":"./src/main.js",
	},
	output:{
		path:path.join(__dirname,"./build"),
		filename:'[name].js'
	},
	module:{
		rules:[
		{
			test:/\.js$/,
			use:[{
				loader:"babel-loader",

			}],
			exclude: path.resolve(__dirname, "./node_modules")
		}
		,{
			test:/\.vue$/,
			use:[{
				loader:"vue-loader",
			}]
		}
		]

	},
	//devtool:'cheap-module-eval-source-map',
	plugins:[
		new webpack.optimize.CommonsChunkPlugin({
			name:'common',
			filename:'[name].js',
			minChunks:2
		}),
		new htmlwebpackplugin({
			filename:'./index.html',
			template:'./src/view/index.html',
			inject:true
		}),
	]
}