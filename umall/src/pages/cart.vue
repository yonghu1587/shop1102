<template>
  <div class="main">
    <van-nav-bar
      title="购物车"
      left-arrow
      @click-left="$router.back()"
    />
    <template v-if="cartList.length != 0">
      <van-swipe-cell v-for="(item) in cartList" :key="item.id">
      <van-card
        :price="item.price | priceFilter"
        :title="item.goodsname"
        :thumb="$preImg+item.img"
      >
        <template #footer>
          <van-stepper v-model="item.num" theme="round" button-size="22" disable-input @plus='add(item.goodsid)'/>
        </template>
        <template #tags>
          <van-checkbox class="checkbox" v-show="isEdit" :name="item.id" ref="checkboxes"></van-checkbox>
        </template>
      </van-card>
      <template #right>
        <van-button square text="删除" type="danger" class="delete-button" @click="del(item.id)" />
      </template>
      </van-swipe-cell>
    </template>
    <template v-else>
      <van-empty
        class="custom-image"
        image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
        description="您的购物车空空如也，快去加购吧"
      />
    </template>
    <van-submit-bar v-show="!isEdit" :price="Total*100" button-text="提交订单" />
  </div>
</template>

<script>
import { Toast } from 'vant';
import { mapGetters,mapActions } from 'vuex';
import { priceFilter } from "../filter/price";
import { delCart, cartAdd } from "../utils/request";
export default {
  filters:{priceFilter},
  data(){
    return {
      goodsTotal:0,
      isEdit:false,
      result:[],
    }
  },
  computed:{
    ...mapGetters({
      'user':'user',
      'cartList':'cartList'
    }),
    Total(){
      let n = 0;
      this.cartList.map(item=>{
        n += item.price * item.num;
      })
      return n;
    }
  },
  mounted(){
    this.requestCartList();
  },
  methods:{
    ...mapActions({
      'requestCartList':'cartListActions',
    }),
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
    },
    del(id){
      delCart({id}).then(res=>{
        Toast.success(res.data.msg);
        this.requestCartList();
      })
    }
  }
}
</script>

<style scoped>
.main{
  margin-bottom: 100px;
}
.van-submit-bar{
  margin-bottom: 50px;
}
.custom-image .van-empty__image {
  width: 90px;
  height: 90px;
}
.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 100%;
}
</style>