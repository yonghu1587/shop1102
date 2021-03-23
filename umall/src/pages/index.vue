<template>
  <div>
    <!-- 二级路由出口 -->
    <router-view></router-view>

    <van-tabbar v-model="active" route active-color="orangered">
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/cate">分类</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/cart" :badge="cartNum">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/mime">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data(){
    return {
      active:0,
    }
  },
  computed:{
    ...mapGetters({
      'cartList':'cartList',
      'user':'user',
    }),
    cartNum(){
      let num = 0;
        this.cartList.map(item=>{
          num += item.num;
        })
        return num;
    }
  },
  mounted(){
    this.requestCartList();
  },
  methods:{
    ...mapActions({
      'requestCartList':'cartListActions',
    }),
  }
}
</script>

<style>

</style>