<template>
    <div class="box">
        <div class="main">
            <h2>登录</h2>
            <el-input placeholder="请输入账号" v-model="user.username" clearable></el-input>
            <el-input type='password' placeholder="请输入密码" v-model="user.password" clearable></el-input>
            <el-button type="primary" @click="login">登录</el-button>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { warningAlert } from '../../utils/alert'
import { successAlert } from '../../utils/alert'
import { userLogin } from '../../utils/request'
export default {
    data(){
        return{
            user:{
                username:"",
                password:""
            }
        }
    },
    methods:{
        ...mapActions({
            'requestuser':'userActions'
        }),
        login(){
            if(this.user.username == '' || this.user.password == ''){
                warningAlert('用户名或密码不能为空')
            }else{
                userLogin(this.user).then(res=>{
                    successAlert(res.data.msg);
                    // 把数据存入vuex
                    this.requestuser(res.data.list);
                    this.$router.push('/');
                })
            }
            // this.$router.push('/');
        }
    }
}
</script>

<style scoped>
.box{
    width: 100vw;
    height: 100vh;
    background-color: #303133;
}
.main{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 260px;
    border-radius: 10px;
    background-color: white;
    padding: 10px 80px 20px;
    text-align: center;
}
h2{
    line-height: 50px;
}
.el-input{
    margin-bottom: 20px;
}
.el-button{
    width: 100%;
}
</style>