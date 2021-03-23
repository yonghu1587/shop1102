<template>
  <div>
    <van-nav-bar
      title="登录"
      right-text="注册"
      @click-right="$router.push('/register')"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.phone"
        label="手机号码"
        placeholder="请输入手机号码"
        :rules="[{ required: true,pattern, message: '请填写正确的手机号码' }]"
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
import { login } from "../utils/request";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      user: {
        password: "",
        phone: "",
      },
      pattern:/^[1][3,4,5,7,8][0-9]{9}$/,
    };
  },
  methods:{
  ...mapActions({
    'requestUser':'userActions',
  }),
    onSubmit(){
      // console.log(this.user);
      login(this.user).then(res=>{
        if(res){
          this.requestUser(res.data.list)
          this.$router.push('/');
          Toast.success('登录成功');
        }
      })
    }
  }
};
</script>

<style>
</style>