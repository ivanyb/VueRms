<template>
    <div class="arttmpl">
        {{this.tablename}}
        <!--1.0 面包屑-->
        <div class="abread bt-line">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>知识内容</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>类别管理</el-breadcrumb-item>
                {{menuno}}
            </el-breadcrumb>
        </div>
        <!--2.0 操作区域-->
        <div class="operation">
            <el-row>
                <el-col :span="24">
                   <router-link v-bind="{to:'/admin/'+tablename+'cateadd'}"> <el-button size="small" :plain="true" type="info" icon="plus">新增</el-button></router-link>
                    <el-button size="small" :plain="true" type="info" icon="check">全选</el-button>
                    <el-button size="small" :plain="true" type="info" icon="delete">删除</el-button>
                </el-col>
               
            </el-row>
        </div>
        <!--3.0 列表区域-->
        <el-row>
            <el-table ref="multipleTable" :data="tableData3" border tooltip-effect="dark" 
            style="width: 100%"  height="450" @selection-change="handleSelectionChange"
             v-loading="loading"
             element-loading-text="拼命加载中">
                <el-table-column  type="selection" width="70">
                </el-table-column>
                <el-table-column label="编号" width="70" prop="category_id">                    
                </el-table-column>
                <el-table-column label="类别名称">
                    <template scope="scope">
                        <span v-if="scope.row.class_layer>1"><span v-for="item in scope.row.class_layer">&nbsp;</span>|-</span>
                       <router-link class="listedit" v-bind="{to:'/admin/'+tablename+'cateedit/'+scope.row.category_id}"> {{ scope.row.title }}</router-link>
                        </template>
                </el-table-column>
                  <el-table-column label="排序号" width="100">      
                      <template scope="scope">                     
                      <input style="width:40px;padding:3px;border:1px solid rgba(0,0,0,0.1)" type="text" :value="scope.row.sort_id">
                      </template>              
                </el-table-column>
                 <el-table-column label="层级" width="70" prop="class_layer">
                </el-table-column>
                <el-table-column label="操作" width="140">
                    <template scope="scope">
                        <router-link class="listedit" v-bind="{to:'/admin/'+tablename+'cateadd/'+scope.row.category_id+'/'+scope.row.sort_id+'/'+(scope.row.class_layer+1)}"> 
                        添加子类
                        </router-link>
                        <router-link class="listedit" v-bind="{to:'/admin/'+tablename+'cateedit/'+scope.row.category_id}"> 修改</router-link>
       
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script>
    export default {
        props:['tablename'],
        data() {
            return {
                tableData3: [
                //     {
                //     date: '2016-05-03',
                //     name: '王小虎',
                //     address: '上海市普陀区金沙江路 1518 弄'
                // }
                ],
                selectedList: [],
                searchval:'',
                loading:false                
            }
        },
        methods: {
            // 获取分类数据
            getlist(){
                this.loading =true;
                var url = this.dataAPI +'/category/getlist/'+this.tablename;
                this.$http.get(url).then(res=>{
                    this.loading =false;
                   this.tableData3 = res.data.message;
                }).then(err=>{
                    this.loading =false;
                });
            },
            handleSelectionChange(val) {
                this.selectedList = val;
            },
            // 搜索数据
            handleIconClick(){

            }
        },
        computed: {
            menuno() {
                return this.$store.state.global.menuActiveNo;
            }
        },
        created(){
            this.getlist();
        }
    }

</script>

<style class="scoped">
    .abread {
        padding: 10px;
    }
</style>