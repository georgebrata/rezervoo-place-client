<template>
  <div>
    <el-form :model="registerForm" :rules="registerRules" ref="registerForm" class="registerForm">
        <el-form-item prop="account">
            <el-input type="text" placeholder="your email" v-model.lazy="registerForm.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" placeholder="your super secret password" v-model.lazy="registerForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="checkpass">
            <el-input type="password" placeholder="repeat your super secret password" v-model.lazy="registerForm.checkpass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button style="margin-top: 10px;" class="btnGroup" @click="changeToLogin">👈 Back to login</el-button>
            <el-button style="margin-top: 10px;" class="btnGroup" type="primary" @click="submitForm('registerForm')"  
                        v-loading.fullscreen.lock="isLoading"
                        element-loading-text="Registering ..."
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
            >Register</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapActions,mapGetters } from 'vuex'
export default {
    model:{
        prop:'isRegister'
    },
    props:{
        isRegister : Boolean
    },
    data(){
        let validateAcc = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("Enter a valid email"));
            } else {
                callback();
            }
        };
        let validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("Enter a valid password"));
            } else {
                callback();
            }
        };
        var validateCheckpass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Passwords must match'));
            } else if (value !== this.registerForm.password) {
                callback(new Error('Passwords must match!'));
            } else {
                callback();
            }
        };
        return {
            registerForm :{
                account:'',
                password:'',
                checkpass:''
            },
            registerRules: {
                account: [{ validator: validateAcc, trigger: "blur" }],
                password: [{ validator: validatePass, trigger: "blur" }],
                checkpass: [{ validator: validateCheckpass, trigger: "blur" }],
            }
        }
    },
    methods:{
        ...mapActions(['registerNewAccount']),
        submitForm(form){
            this.$refs[form].validate( async (valid) => {
                if (valid) {
                    const state = await this.registerNewAccount(this.registerForm);
                    if(state.message==='success'){
                        this.$message({
                            showClose: true,
                            message: 'Registration succesfull！Please verify your account before logging in.',
                            type: 'success'
                        });
                        this.changeToLogin();
                    }else{
                        this.$notify.error({
                            title: 'Error',
                            message: state.message,
                            duration: 8000
                        });
                        this.initForm();
                    }
                } else {
                    return false;
                }
            });
        },
        initForm(){
            this.registerForm = {
                account:'',
                password:'',
                checkpass:''
            }
        },
        changeToLogin(){ 
            this.$emit('changeToLogin');
        }
    },
    computed:{
        ...mapGetters(['isLoading'])
    }
}
</script>
<style>
.btnGroup{
    display: inline-block;
}
</style>

