<template>
  <div class="head_contain">
      <div class="head">
        <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">
                <span>{{item}}</span>
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-dropdown class='navbar' @command="handleCommand" style="position: absolute;" trigger="click">
            <span class="el-dropdown-link">
                <img class="headImg" :src="userInfo.photoURL"/>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item disabled>Hi, {{userInfo.displayName}}</el-dropdown-item>
                <el-dropdown-item  command="userInfo">My account</el-dropdown-item>
                <el-dropdown-item  v-loading="isLoading" command="logout">Logout</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
      </div>
  </div>
</template>
<script>
import {mapGetters,mapActions,mapMutations} from 'vuex'
import {onlineMember} from '../api/firebase'
export default {
    methods:{
        ...mapActions(['userLogout','getUserInfo']),
        async logout(){
            await this.userLogout();
            this.$message({
                showClose: true,
                message: 'Logout successful!'
            });
            this.$router.push('/');
        },
        handleCommand(command){
            switch(command){
                case 'logout': this.logout();
                case 'userInfo' : this.$router.push('/user');
            }
        }
    },
    computed: {...mapGetters(['isLoading','userInfo'])},
    async created(){
        await this.getUserInfo();
    },
    mounted(){
        onlineMember().on('value', (event) => { 
            if(event.val().userName){
                this.$notify.success({
                    title: 'Login success！'
                });
            }
        });
        onlineMember().set({userName:''});
    }
}
</script>
<style>
.head_contain{
    position: relative;
    top: 0;
    right: 0;
    width: 100%;
}
.head{
    padding: 5px;
    height: 60px;
    background-color: rgba(19, 21, 22, 0.055);
    position: relative;
}
.headImg{
    border: 2px dashed rgba(0, 0, 0, 0.356);
    border-radius: 99px;
    height: 50px;
    width: 50px;
    position: absolute;
    cursor: pointer;
}
.breadcrumb{
    margin-top: 20px;
    margin-left: 10px;
    position: absolute;
}
.navbar{
    position: absolute;
    right: 70px;
    top:10px;
}
</style>
