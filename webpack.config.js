var htmlwp = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

//分离css，此组件能将所有import的css文件打包到一个css中
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports={
   entry:{
    build:'./src/main.js',// build 可以随意写
    vendor1:['vue','axios','vue-router','vuex'],  //vue相关的打包到vendor1中
    vendor2:['element-ui'], //UI组件 相关的打包到vendor2中
    // vendor3:['easyscroll'],
    vendor4:['vue-quill-editor']
  },  //指定打包的入口文件
  output:{
  	path : __dirname+'/dist',  // 注意：webpack1.14.0 要求这个路径是一个绝对路径
  	// filename:'build.js'
    filename: "[name].js",
    publicPath: ''
  },
  resolve: {
   extensions: ['.js', '.vue']
  },
  module:{
  	rules:[
  		{
  			test: /\.css$/,  //打包 .css文件
  			// loader:'style-loader!css-loader'
        loader:ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"})
  		},
      {
        test: /\.scss$/,  //打包 .scss文件
        loader:'style-loader!css-loader!sass-loader'
      },
       {
        test: /\.less/,  //打包 .less文件
        loader:'style-loader!css-loader!less-loader'
      }
      ,
       { 
        test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2)$/,  //打包 url请求的资源文件
        loader:'url-loader?limit=20000' //limit表示图片的大小为20K是临界值，小于20K的图片均被打包到build.js中去，请求图片就会很快
      },
      // {
      //   test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
      //   loader: 'file-loader'
      // },
       {
        test: /\.js$/,  // 将.js文件中的es6语法转成es5语法
        loader:'babel-loader',
        exclude:/node_modules/ 
      },
       {
        test: /.vue$/,  // 解析 .vue 组件页面文件
        loader:'vue-loader' //
      }
  	]
  },
  // 由于webpack2.0和3.0本身已经支持es6转es5语法了，所以这个地方的配置是可以删除掉了
  // babel:{
  //   presets:['es2015'],  // 配置将es6语法转换成es5语法
  //   plugins:['transform-runtime']
  // },
    plugins:[
        new htmlwp({
          title: '首页',  //生成的页面标题<head><title>首页</title></head>
          filename: 'index.html', //webpack-dev-server在内存中生成的文件名称，自动将build注入到这个页面底部，才能实现自动刷新功能
          template: 'index1.html' //根据index1.html这个模板来生成(这个文件请程序员自己生成)
        }),
        // 代码压缩
      //  new webpack.optimize.UglifyJsPlugin({
      //   compress: {
      //     warnings: false
      //   }
      //   }),
        new webpack.optimize.CommonsChunkPlugin({
        // 这里写的时候要和定义的时候相反，也就是定义的时候是先定义vendor1，那么在使用的时候就要后使用vendor1
          names: ['vendor4','vendor2','vendor1']  
      }),
      new ExtractTextPlugin("site.css"),  //打包完成后最终输出一个名称叫做site.css的文件到dist中
    ]
}