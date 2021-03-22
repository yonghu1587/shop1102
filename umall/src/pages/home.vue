<template>
  <div v-cloak class="main">
    <van-nav-bar
      title="首页"
      left-arrow
      @click-left="$router.back()"
    />
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in images" :key="index">
        <img v-lazy="$preImg+item.img" />
      </van-swipe-item>
    </van-swipe>
    <van-tabs v-model="active" v-if="goods.length != 0">
      <van-tab title="热门推荐">
        <van-card
          v-for="item in goods[0].content"
          :key="item.id"
          tag="hot"
          :price="item.price | priceFilter"
          :title="item.goodsname"
          :thumb="$preImg+item.img"
          :origin-price="item.market_price | priceFilter"
        >
          <template #footer>
            <van-button type='primary' icon='cart-o' size='small' @click="add(item.id)"></van-button>
          </template>
        </van-card>
      </van-tab>
      <van-tab title="发现新品">
        <van-card
          v-for="item in goods[1].content"
          :key="item.id"
          tag="new"
          :price="item.price | priceFilter"
          :title="item.goodsname"
          :thumb="$preImg+item.img"
          :origin-price="item.market_price | priceFilter"
        >
          <template #footer>
            <van-button type='primary' icon='cart-o' size='small' @click="add(item.id)"></van-button>
          </template>
        </van-card>
      </van-tab>
      <van-tab title="全部商品">
        <van-card
          v-for="item in goods[2].content"
          :key="item.id"
          :price="item.price | priceFilter"
          :title="item.goodsname"
          :thumb="$preImg+item.img"
          :origin-price="item.market_price | priceFilter"
        >
          <template #footer>
            <van-button type='primary' icon='cart-o' size='small' @click="add(item.id)"></van-button>
          </template>
        </van-card>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getBanner, getGoods, cartAdd } from "../utils/request";
import Vue from 'vue';
import { Lazyload, Toast } from 'vant';
import { mapActions, mapGetters } from 'vuex';
import { priceFilter } from "../filter/price";
Vue.use(Lazyload);
export default {
  data(){
    return {
      images:[],
      goods:[],
      active:0,
    }
  },
  filters:{
    priceFilter,
  },
  computed:{
    ...mapGetters({
      'user':'user'
    })
  },
  mounted(){
    this.getBannerList();
    this.getGoodsList();
  },
  methods:{
    ...mapActions({
      'requestCartList':'cartListActions',
    }),
    getBannerList(){
      getBanner().then(res=>{
        this.images = res.data.list;
      })
    },
    getGoodsList(){
      getGoods().then(res=>{
        this.goods = res.data.list
      })
    },
    add(id){
      let form = {
        goodsid:id,
        uid:this.user.uid,
        num:1,
      }
      cartAdd(form).then(res=>{
        Toast.success(res.data.msg);
        this.requestCartList();
      })
    }
  }
}
</script>

<style scoped>
[v-cloak]{
  display: none;
}
.van-swipe-item{
  text-align: center;
  overflow: hidden;
}
/* 图片居中 */
img{
  height: 200px;
  margin-left: 50%;
  transform: translateX(-50%);
}
.main{
  margin-bottom: 50px;
}
</style>