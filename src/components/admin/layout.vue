<template>
    <div class="tmpl">
        <!--elementUI的布局组件实现布局-->
        <el-row>
            <!--左边菜单-->
            <el-col :span="mleftspan" ref="menus">               
                <!--顶部logo-->
                <img src="/statics/imgs/logo.png" alt="">
                <!--菜单列表 class="layout menu" 设定菜单高度和离上面图片的距离-->
                <div class="layout menu">
                    <el-menu :default-active="this.$store.state.global.menuActiveNo" :unique-opened="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                        :collapse="isCollapse">
                        <!--学员问题汇总-->
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-message"></i>
                                <span slot="title">学员问题汇总</span>
                            </template>
                            <el-menu-item-group>
                                <router-link to="/admin/questionarticlelist"><el-menu-item index="1-1"> <i class="el-icon-document"></i>内容管理</el-menu-item></router-link>
                                <router-link to="/admin/questioncatelist"><el-menu-item index="1-2"><i class="el-icon-document"></i>类别管理</el-menu-item></router-link>
                                <el-menu-item index="1-3"><i class="el-icon-document"></i>评论管理</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <!--前端常用功能-->
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-message"></i>
                                <span slot="title">前端常用功能</span>
                            </template>
                            <el-menu-item-group>
                               <router-link to="/admin/commonarticlelist"><el-menu-item index="2-1"> <i class="el-icon-document"></i>内容管理</el-menu-item></router-link>
                              <router-link to="/admin/commoncatelist"><el-menu-item index="2-2"><i class="el-icon-document"></i>类别管理</el-menu-item></router-link>
                                <el-menu-item index="2-3"><i class="el-icon-document"></i>评论管理</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <!--重难点专区-->
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-message"></i>
                                <span slot="title">重难点专区</span>
                            </template>
                            <el-menu-item-group>
                                 <router-link to="/admin/pointarticlelist"><el-menu-item index="3-1"> <i class="el-icon-document"></i>内容管理</el-menu-item></router-link>
                                 <router-link to="/admin/pointcatelist"><el-menu-item index="3-2"><i class="el-icon-document"></i>类别管理</el-menu-item></router-link>
                                  <el-menu-item index="3-3"><i class="el-icon-document"></i>评论管理</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <!--资源下载-->
                        <el-submenu index="4">
                            <template slot="title">
                                <i class="el-icon-message"></i>
                                <span slot="title">资源下载</span>
                            </template>
                            <el-menu-item-group>
                                <router-link to="/admin/downarticlelist"><el-menu-item index="4-1"> <i class="el-icon-document"></i>内容管理</el-menu-item></router-link>
                              <router-link to="/admin/downcatelist"><el-menu-item index="4-2"><i class="el-icon-document"></i>类别管理</el-menu-item></router-link>
                                <el-menu-item index="4-3"><i class="el-icon-document"></i>评论管理</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </div>
            </el-col>

            <!--右边-->
            <el-col :span="mrightspan">
                <!--顶部-->
                <el-row>
                    <el-col :span="10">
                        <div class="topbg">
                            <i class="layout el-icon-menu area" @click="toggle"></i>
                        </div>
                    </el-col>
                    <el-col :span="14">
                        <div class="topbg">
                            <i class="mui-icon mui-icon-contact mui-icon-icon-contact-filled"></i>
                            <span>你好,admin</span>
                            <el-dropdown class="lineleft hand">
                                <span class="el-dropdown-link">
                                <i class="el-icon-caret-bottom el-icon--right"> 功能</i>
                            </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item><a href="#">预览网站</a></el-dropdown-item>
                                    <el-dropdown-item><a href="#">修改密码</a></el-dropdown-item>
                                    <el-dropdown-item><a href="#">注销登录</a></el-dropdown-item>                                  
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </el-col>
                </el-row>

                <!--内容-->
                <el-row>
                    <el-col :span="24">                        
                         <router-view></router-view>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isCollapse: false,
                mleftspan: 4,
                mrightspan: 20
            };
        },
        methods: {
            toggle() {
                this.isCollapse = !this.isCollapse;
                //isCollapse=true表示折叠菜单
                if (this.isCollapse) {

                    // this.$refs.menus.$el.style = "width:65px";
                    this.mleftspan = 1;
                    this.mrightspan = 23;
                } else {

                    // this.$refs.menus.$el.style = "width:180px";
                    this.mleftspan = 4;
                    this.mrightspan = 20;
                }
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },created(){
          
        }
    }

</script>

<style class="scoped">
a{
    color: white;
}
</style>