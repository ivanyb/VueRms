<template>
    <div class="arttmpl">
        <!--1.0 面包屑-->
        <div class="abread bt-line">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><span @click="back">返回上一层</span></el-breadcrumb-item>
                <el-breadcrumb-item>购物商城</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>编辑商品</el-breadcrumb-item>
            </el-breadcrumb>
        </div>       

        <!--2.0 新增表单-->
        <div class="operation">
            <el-row>
                <el-col :span="20">
                    <el-form ref="form" :model="form"  :rules="rules" label-width="80px">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="内容标题" prop="title">
                                    <el-input v-model="form.title"></el-input>
                                </el-form-item>
                          </el-col>
                           <el-col :span="12">
                                <el-form-item label="副标题">
                                    <el-input v-model="form.sub_title"></el-input>
                                </el-form-item>
                          </el-col>
                        </el-row>
                         <el-row>
                            <el-col :span="11">                                 
                            </el-select>
                                <el-form-item label="所属类别" prop="category_id">
                                    <el-select v-model="form.category_id" placeholder="请选择">
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
                             <el-col :span="5">
                                <el-form-item label="是否发布">
                                    <el-switch on-text="是" off-text="否" v-model="form.status"></el-switch>
                                </el-form-item>
                             </el-col>
                            <el-col :span="8">
                                <el-form-item label="推荐类型">
                                    <el-switch on-text="轮播图" off-text="轮播图" :width="75" v-model="form.is_slide"></el-switch>
                                    <el-switch on-text="置顶" off-text="置顶" v-model="form.is_top"></el-switch>
                                    <el-switch on-text="推荐" off-text="推荐" v-model="form.is_hot"></el-switch>
                              </el-form-item>   
                             </el-col>
                        </el-row>                  
                        
                       <el-row>
                           <el-col :span="11">
                                 <el-form-item label="上传封面">
                                    <el-upload
                                        class="upload-demo"
                                        :action="uploadimgapi"
                                        :on-preview="handlePreview"
                                        :on-remove="imgRemove"
                                        :file-list="form.imgList"
                                        :with-credentials="wcstatus"
                                        :on-success="uploadimgsuccess"                              
                                        list-type="picture">
                                        <el-button size="small" type="primary">点击上传</el-button>
                                        <!--<div slot="tip" class="el-upload__tip">只能上传图片文件，且不超过500kb</div>-->
                                        </el-upload>
                                </el-form-item>
                           </el-col>
                           <el-col :span="9">
                                <el-form-item label="上传附件">
                                <EasyScrollbar :barOption="opt">
                                <div  id="wrapper" style="max-height: 200px;">                                
                                    <el-upload
                                        class="upload-demo"
                                        :action="uploadfileapi"                           
                                        :on-remove="fileRemove"
                                        :on-success="uploadFilesuccess"
                                        :file-list="form.fileList"
                                        list-type="picture">
                                        <el-button size="small" type="primary">点击上传</el-button>
                                        <!--<div slot="tip" class="el-upload__tip">不超过100MB</div>-->
                                    </el-upload>                                    
                               
                                    </div>
                                 </EasyScrollbar>
                                  </el-form-item>
                           </el-col>
                       </el-row>
                         <el-row>
                            <el-col :span="6">
                                 <el-form-item label="商品货号">
                                    <el-input v-model="form.goods_no"></el-input>
                                </el-form-item>
                            </el-col>   
                            <el-col :span="6">
                                 <el-form-item label="库存数量">
                                    <el-input v-model="form.stock_quantity"></el-input>
                                </el-form-item>    
                            </el-col>
                              <el-col :span="6">
                                 <el-form-item label="市场价格">
                                    <el-input v-model="form.market_price"></el-input>
                                </el-form-item>
                            </el-col>   
                            <el-col :span="6">
                                 <el-form-item label="销售价格">
                                    <el-input v-model="form.sell_price"></el-input>
                                </el-form-item>    
                            </el-col>
                        </el-row>                    
                        <el-form-item label="内容摘要" prop="zhaiyao">
                            <el-input type="textarea" v-model="form.zhaiyao"></el-input>
                        </el-form-item>
                         <el-form-item label="详细内容" prop="content">
                             <!--使用富文本编辑器-->
                            <quill-editor ref="myTextEditor"
                                v-model="form.content"
                                :options="editorOption"
                                @blur="onEditorBlur($event)"
                                @focus="onEditorFocus($event)"
                                @ready="onEditorReady($event)">
                            </quill-editor>
                             
                        </el-form-item>
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
    // 导入富文本编辑器
    import { quillEditor } from 'vue-quill-editor';
    import kits  from '../../../kits/kits.js';

    export default {
         components: {
            quillEditor
        },
        
        data() {
            return {
                tablename:'goods',
                artid:0,
                categorylist:[], //类别数据
                uploadimgapi:'',
                uploadfileapi:'',
                wcstatus:true ,//上传文件带cookie
                //imgList:[{name:'food.jpg',url:'http://127.0.0.1:8899/imgs/hAEnUEj2I827aDDHJYL_Ugpd.jpeg'}], //图片列表 
                opt:{  //滚动条组件样式
                barColor:"#d0d0d0",   //滚动条颜色
                barWidth:10,           //滚动条宽度
                railColor:"#eee",     //导轨颜色
                barMarginRight:0,     //垂直滚动条距离整个容器右侧距离单位（px）
                barMaginBottom:0,     //水平滚动条距离底部距离单位（px)
                barOpacityMin:1,      //滚动条非激活状态下的透明度
                zIndex:"auto",        //滚动条z-Index
                autohidemode:false,     //自动隐藏模式
                horizrailenabled:false,//是否显示水平滚动条
                },
                editorOption:{}, //富文本编辑器配置   
                form: {
                    title: '',   //标题
                    sub_title:'', //副标题 
                    goods_no:'', //商品货号
                    category_id: '', //类别id
                    stock_quantity:0, //库存数量
                    market_price:0, //市场价格
                    sell_price:0, //销售价格                    
                    status: true,  // 状态 0:发布 1:不发布
                    is_slide: false, //true:在轮播图显示
                    is_top: false,  // true：置顶
                    is_hot: false,  // true：推荐
                    zhaiyao: '',    // 文章摘要
                    content:'' ,   // 文章富文本雷荣
                    imgList:[],//图片列表
                    fileList:[], //附件列表                           
                },
                rules: {
                    title:[
                        { required: true, message: '请输入标题', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                     ],
                     //必须与form中的category_id保持一致，否则无效
                     category_id:[
                          { required: true, message: '请选择类别', trigger: 'change' }
                     ],
                     zhaiyao:[
                         { required: true, message: '请输入摘要', trigger: 'blur' },
                     ],
                     content:[
                          { required: true, message: '请输入详细内容', trigger: 'blur' },
                     ]
                 }
            }
             
        },
        methods: {
            onSubmit(formName) {
                 this.$refs[formName].validate((valid) => {
                if (valid) {
                    var url = '/admin/goods/edit/'+this.artid;
                    this.$http.post(url,this.form)
                    .then((res)=> {
                        if(res.data.status == 1){
                             this.$notify.error({ title: '异常',message: res.data.message}); 
                            return;
                        }
                        this.$notify({title: '成功',message: res.data.message,duration:1000,
                            type: 'success',onClose:()=>{
                                this.$router.go(-1);
                            } });

                            })
                    .catch((err)=> {
                             this.$notify.error({ title: '异常',message: err.message});                                
                            });     
                    console.log(this.form);           
                   
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });               
            },
            back(){
                this.$router.go(-1);
            },
            //图片上传相关方法
            imgRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            //上传图片成功的回调
            uploadimgsuccess(response, file, fileList){
                console.log(response);             
                this.form.imgList =[response];
            },
            //上传附件
            uploadFilesuccess(response, file, fileList){
                this.form.fileList.push(response);
                console.log(this.form.fileList);  

            },
            fileRemove(file, fileList){
                this.form.fileList = fileList;
            },
            //富文本编辑器
            onEditorBlur(editor) {
                console.log('editor blur!', editor)
            },
            onEditorFocus(editor) {
                console.log('editor focus!', editor)
            },
            onEditorReady(editor) {
                console.log('editor ready!', editor)
            },
            getcategorylist(){
                var url = '/admin/article/getcategorylist/'+this.tablename;
                this.$http.get(url).then(res=>{
                  this.categorylist = res.data.message;

                    // 获取编辑老数据对象
                    var artUrl = '/admin/goods/getgoodsmodel/'+this.artid;
                    this.$http.get(artUrl).then(res=>{                      
                        this.form = res.data.message;
                        console.log(this.form);
                    });
                });
            }
        },
        created(){
            this.uploadimgapi = kits.uploadimgapi;
            this.uploadfileapi =  kits.uploadimgapi;
            this.artid = this.$route.params.artid;
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