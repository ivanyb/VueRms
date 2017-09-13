<template>
    <div class="arttmpl">
            {{categoryid}}
        <!--1.0 面包屑-->
        <div class="abread bt-line">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><span @click="back">返回上一层</span></el-breadcrumb-item>
                <el-breadcrumb-item>知识内容</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>编辑分类</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        
        <!--2.0 新增表单-->
        <div class="operation">
            <el-row>
                <el-col :span="20">
                    <el-form ref="form" :model="form"  :rules="rules" label-width="80px">                        
                         <el-row>
                            <el-col :span="11">                                 
                            </el-select>
                                <el-form-item label="所属类别">
                                    <el-select v-model="form.parent_id" placeholder="无父分类">
                                    <el-option
                                        v-for="item in categorylist"
                                        :key="item.id"
                                        :label="item.title"
                                        :value="item.id">
                                        <span v-if="item.class_layer>1">&nbsp;|-</span>
                                        <span>{{ item.title }}</span>
                                     </el-option>
                                    </el-select>
                                </el-form-item>      
                            </el-col>                            
                        </el-row>
                       
                       <el-row>
                            <el-col :span="7">
                                <el-form-item label="分类名称" prop="title">
                                    <el-input v-model="form.title"></el-input>
                                </el-form-item>
                          </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="7">
                                <el-form-item label="排序号" prop="sort_id">
                                    <el-input v-model="form.sort_id"></el-input>
                                </el-form-item>
                          </el-col>
                        </el-row>

                         <el-row>
                            <el-col :span="7">
                                <el-form-item label="层级" prop="class_layer">
                                    <el-input v-model="form.class_layer"></el-input>
                                </el-form-item>
                          </el-col>
                        </el-row>

                        <el-form-item>
                            <el-button type="primary" @click="onSubmit('form')">提交保存</el-button>
                            <el-button type="warning" @click="back">返回上一页</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
   
    import kits  from '../../../kits/kits.js';

    export default {        
        props: ['tablename','categoryid'],
        data() {
             var checkNum = (rule, value, callback) => {               
                setTimeout(() => {
                    
                if (isNaN(value)) {
                    callback(new Error('请输入数字值'));
                }else{
                      callback();
                }
                }, 500);
            };
            
            return {
                categorylist:[], //类别数据               
                //imgList:[{name:'food.jpg',url:'http://127.0.0.1:8899/imgs/hAEnUEj2I827aDDHJYL_Ugpd.jpeg'}], //图片列表 
                  
                form: {
                    title: '',   //标题
                    parent_id: '', //父类别id
                    sort_id:0,
                    class_layer:1
                },
                rules: {
                    title:[
                        { required: true, message: '请输入标题', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                     ],
                      sort_id:[
                       { validator: checkNum, trigger: 'blur' }
                     ],
                      class_layer:[
                       { validator: checkNum, trigger: 'blur' }
                     ]
                 }
            }
             
        },
        methods: {
            onSubmit(formName) {
                 this.$refs[formName].validate((valid) => {
                if (valid) {
                    var url = this.dataAPI+'/category/edit/'+this.categoryid;
                    this.$http.post(url,this.form)
                    .then((res)=> {
                        if(res.data.status == 1){
                             this.$notify.error({ title: '异常',message: res.data.message}); 
                            return;
                        }
                        this.$notify({title: '成功',message: res.data.message,duration:500,
                            type: 'success',onClose:()=>{
                                this.$router.go(-1);
                            } });

                            })
                    .catch((err)=> {
                             this.$notify.error({ title: '异常',message: err.message});                                
                            });     
                    // console.log(this.form);           
                   
                } else {
                    this.$notify.error({ title: '验证',message: '表单验证失败'});    
                    return false;
                }
                });               
            },
            back(){
                this.$router.go(-1);
            },
            getcategorylist(){              
                var url = this.dataAPI+'/article/getcategorylist/'+this.tablename;
                var getmodelApi = this.dataAPI+'/category/getcategorymodel/'+this.categoryid;
                this.$http.get(url).then(res=>{
                    if(res.data.status == 1){
                            this.$notify.error({ title: '异常',message: res.data.message}); 
                        return;
                    }

                  this.categorylist = res.data.message;


                //   获取老数据
                this.$http.get(getmodelApi)
                .then(res1=>{
                      if(res1.data.status == 1){
                            this.$notify.error({ title: '异常',message: res1.data.message}); 
                        return;
                    }
                     //  赋初始值
                     this.form = res1.data.message[0];
                     if(this.form.parent_id=='0'){
                         this.form.parent_id ='';
                     }
                    });
                });
            }
        },
        created(){          
            // 获取类别数据
            this.getcategorylist();
        }
    }

</script>

<style>
    .arttmpl .operation {
        border: 1px solid rgba(0, 0, 0, 0.1);
        padding: 10px;
        margin: 15px 0 0 0;
        border-radius: 10px;
    }

    .html.ql-editor{
        margin-top:1px; 
        border: 1px solid rgba(0, 0, 0, 0.1);
    }
  .ql-container .ql-editor {
    min-height: 20em;
    padding-bottom: 1em;
    max-height: 25em;
  }
</style>