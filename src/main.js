// 1.0 导入vue核心包
import Vue from 'vue';
// Vue.config.debug = true;
// 导入axios来替代vue-resource进行ajax请求
import axios from 'axios';
// 全局请求的基本url
Vue.prototype.dataAPI = axios.defaults.baseURL = 'http://127.0.0.1:8899';
//post请求内容类型
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// withCredentials配置为true表示在ajax请求中携带cookie信息，默认是false
axios.defaults.withCredentials=true;

Vue.prototype.$http = axios;
// 导入elementui
import ElementUI from 'element-ui';
import '../statics/theme_rms/index.css';
Vue.use(ElementUI); 

// 美观的滚动条组件
import EasyScroll from 'easyscroll';
Vue.use(EasyScroll);

// 2.0 导入App.vue的vue对象
import App from './App.vue'; 
import alayout from './components/admin/layout.vue';

import login from './components/admin/account/login.vue';

// 学员问题汇总
import questionarticlelist from './components/admin/question/questionartlist.vue';
import questionartadd from './components/admin/question/artadd.vue';
import questionartedit from './components/admin/question/artedit.vue';

import questioncatelist from './components/admin/question/categorylist.vue';
import questioncateadd from './components/admin/question/categoryadd.vue';
import questioncateedit from './components/admin/question/categoryedit.vue';

// 前端常用功能
import commonarticlelist from './components/admin/common/commonartlist.vue';
import commonartadd from './components/admin/common/artadd.vue';
import commonartedit from './components/admin/common/artedit.vue';

import commoncatelist from './components/admin/common/categorylist.vue';
import commoncateadd from './components/admin/common/categoryadd.vue';
import commoncateedit from './components/admin/common/categoryedit.vue';


// 重难点专区
import pointarticlelist from './components/admin/point/pointartlist.vue';
import pointartadd from './components/admin/point/artadd.vue';
import pointartedit from './components/admin/point/artedit.vue';

import pointcatelist from './components/admin/point/categorylist.vue';
import pointcateadd from './components/admin/point/categoryadd.vue';
import pointcateedit from './components/admin/point/categoryedit.vue';


// 资源下载
import downarticlelist from './components/admin/down/downartlist.vue';
import downartadd from './components/admin/down/artadd.vue';
import downartedit from './components/admin/down/artedit.vue';

import downcatelist from './components/admin/down/categorylist.vue';
import downcateadd from './components/admin/down/categoryadd.vue';
import downcateedit from './components/admin/down/categoryedit.vue';

// 购物商城
import goodslist from './components/admin/goods/goodslist.vue';
import goodsadd from './components/admin/goods/goodsadd.vue';
import goodsedit from './components/admin/goods/goodsedit.vue';

import goodscatelist from './components/admin/goods/goodscatelist.vue';
import goodscateadd from './components/admin/goods/categoryadd.vue';
import goodscateedit from './components/admin/goods/categoryedit.vue';

// 3.0 将vue-router集成到这个项目中来
import vueRouter from 'vue-router';
// 3.0.1 将vueRouter对象绑定到Vue对象上
Vue.use(vueRouter);

import store from './stores/index.js';

