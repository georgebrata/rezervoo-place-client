<template>
    <div class="login_contain main_contain">
        <div :class="{afterLoading:cssChange,berforLoading:!cssChange}">
            <h1 class="login_title">Rezervoo 🍽</h1>
            <h3 style="text-align: center; color: white;">Place Management Console</h3>
            <div class="login_page" v-if="!isRegister">
                <el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="loginForm">
                    <el-form-item prop="account">
                        <el-input type="text" placeholder="email" v-model.lazy="loginForm.account" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="super secret password" v-model.lazy="loginForm.password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-checkbox class='loginCheckbox' label="Remember me" v-model="rememberAcc"></el-checkbox>
                    <el-form-item>
                        <el-button style="margin-top: 15px;" class="loginBtn" type="success" @click="submitForm('loginForm')"  
                                    v-loading.fullscreen.lock="isLoading"
                                    element-loading-text="Logging in ..."
                                    element-loading-spinner="el-icon-loading"
                                    element-loading-background="rgba(0, 0, 0, 0.8)"
                        >Login</el-button>
                    </el-form-item>
                    <el-button type="text" @click="forgetPass">Forget password？</el-button>
                    <el-button type="text" @click="isRegister=!isRegister">Create account</el-button>
                </el-form>
            </div>
            <div class="login_page" v-else>
                <Register v-model="isRegister" @changeToLogin="isRegister=!isRegister"></Register>
            </div>
        </div>
    </div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'
import Register from '@/components/Register'

export default {
    data() {
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
        return {
            loginForm: {
                account: '',
                password: ''
            },
            loginRules: {
                account: [{ validator: validateAcc, trigger: "blur" }],
                password: [{ validator: validatePass, trigger: "blur" }],
            },
            isRegister:false,
            resetPassAcc:'',
            recaptchaCheck:null,
            rememberAcc:false,
            cssChange:false
        };
    },
    components:{
        Register
    },
    methods:{
        ...mapActions(['loginCheck','rememberAccount','resetPassword']),
        submitForm(form){
            this.$refs[form].validate( async (valid) => {
                if (valid) {
                    const res = await this.loginCheck(this.loginForm); 
                    if(res.message==='success'){
                        this.rememberAccount({account:this.loginForm.account,remember:this.rememberAcc});
                        this.$router.replace('/dashboard'); 
                    }else{
                        this.$notify.error({
                            title: 'Login failed'
                        });
                        this.loginForm.password="";
                    }
                } else {
                    return false;
                }
            });
        },
        forgetPass(){
            const h = this.$createElement;
            this.$prompt('Enter your login email below：', 'Password reset', {
                confirmButtonText: 'Reset it 🔐',
                cancelButtonText: 'Cancel',
                inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                inputErrorMessage: 'Incorrect format'
            }).then( async ({ value }) => {
                const res = await this.resetPassword(value);
                this.$message({
                    type: 'warning',
                    message: res.message
                });
            }).catch(() => {
            });
        }
    },
    computed:{
        ...mapGetters(['captchaKey','isLoading']),
    },
    mounted(){
        let item = window.localStorage.getItem('rememberAccount'); //有勾記住帳號的話，帶出帳號至欄位上
        if(item){
            this.loginForm.account = item;
            this.rememberAcc=true;
        }
        setTimeout(()=>{
            this.cssChange=!this.cssChange;
        },500);
    }
};
</script>
<style>
.login_page{
    width: 302px;
    height: auto;
    margin-left:auto;
    margin-right:auto;
    margin-top: 10px;
    padding:30px;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;
}
.loginBtn{
    width: 100%;
}
.loginBtn:hover{
    transition-duration: 1s;
    background-color: rgba(7, 131, 44, 0.774);
}
.login_contain{
    position: absolute;
    background-color: #324057;
}
.login_title{
    text-align: center;
    color: #fff;
    font-size: 30px;
    margin-top: 100px;
}
.loginCheckbox{
    margin-top: 10px;
}
.berforLoading{
    opacity: 0;
    transform: translate3d(0, -50px, 0);
}
.afterLoading{
    transition: all 1s;
}
</style>
