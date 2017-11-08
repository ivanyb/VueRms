
# 在线访问

[点击在线访问][]  
 用户名：admin   密码:123456

#网站特殊文件夹说明：

```
    网站的管理系统页面和前端展示页面是放在一个项目中，所以
    components中的admin文件夹中的所有文件均为管理系统的页面
    components中的site文件夹中的所有文件均为前端展示系统的页面

    statics/site文件夹下的所有内容均为前端展示系统的页面
    statics/css下的文件均为管理系统的样式控制
    theme_rms，imgs,mui均可以为共用

```

## 一、运行这个项目的步骤：
- 先在这个文件夹中打开cmd面板，输入  npm install 
- 在cmd面板中执行 npm run dev

```

 当前webpack要升级到2.x，那么webpack-dev-server也必须使和webpack2.x匹配的，理论上讲
 webpack-dev-server肯定也是2.x版本

```
	
## 二、update 版本

- v2 elementUI的样式使用的是statics文件夹中的样式再配合site.css来实现最终效果
- v4 利用elementUI实现静态页面布局和登录布局
- v6 1、实现文章列表分页数据展示 2、实现列表页面中的功能图标，点亮和熄灭功能（为与api对接）
- v7 1、完成文章新增，编辑，全选，删除，列表功能，2、还未实现列表中的搜索功能和轮播，置顶，推荐功能
- v9 1、实现分类的编辑功能   2、集成菜单中的所有分类连接
- v10 实现商品列表分页展示数据 ，编辑商品，新增商品
- v11 在商品新增和编辑页面中利用easyscroll实现美观的滚动条 

    ```
    easyscroll使用方法：
    注意：在此项目中，需要设定EasyScrollbar 中的div的样式，设置成height:200px滚动条进入页面时自动隐藏
    设置为max-height:200px进入页面自动显示滚动条

    1、项目render函数采用jsx语法完成，项目中需要安装jsx插件，具体请访问 https://github.com/vuejs/babel-plugin-transform-vue-jsx#usage
    步骤：
    cnpm install  babel-plugin-syntax-jsx, babel-plugin-transform-vue-jsx,        babel-helper-vue-jsx-merge-props, babel-preset-es2015 --save-dev

    在 .babelrc中增加如下配置：

    {
    "presets": ["es2015"],
    "plugins": ["transform-vue-jsx"]
    }

    2、在webpack.config.js文件中的output节点后面增加
     resolve: {
        extensions: ['.js', '.vue']
        }

    3、使用步骤参考：https://garveyzuo.github.io/easyscroll.github.io/#/ 
    安装
    运行：
    cnpm i easyscroll --save 
    在main.js中使用：
    import EasyScroll from 'easyscroll';
    Vue.use(EasyScroll);

    简单应用：
    <el-row style="padding:16px 16px;">
    <el-col :span="24">
      <EasyScrollbar>
        <div  id="wrapper" style="height: 300px;">
          <div style="height: 500px;background-color: greenyellow;text-align: center;">
            最简单的应用
          </div>
        </div>
      </EasyScrollbar>
    </el-col>
  </el-row>

    说明：
    安装完easyscroll之后，在组件中直接引用EasyScrollbar组件就行，
    产生滚动条的内容作为EasyScroll的$slot插入到滚动条组件中，
    注意插入到滚动条组件中内容 需要一个外层的包裹，即上面代码中的#wrapper div，其内部才是真正动态的内容。

    配置参数：
    滚动条的主要参数：
                 opt:{
                    barColor:"#959595",   //滚动条颜色
                    barWidth:6,           //滚动条宽度
                    railColor:"#eee",     //导轨颜色
                    barMarginRight:0,     //垂直滚动条距离整个容器右侧距离单位（px）
                    barMaginBottom:0,     //水平滚动条距离底部距离单位（px)
                    barOpacityMin:0.3,      //滚动条非激活状态下的透明度
                    zIndex:"auto",        //滚动条z-Index
                    autohidemode:true,     //自动隐藏模式
                    horizrailenabled:true,//是否显示水平滚动条
                    }
     <EasyScrollbar :barOption="opt">
        <div>
            <div>
            内容
            </div>
        </div>
        </EasyScrollbar>
        <script>
        data{
            return{
            data(){
                opt:{
                    barColor:"red"
                }
            }
            }
        }
        </script>    

    ```