// 3.0.2 定义路由规则
var router = new vueRouter({
	linkActiveClass :'',
	routes:[
		// {path:'/login',component:login}, 
		// {path:'/register',component:register}
		{name:'login',path:'/admin/login',component:login,meta:{nologin:true}},  //登录组件
		{path:'/',redirect:'/admin'},
		{
			path:'/admin',
			component:alayout,
			children:[
				// //学员问题汇总-内容管理
				{name:'questionarticlelist',path:'questionarticlelist/',component:questionarticlelist, meta: { menuno:'1-1'}},  //TODO:注意 articlelist/ 后面写上 / 才生效
				{name:'questionartadd',path:'questionartadd/',component:questionartadd, meta: { menuno:'1-1'}},
				{name:'questionartedit',path:'questionartedit/:artid',component:questionartedit, meta: { menuno:'1-1'}},
				//学员问题汇总-类别管理
				{name:'questioncatelist',path:'questioncatelist/',component:questioncatelist, meta: { menuno:'1-2'}},  //类别组件
				{name:'questioncateadd',path:'questioncateadd/:cateid?/:sortid?/:classlayer?',component:questioncateadd, meta: { menuno:'1-2'}},
				{name:'questioncateedit',path:'questioncateedit/:cateid',component:questioncateedit, meta: { menuno:'1-2'}},
		
				// //前端常用功能-内容管理
				{name:'commonarticlelist',path:'commonarticlelist/',component:commonarticlelist, meta: { menuno:'2-1'}},  //TODO:注意 articlelist/ 后面写上 / 才生效
				{name:'commonartadd',path:'commonartadd/',component:commonartadd, meta: { menuno:'2-1'}},
				{name:'commonartedit',path:'commonartedit/:artid',component:commonartedit, meta: { menuno:'2-1'}},

				//前端常用功能-类别管理
				{name:'commoncatelist',path:'commoncatelist/',component:commoncatelist, meta: { menuno:'2-2'}},  
				{name:'commoncateadd',path:'commoncateadd/:cateid?/:sortid?/:classlayer?',component:commoncateadd, meta: { menuno:'2-2'}},
				{name:'commoncateedit',path:'commoncateedit/:cateid',component:commoncateedit, meta: { menuno:'2-2'}},
		
				// //重难点专区-内容管理
				{name:'pointarticlelist',path:'pointarticlelist/',component:pointarticlelist, meta: { menuno:'3-1'}},  //TODO:注意 articlelist/ 后面写上 / 才生效
				{name:'pointartadd',path:'pointartadd/',component:pointartadd, meta: { menuno:'3-1'}},
				{name:'pointartedit',path:'pointartedit/:artid',component:pointartedit, meta: { menuno:'3-1'}},

				//重难点专区-类别管理
				{name:'pointcatelist',path:'pointcatelist/',component:pointcatelist, meta: { menuno:'3-2'}},  
				{name:'pointcateadd',path:'pointcateadd/:cateid?/:sortid?/:classlayer?',component:pointcateadd, meta: { menuno:'3-2'}},
				{name:'pointcateedit',path:'pointcateedit/:cateid',component:pointcateedit, meta: { menuno:'3-2'}},
		

				// //资源下载-内容管理
				{name:'downarticlelist',path:'downarticlelist/',component:downarticlelist, meta: { menuno:'4-1'}},  //TODO:注意 articlelist/ 后面写上 / 才生效
				{name:'downartadd',path:'downartadd/',component:downartadd, meta: { menuno:'4-1'}},
				{name:'downartedit',path:'downartedit/:artid',component:downartedit, meta: { menuno:'4-1'}},
				//资源下载-类别管理
				{name:'downcatelist',path:'downcatelist/',component:downcatelist, meta: { menuno:'4-2'}},  
				{name:'downcateadd',path:'downcateadd/:cateid?/:sortid?/:classlayer?',component:downcateadd, meta: { menuno:'4-2'}},
				{name:'downcateedit',path:'downcateedit/:cateid',component:downcateedit, meta: { menuno:'4-2'}},
		
				// 购物商城-内容管理
				{name:'goodslist',path:'goodslist/',component:goodslist, meta: { menuno:'5-1'}},  //TODO:注意 articlelist/ 后面写上 / 才生效
				{name:'goodsadd',path:'goodsadd/',component:goodsadd, meta: { menuno:'5-1'}},
				{name:'goodsedit',path:'goodsedit/:artid',component:goodsedit, meta: { menuno:'5-1'}},

				// 购物商城-类别管理
				{name:'goodscatelist',path:'goodscatelist/',component:goodscatelist, meta: { menuno:'5-2'}},  
				{name:'goodscateadd',path:'goodscateadd/:cateid?/:sortid?/:classlayer?',component:goodscateadd, meta: { menuno:'5-2'}},  
				{name:'goodscateedit',path:'goodscateedit/:cateid',component:goodscateedit, meta: { menuno:'5-2'}},  
				
			]
		}
	]
	});

// 路由钩子,实现菜单的改变给全局变量赋值
router.beforeEach((to, from, next) => {
	// console.log('meta.menuno='+to.meta.menuno);
	if (to.meta.menuno) {
		// store.state.global.menuActiveNo = to.meta.menuno;	
		 store.dispatch(store.state.global.ChangeMenuActiveNoFlag,to.meta.menuno);
		// console.log(store.state.global.menuActiveNo);
	}

	// 检查登录
	if(!to.meta.nologin){//如果路由元数据中没有设置nologin:true则表示要检查登录
		axios.get('/admin/account/islogin').then(res=>{		
			if(res.data.code =='nologin'){				
				router.push({name:'login'});				
			}
			if(res.data.code =='logined'){
				 next();
			}
		});
	}else{
		next();
	}
});

// 全局过滤器
import moment from 'moment';
Vue.filter('datefmt',(input,fmtstring)=>{
	return moment(input).format(fmtstring);
});

// 4.0 注册mint-ui
// 导入mint-ui的css文件
// import 'mint-ui/lib/style.min.css';
// // 导入mint-ui组件对象
// import mintui from 'mint-ui';
// 在Vue中全局使用mintui
// Vue.use(mintui);

// 5.0 注册mui的css样式
// import '../statics/mui/css/mui.css';
import '../statics/css/site.css';

// 5.0 利用Vue对象进行解析渲染
new Vue({
	el:'#app',
	// 使用路由对象实例
	router:router,
	store,
	// render:function(create){create(App)} //es5的写法
	render:c=>c(App)  // es6的函数写法 =>：goes to
});