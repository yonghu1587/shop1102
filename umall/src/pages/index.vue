<template>
  <div>
    <van-nav-bar
      title="首页"
      left-arrow
      @click-left="$router.back()"
    />
    <van-tabbar v-model="active" route active-color="orangered">
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/cate">分类</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/mime">我的</van-tabbar-item>
    </van-tabbar>
    <!-- 二级路由出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data(){
    return {
      active:0,
    }
  }
}
</script>

<style>

</style>