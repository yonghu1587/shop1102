<template>
  <div>
    <van-nav-bar
      title="会员中心"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="header">
      <van-image
        round
        fit='cover'
        width="10rem"
        height="10rem"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
      <div>{{user.nickname}}</div>
    </div>
    <van-button type="danger" round block @click="logout">安全退出</van-button>
    <div class="main">
      <van-cell title="我的收藏" is-link />
      <van-cell title="我的评论" is-link />
      <van-cell title="我的订单" is-link />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed:{
    ...mapGetters({
      'user':'user'
    })
  },
  methods:{
    ...mapActions({
      'requestUser':'userActions',
    }),
    logout(){
      this.requestUser({});
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.header{
  height: 200px;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom:10px;
}

.van-button{
  margin: 10px 0;
}
</style>