<template>
  <div>
    <van-nav-bar
      title="商品列表"
      left-arrow
      @click-left="$router.back()"
    />
    <van-card
      v-for="item in goodsList"
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
  </div>
</template>

<script>
import { Toast } from 'vant';
import { mapGetters, mapActions } from 'vuex';
import { priceFilter } from "../filter/price";
import { getCateGoods, cartAdd } from "../utils/request";
export default {
  filters:{priceFilter},
  data(){
    return {
      goodsList:[],
      CateId:this.$route.params.id,
    }
  },
  computed:{
    ...mapGetters({
      'user':'user'
    })
  },
  mounted(){
    this.queryGoodsList();
  },
  methods:{
    ...mapActions({
      'requestCartList':'cartListActions',
    }),
    queryGoodsList(){
      getCateGoods({fid:this.CateId}).then(res=>{
        this.goodsList = res.data.list;
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

<style>

</style>