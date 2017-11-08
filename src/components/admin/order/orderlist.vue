<template>
    <div class="arttmpl">
        <!--1.0 面包屑-->
        <div class="abread bt-line">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>订单管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>订单列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!--2.0 操作区域-->
        <div class="operation">
            <el-row>
                <el-col :span="20">
                    <el-button size="small" :plain="true" type="info" icon="check" @click="selectAll">全选</el-button>
                    <el-button size="small" :plain="true" type="info" icon="delete" @click="delselected">删除</el-button>
                    <el-select @change="selechange" v-model="value" placeholder="请选择订单状态">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-input placeholder="请输入搜索会员" icon="search" v-model="searchval" :on-icon-click="handleIconClick">
                    </el-input>
                </el-col>
            </el-row>
        </div>
        <!--3.0 列表区域-->
        <el-row>
            <el-col :span="24">
                <el-table ref="mtable" :data="tableData3" border tooltip-effect="dark" height="400" style="width: 100%" @selection-change="handleSelectionChange"
                    v-loading="loading" element-loading-text="拼命加载中">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <!--<el-table-column label="日期" width="120">
                    <template scope="scope">{{ scope.row.date }}</template>
                </el-table-column>-->
                    <el-table-column label="订单号" width="150">
                        <template scope="scope">
                            <router-link v-bind="{to:'/admin/orderedit/'+scope.row.id}" class="listedit">
                                {{scope.row.order_no}}
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column prop="user_name" label="会员账号">
                    </el-table-column>
                    <el-table-column label="支付方式" prop="paymentTitle">
                    </el-table-column>
                    <el-table-column label="配送方式" prop="expressTitle">
                    </el-table-column>
                    <el-table-column label="订单状态" prop="statusName">
                    </el-table-column>
                    <el-table-column label="总金额" prop="order_amount">
                    </el-table-column>
                    <el-table-column label="下单时间" width="180">
                        <template scope="scope">
                            {{scope.row.add_time | datefmt('YYYY-MM-DD HH:MM:ss')}}
                        </template>
                    </el-table-column>
                     
                    <el-table-column label="操作" width="80">
                        <template scope="scope">
                            <router-link v-bind="{to:'/admin/orderedit/'+scope.row.id}" class="listedit">修改</router-link>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <el-row class="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[1,10,20,50,100,200]"
                :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
            </el-pagination>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                options: [{
                    value: '1',
                    label: '待付款'
                },
                {
                    value: '2',
                    label: '已付款待发货'
                }, {
                    value: '3',
                    label: '已发货待签收'
                }, {
                    value: '4',
                    label: '已签收'
                }],
                loading: false, //加载中图标控制
                isSelectAll: false, //全选和反选择   
                pageSize: 10,
                pageIndex: 1,
                totalCount: 0,
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
                searchval: '',
                currentPage4: 1,
                orderstatus: -1,
                value:''
            }
        },
        methods: {
            getlist() {
                this.loading = true;
                this.$http.get(`/admin/order/getorderlist?orderstatus=${this.orderstatus}&vipname=${this.searchval}&pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`)
                    .then(res => {

                        this.tableData3 = res.data.message;
                        this.totalCount = res.data.totalcount;
                        setTimeout(() => {
                            this.loading = false;
                        }, 500);
                    })
                    .catch(err => {
                        setTimeout(() => {
                            this.loading = false;
                        }, 500);
                        this.$notify.error({ title: '错误', message: err.message });
                    });
            },
            //全选和反选
            selectAll() {
                this.isSelectAll = !this.isSelectAll;
                if (this.isSelectAll) {
                    //全选
                    this.tableData3.forEach(row => {
                        this.$refs.mtable.toggleRowSelection(row);
                    });
                } else {
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
            delselected() {
                this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '';
                    let splitChar = ',';
                    let lng = this.selectedlist.length;

                    for (let i = 0; i < lng; i++) {
                        if (i >= lng - 1) {
                            splitChar = '';
                        }
                        ids += this.selectedlist[i].id + splitChar;
                    }

                    this.$http.get('/admin/order/del/' + ids).then(res => {
                        if (res.data.status == 1) {
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
            handleIconClick() {
                this.getlist();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getlist();
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.pageIndex = val;

                this.getlist();
                console.log(`当前页: ${val}`);
            },
            selechange(val){
            //    console.log(val);
            this.orderstatus = val;
                this.getlist();
            }
        },
        computed: {
        },
        created() {
            this.getlist();
        }
    }

</script>

<style class="scoped">
    .goodstip {
        padding: 3px;
    }

    .abread {
        padding: 10px;
    }

    .ls.el-icon-picture,
    .ls.el-icon-upload,
    .ls.el-icon-star-on {
        opacity: 0.5;
        font-size: 18px;
    }

    .ls.el-icon-picture.imgactive,
    .ls.el-icon-upload.imgactive,
    .ls.el-icon-star-on.imgactive {
        opacity: 1;
        font-size: 18px;
    }

    .listedit {
        color: #2A72C5;
        font-size: 12px;
    }
</style>