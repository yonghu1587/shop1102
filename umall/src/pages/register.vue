<template>
  <div>
    <van-nav-bar
      title="新用户注册"
      right-text="登录"
      @click-right="$router.push('/login')"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.phone"
        label="手机号码"
        placeholder="请输入手机号码"
        :rules="[{ required: true,pattern, message: '请填写正确的手机号码' }]"
      />
      <van-field
        v-model="user.nikename"
        label="昵称"
        placeholder="请输入昵称"
        :rules="[{ required: true, message: '请填写昵称' }]"
      />
      <van-field
        v-model="user.password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { register } from "../utils/request";
export default {
  data() {
    return {
      user: {
        nikename: "",
        password: "",
        phone: "",
      },
      pattern:/^[1][3,4,5,7,8][0-9]{9}$/,
    };
  },
  methods:{
    onSubmit(){
      // console.log(this.user);
      register(this.user).then(res=>{
        Toast.success('注册成功');
        this.$router.push('/login');
      })
    }
  }
};
</script>

<style>
</style>