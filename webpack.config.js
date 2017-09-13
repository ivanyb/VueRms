var htmlwp = require('html-webpack-plugin');

module.exports={
  entry:'./src/main.js',  //指定打包的入口文件
  output:{
  	path : __dirname+'/dist',  // 注意：webpack1.14.0 要求这个路径是一个绝对路径
  	filename:'build.js'
  },
  resolve: {
   extensions: ['.js', '.vue']
  },
  module:{
  	rules:[
  		{
  			test: /\.css$/,  //打包 .css文件
  			loader:'style-loader!css-loader'
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
        })
    ]
}