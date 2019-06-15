<template>
    <div class="home_contain">
        <el-row style="height: 100%;">
            <el-col class="menu_el" :span="4" style="height:100%; background-color: #324057;">
                <el-menu class="menu" style="height:100%;" 
                        :default-active='defaultActive'
                        :collapse='collapse'
                        background-color="#324057" 
                        text-color="#fff" 
                        active-text-color="#ffd04b" 
                        router>
                    <el-menu-item index="runkids.io"><i class="el-icon-menu"></i><span>Dashboard</span></el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="20">
                <Head></Head>
            </el-col>
            <el-col :span="20" style="height: 100%;overflow: auto;">
                <keep-alive>
                    <router-view class="showContain" />
                </keep-alive>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import Head from '@/components/Head'
import {mapGetters,mapActions} from 'vuex'
export default {
    components:{
        Head,
    },
    data(){
        return {
            userInfo : {},
            collapse:false
        }
    },
    methods:{
        ...mapActions(['getUserInfo'])
    },
    computed: {
        defaultActive: function(){
            return this.$route.path.replace('/', '');
        }
    },
    mounted(){
        if(window.screen.availWidth<768){
            this.collapse=true;
        }
    }
}
</script>
<style>
.home_contain{
   min-width: 100%;
    height: 100%;
}
.showContain{
    height: 100%;
    overflow:auto;
}
@media (min-width: 300px) and (max-width: 500px) {
    .menu{
        min-width: 73px;
    }
}
</style>