- v13 实现登录功能和登录检查功能

    ```

        1、登录成功以后向session中写入一个cookie带回到浏览器，并且设置path=/admin/，表示只有将来浏览器在请求api服务器admin路径下的所有api才将cookie发送给服务器，将来可以通过设置path=/site/来达到前台的登录cookie和管理页面的cookie不是同一个，区分管理系统的登录session管理和前台用户登录的session管理

        2、通过在 routes/accountRoute.js文件中定义一个 /account/islogin 来检测当前用户是否登录失效
           在vue项目中的main.js中的路由钩子函数中如果当前跳转需要登录验证，利用axios请求 /admin/account/islogin，如果返回的是 {"code":"logined"}表示session有效，如果返回是{"coee":"nologin"}表示登录失效，跳转到登录页面重新登录

    ``` 
- v14 关于vue组件中的<style scoped>研究

    ```
        把elementUI和site.css从main.js到的导入，移到了 /admin/layout.vue中的style中
          @import '../../../statics/theme_rms/index.css';
         @import '../../../statics/css/site.css';

        关于vue组件中的<style scoped>在通过vue-route加载组件和
        通过export default {component:list}加载组件样式作用节点注意点测试

        测试文件：
        1、vue-route加载组件测试文件：
        components/admin/question/categorylist.vue 
        和 components/admin/point/categorylist.vue 中对于a标签颜色的控制测试，
        效果：
         1、访问question/categorylist.vue  时a标签颜色为 orange;
         2、访问point/categorylist.vue  时a标签颜色为 greenyellow;


        2、通过export default {component:list}加载组件测试文件：
           components/admin/question/categorylist.vue 
           components/admin/point/categorylist.vue
           components/admin/subcom/catelist.vue
           效果：
            1、访问question/categorylist.vue  时表头文字颜色为 red;
            2、访问point/categorylist.vue  时表头文字颜色为 yellow;

    ```

    - v16 完成订单列表和订单修改功能

## 三、填坑

```

    1、路由path不一样，但是加载的组件是同一个的话，当url路径改变时，并不会重新加载组件，会重用已经加载好的组件
    这样做主要是为了性能考虑，但是现在这个需求是需要中心加载组件

    2、elementUI组件的属性如果是数值类型，不能直接设置，而要在data中定义一个变量利用v-bind去设置才会自动刷
    例如 <el-switch width="75"> 报错，不自动刷新，但是手动刷新浏览器宽度会生效，如果改成
    data(){return {w : 75}} ,<el-switch :width="w">就会自动刷新了

    3、在使用表单验证规则的时候，一定要保证 rules中的属性名称与data中定义的属性名称保持一致，否则规则验证无效

    4、elementUI中的select下拉组件中的 :value一定是字符串，如果是整数不会生效，做编辑的时候加载老数据时也不能自动选中 

    5、关于vue组件中的 <style scoped>中的scoped作用问题：
        1、当前 a.vue组件页面是通过vue-router加载进来的，那么在a.vue组件中的<style scoped>中编写的样式只作用于当前组件的节点，其他组件的相同节点不会被这个css作用，但是这些样式不会作用于 在a.vue中通过 export default{ components:{  list }} 注册的子组件list中的所有节点，用下面第二步可以解决问题

        2、在a.vue和b.vue中通过 export default{ components:{  list }} 注册了一个 list.vue组件，想要访问a.vue
        时list.vue中的a标签颜色分别为red,访问和b.vue时list.vue中的a标签颜色分别为green，实现方案如下：
            1、在a.vue和b.vue中定义一个<style scoped>一定要带有scoped,这样不同页面生成的data- 标识是不一样的保证样式只作用域当前组件的节点，这里假设 a.vue中生成的是 data-xxx, b.vue中生成的是 data-vvv
            <style scoped>             
            
            </style>

            2、在list.vue中的<template>中定义一个class为tmpl的div，并且定义一个不带有scoped的<style> ,一定不能写成 
            <template>
             <div class="tmpl"> <a href="#">不同颜色控制</a></div>
            </template>
            <style scoped>
            <style>
                .tmpl[data-xxx] a{
                    color:red; /*这个样式主要控制访问a.vue时a标签的颜色*/
                }
                .tmpl[data-vvv] a{
                    color:green;/*这个样式主要控制访问b.vue时a标签的颜色*/
                }
                
            </style>


```

[点击在线访问]: http://157.122.54.189:9092/admin/#/admin/login "点击在线访问"