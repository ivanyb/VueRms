<template>
    <div class="arttmpl">
        {{baseURL1}}<br />
        
        <!--1.0 面包屑-->
        <div class="abread bt-line">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>购物商城</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>内容管理</el-breadcrumb-item>
                {{menuno}}
            </el-breadcrumb>
        </div>
        <!--2.0 操作区域-->
        <div class="operation">
            <el-row>
                <el-col :span="20">
                     <router-link to="/admin/goodsadd"> <el-button size="small" :plain="true" type="info" icon="plus">新增</el-button></router-link>
                    <el-button size="small" :plain="true" type="info" icon="check" @click="selectAll">全选</el-button>
                    <el-button size="small" :plain="true" type="info" icon="delete" @click="delselected">删除</el-button>
                </el-col>
                <el-col :span="4">
                    <el-input placeholder="请输入搜索内容" icon="search" v-model="searchval" :on-icon-click="handleIconClick">
                    </el-input>

                </el-col>
            </el-row>
        </div>
        <!--3.0 列表区域-->
        <el-row>
            <el-col :span="24">
            <el-table ref="mtable" :data="tableData3" border tooltip-effect="dark"  height="450"
             style="width: 100%" @selection-change="handleSelectionChange"
             v-loading="loading"
             element-loading-text="拼命加载中">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <!--<el-table-column label="日期" width="120">
                    <template scope="scope">{{ scope.row.date }}</template>
                </el-table-column>-->
                <el-table-column label="标题">                                                             
                    <template scope="scope">
                    <el-tooltip class="item" :open-delay="opendelay" effect="dark"
                    placement="right">
                    <div class="goodstip" slot="content">商品货号：{{scope.row.goods_no}}<br/>交易积分：{{scope.row.point}}
                    <br/>图片：<br/>
                    <img width="180" height="150" v-bind="{src:dataAPI+scope.row.img_url}"></div>
                    <router-link v-bind="{to:'/admin/goodsedit/'+scope.row.id}" class="listedit"> {{scope.row.title}}
                    </router-link>
                     </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="categoryname" label="所属类别" width="150">
                </el-table-column>
                 <el-table-column label="库存" width="90" prop="stock_quantity">
                 </el-table-column>
                  <el-table-column label="市场价" width="90" prop="market_price">
                 </el-table-column>
                  <el-table-column label="销售价" width="90" prop="sell_price">
                 </el-table-column>
                 <el-table-column label="属性" width="170">
                  <template scope="scope">
                     
                       <el-tooltip class="ls" :open-delay="tooltipOpendelay" effect="dark" content="轮播图" placement="bottom">
                        <i v-bind="{class:'el-icon-picture '+ (scope.row.is_slide ==1?'imgactive':'')}" @click="setpicture($event,scope.row.id)"></i>
                        </el-tooltip>
                      <el-tooltip class="ls" :open-delay="tooltipOpendelay" effect="dark" content="置顶" placement="bottom">
                      <i v-bind="{class:'el-icon-upload '+ (scope.row.is_top ==1?'imgactive':'')}"  @click="settop($event,scope.row.id)"></i>
                       </el-tooltip>
                        <el-tooltip class="ls" :open-delay="tooltipOpendelay" effect="dark" content="推荐" placement="bottom">
                      <i v-bind="{class:'el-icon-star-on '+ (scope.row.is_hot ==1?'imgactive':'')}"  @click="sethot($event,scope.row.id)"></i>
                       </el-tooltip>
                  </template>
                </el-table-column> 
                 <el-table-column label="操作" width="80">
                  <template scope="scope">
                      <router-link v-bind="{to:'/admin/goodsedit/'+scope.row.id}" class="listedit">修改</router-link>                                         
                  </template>
                </el-table-column> 
            </el-table>
            </el-col>
        </el-row>

        <el-row class="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
             :current-page="pageIndex" :page-sizes="[10,20,50,100,200]"
                :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
            </el-pagination>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {    
                opendelay:500,    
                tablename:'goods',    
                loading:false, //加载中图标控制
                isSelectAll:false, //全选和反选择   
                pageSize:10,
                pageIndex:1,
                totalCount:0,
                tooltipOpendelay:1000,
                tableData3: [
                //     {
                //     id:1,
                //     date: '2016-05-03',
                //     name: '王小虎',
                //     address: '上海市普陀区金沙江路 1518 弄'
                // }, {
                //       id:2,
                //     date: '2016-05-02',
                //     name: '王小虎',
                //     address: '上海市普陀区金沙江路 1518 弄'
                // }
                ],
                selectedlist: [],  //存储选中的行对象
                searchval:'',
                currentPage4: 1
            }
        },      
        methods: {
            getlist(){
                this.loading = true;
                this.$http.get(`/goods/getlist?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`)
                .then(res=>{
                    this.loading = false;
                    this.tableData3 = res.data.message;
                    this.totalCount = res.data.totalcount;
                })
                .catch(err=>{
                    this.loading = false;
                    this.$notify.error({title:'错误',message:err.message});
                });
            },
            setpicture(e,id){
                console.log(id);
                //   console.log(_this.currentTarget);
                var classattr =e.currentTarget.getAttribute('class');
                if(classattr.indexOf('imgactive')>-1){
                    classattr = classattr.replace('imgactive','');
                }else{
                     classattr+=' imgactive'
                }              
                e.currentTarget.setAttribute('class',classattr);
            },
             settop(e,id){
                console.log(id);
                //   console.log(_this.currentTarget);
                var classattr =e.currentTarget.getAttribute('class');
                if(classattr.indexOf('imgactive')>-1){
                    classattr = classattr.replace('imgactive','');
                }else{
                     classattr+=' imgactive'
                }              
                e.currentTarget.setAttribute('class',classattr);
            },
             sethot(e,id){
                console.log(id);
                //   console.log(_this.currentTarget);
                var classattr =e.currentTarget.getAttribute('class');
                if(classattr.indexOf('imgactive')>-1){
                    classattr = classattr.replace('imgactive','');
                }else{
                     classattr+=' imgactive'
                }              
                e.currentTarget.setAttribute('class',classattr);
            },
            //全选和反选
            selectAll(){
                this.isSelectAll = !this.isSelectAll;
                if(this.isSelectAll){
                    //全选
                    this.tableData3.forEach(row => {                 
                        this.$refs.mtable.toggleRowSelection(row);
                    });
                }else{      
                     //反选             
                    this.$refs.mtable.clearSelection();
                }                
            },
            handleSelectionChange(val) {
                // console.log(val);
                this.selectedlist = val;
                //  console.log(this.multipleSelection);
            },
            //删除选中的数据
            delselected(){
                this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let ids = '';
                let splitChar = ',';
                let lng = this.selectedlist.length;

                for(let i =0;i<lng;i++){
                    if(i>=lng-1){
                        splitChar='';
                    }
                    ids+=this.selectedlist[i].id+splitChar;
                }

                let url = this.dataAPI+'/goods/del/'+ids;
                this.$http.get(url).then(res=>{
                    if(res.data.status ==1){
                        this.$message({
                            type: 'info',
                            message: res.data.message
                         });  
                        return;
                    }
                    this.$message({
                    type: 'success',
                    message: '删除成功!'                    
                     });

                     this.getlist();
                });
                
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
                });
            },
            // 搜索数据
            handleIconClick(){

            },
            handleSizeChange(val) {
                this.pageSize = val;
                 this.baseURL1 = this.dataAPI +' ,'  + this.pageIndex + ', '+this.pageSize;
                 this.getlist();
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.baseURL1 = this.dataAPI +' ,' +this.pageIndex + ', '+this.pageSize;
                this.getlist();
                console.log(`当前页: ${val}`);
            }
        },
        computed: {
            menuno() {
                return this.$store.state.global.menuActiveNo;
            }
        },
        created(){
            this.baseURL1 = this.dataAPI + this.pageIndex + ', '+this.pageSize;
            this.getlist();
        }
    }
</script>

<style class="scoped">
    .goodstip{
        padding: 3px;
    }
    .abread {
        padding: 10px;
    }

     .ls.el-icon-picture,.ls.el-icon-upload,.ls.el-icon-star-on{
         opacity: 0.5;
         font-size: 18px;
     }

     .ls.el-icon-picture.imgactive,.ls.el-icon-upload.imgactive,.ls.el-icon-star-on.imgactive{
        opacity: 1;
        font-size: 18px;
     }
     .listedit {
         color:#2A72C5;
         font-size: 12px;
        
     }
</style>