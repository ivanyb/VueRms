<template>
    <div class="order">
        <!--1.0 面包屑-->
        <div class="abread bt-line">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><span @click="back">返回上一层</span></el-breadcrumb-item>
                <el-breadcrumb-item>订单管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>编辑订单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="operation">
            <el-form ref="form" :model="orderdetial"  label-width="80px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="订单号">
                            {{orderdetial.orderinfo.order_no}}
                        </el-form-item>
                    </el-col>
                     <el-col :span="12">
                        <el-form-item label="订单状态">
                           <el-select v-model="orderdetial.orderinfo.orderstatus" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
               
                 <el-row>
                    <el-col :span="12">
                        <el-form-item label="收件人">
                            <el-input v-model="orderdetial.orderinfo.accept_name"></el-input>
                          
                        </el-form-item>
                    </el-col>
                       <el-col :span="12">
                        <el-form-item label="物流单号">                       
                            <el-input v-model="orderdetial.orderinfo.express_no"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>   
                <el-row>
                     <el-col :span="12">
                        <el-form-item label="发货地区">                          
                        <el-input v-model="orderdetial.orderinfo.area"></el-input>
                       
                        </el-form-item>
                    </el-col> 
                     <el-col :span="12">
                        <el-form-item label="详细地址">                          
                      
                        <el-input v-model="orderdetial.orderinfo.address"></el-input>
                        </el-form-item>
                    </el-col>       
                </el-row>             
                  <el-row>
                    <el-col :span="12">
                        <el-form-item label="手机">
                          <el-input v-model="orderdetial.orderinfo.mobile"></el-input>                          
                        </el-form-item>
                    </el-col>
                     <el-col :span="12">
                        <el-form-item label="电话">
                          <el-input v-model="orderdetial.orderinfo.telphone"></el-input>                        
                        </el-form-item>
                    </el-col>
                </el-row>                
                 <el-row>
                    <el-col :span="12">
                        <el-form-item label="邮箱">
                          <el-input v-model="orderdetial.orderinfo.email"></el-input>                        
                        </el-form-item>
                    </el-col>
                     <el-col :span="12">
                        <el-form-item label="订单留言">
                          <el-input v-model="orderdetial.orderinfo.message"></el-input>                        
                        </el-form-item>
                    </el-col>
                </el-row>
               
                 <el-row>
                    <el-col :span="12">
                        <el-form-item label="总金额">
                          <el-input v-model="orderdetial.orderinfo.order_amount"></el-input>                        
                        </el-form-item>
                    </el-col>
                     <el-col :span="12">
                        <el-form-item label="配送费">
                          <el-input v-model="orderdetial.orderinfo.express_fee"></el-input>                        
                        </el-form-item>
                    </el-col>
                </el-row>
                
                <el-row>
                    <el-col >
                        <el-form-item label="商品列表">
                            <el-table :data="orderdetial.goodslist" style="width: 100%">
                                <el-table-column label="图片" width="180">
                                      <template scope="scope">
                                        <img :src="scope.row.imgurl" alt="" width="50px" height="50px">
                                      </template>
                                </el-table-column>
                                <el-table-column prop="goods_title" label="商品名称">
                                </el-table-column>
                                 <el-table-column prop="goods_price" label="商品价格" width="110">
                                </el-table-column>
                                <el-table-column prop="quantity" label="数量" width="80">
                                </el-table-column>
                                <el-table-column prop="real_price" label="总价" width="80">
                                </el-table-column>
                            </el-table>
                        </el-form-item>
                    </el-col>
                </el-row>
                  <el-form-item>
                    <el-button type="primary" @click="save">提交保存</el-button>
                    <el-button type="warning" @click="back">返回上一页</el-button>
                </el-form-item>
            </el-form>
        </div>
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
                }, {
                    value: '5',
                    label: '已取消'
                }],
                orderid: this.$route.params.orderid,
                orderdetial: {}
            }
        },
        methods: {
            back() {
                this.$router.go(-1);
            },
            save(){
                this.$http.post('/admin/order/updateorder',this.orderdetial)
                .then(res=>{
                      if (res.data.status == 1) {
                            this.$message.error(res.data.message);
                            return;
                        }

                    this.$notify({title: '成功',message: res.data.message,duration:1000,
                    type: 'success',onClose:()=>{
                        this.$router.go(-1);
                    } });
                        
                });
            },
            getorderinfo() {
                this.$http.get('/admin/order/getorderdetial/' + this.orderid)
                    .then(res => {
                        if (res.data.status == 1) {
                            this.$message.error(res.data.message);
                            return;
                        }

                        this.orderdetial = res.data.message;
                    });
            }
        },
        created() {
            this.getorderinfo();
        }
    }

</script>

<style scoped>
    .operation {
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 3px;
        margin: 5px;
        padding: 30px;
    }
</style>