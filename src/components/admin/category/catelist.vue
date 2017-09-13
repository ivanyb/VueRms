<template>
    <div class="arttmpl">
        {{this.$route.params.tablename}}
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
                    <el-button size="small" :plain="true" type="info" icon="plus">新增</el-button>
                    <el-button size="small" :plain="true" type="info" icon="check">全选</el-button>
                    <el-button size="small" :plain="true" type="info" icon="delete">删除</el-button>
                </el-col>
               
            </el-row>
        </div>
        <!--3.0 列表区域-->
        <el-row>
            <el-table ref="multipleTable" :data="tableData3" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="日期" width="120">
                    <template scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="address" label="地址" show-overflow-tooltip>
                </el-table-column>
            </el-table>
        </el-row>

        <el-row class="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
             :current-page="currentPage4" :page-sizes="[10,20,50,100,200]"
                :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="400">
            </el-pagination>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData3: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                multipleSelection: [],
                searchval:'',
                currentPage4: 1
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 搜索数据
            handleIconClick(){

            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },
        computed: {
            menuno() {
                return this.$store.state.global.menuActiveNo;
            }
        }
    }

</script>

<style class="scoped">
    .abread {
        padding: 10px;
    }
</style>