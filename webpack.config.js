const webpack=require('webpack');
const path=require('path');
const htmlwebpackplugin=require('html-webpack-plugin');
module.exports={
	entry:{
		"main":"./src/main.es",
	},
	output:{
		path:path.join(__dirname,"./build"),
		publicPath:'./build',
		filename:'[name].js'
	},
	// devServer: { //新增配置项
 //        contentBase: path.join(__dirname, "/index.html"),
 //        port: 8080
 //    },
	module:{
		rules:[
		{
			test:/\.es$/,
			use:[{
				loader:"babel-loader",
				options:{
				    "presets":[
				        ['es2015',{
				            'modules':false
				        }],"stage-0"
				    ]
				}
			}]
		},{
			test:/\.vue$/,
			use:[{
				loader:"vue-loader",
			}]
		}]
	},
	plugins:[
		new webpack.optimize.CommonsChunkPlugin({
			name:'common',
			filename:'[name].js',
			minChunks:2
		}),
		new htmlwebpackplugin({
			filename:'../index.html',
			template:'./src/view/index.html',
			inject:true
		}),
	]
}