<template>
  <div>
    <div class="left">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item v-for="item in cateList" :key="item.id" :title="item.catename" @click="getSecondCate(item.id)" />
      </van-sidebar>
    </div>
    <div class="right">
      <van-grid :border="false" :column-num="3">
        <van-grid-item v-for="item in secondCateList" :key="item.id" @click="getGoodsList(item.id)">
          <van-image :src="$preImg+item.img" />
          <p>{{item.catename}}</p>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getCateList } from '../../../eledemo/src/utils/request';
import { getCate, getCateTree } from '../utils/request';
export default {
  data(){
    return {
      activeKey:0,
      cateList:[],
      secondCateList:[],
    }
  },
  mounted(){
    this.requestCateList();
  },
  methods:{
    requestCateList(){
      getCateTree().then(res=>{
        this.cateList = res.data.list;
        this.getSecondCate(this.cateList[0].id);
      })
    },
    getSecondCate(id){
      for(let i of this.cateList){
        if(id == i.id){
          this.secondCateList = i.children;
        }
      }
      console.log(this.secondCateList);
    },
    getGoodsList(id){
      console.log(id);
    }
  }
}
</script>

<style scoped>
.left{
  float: left;
}
.right{
  margin-left: 60px;
}

</style>