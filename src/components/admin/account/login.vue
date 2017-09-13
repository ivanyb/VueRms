<template>
    <div class="accounttmpl">
        <el-row>
            <el-col :offset="6">
                <img src="/statics/imgs/logo.png" alt="">
            </el-col>
        </el-row>
        <div class="form">
            <el-form :label-position="labelPosition" :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item class="wcolor" label="用户名" prop="uname">
                    <el-input type="text" v-model="ruleForm2.uname" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item class="wcolor" label="密码" prop="upwd">
                    <el-input type="password" v-model="ruleForm2.upwd" auto-complete="off"></el-input>
                </el-form-item>
                <!--<el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model.number="ruleForm2.age"></el-input>
                </el-form-item>-->
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                    <el-button @click="resetForm('ruleForm2')">重置</el-button>

                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            //    var validateUname = (rule, value, callback) => {                   
            //     if (value === '') {
            //         callback(new Error('请输入用户名'));
            //     } else {
            //         if (this.ruleForm2.uname !== '') {
            //             this.$refs.ruleForm2.validateField('uname');
            //         }
            //         callback();
            //     }
            // }; 
            // var validateUpwd = (rule, value, callback) => {
            //     if (value === '') {
            //         callback(new Error('请输入密码'));
            //     } else {
            //         if (this.ruleForm2.upwd !== '') {
            //             this.$refs.ruleForm2.validateField('upwd');
            //         }
            //         callback();
            //     }
            // };
            return {
                labelPosition: 'top',
                ruleForm2: {
                    uname: '',
                    upwd: ''
                },
                rules2: {
                    uname: [
                        // { validator: validateUname, trigger: 'blur' }
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                        // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    upwd: [
                        // { validator: validateUpwd, trigger: 'blur' }
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {                
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //验证通过以后，触发请求                                      
                        this.$http.post('/account/login'
                            , 'uname='+this.ruleForm2.uname+'&upwd='+this.ruleForm2.upwd)
                            .then((res)=> {
                                this.$notify({title: '成功',message: res.data.uname,duration:300,
                                 type: 'success',onClose:()=>{
                                     //修改body背景色
                                      document.querySelector('#body').style = "background:#ffffff";
                                     this.$router.push({name:'artlist'});
                                    } });

                            }).catch((err)=> {
                             this.$notify.error({ title: '异常',message: err.message});
                                
                            });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                return;
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
        , created() {
            document.querySelector('#body').style = "background:#267cb7";
        }
    }

</script>

<style scoped>
    .accounttmpl {
        width: 350px;
        margin: 50px auto;
    }

    .form {

        padding: 10px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 10px;
    }

    .wcolor {
        color: #ffffff;
    }
</style>