<template>
  <div v-show="this.$route.path == '/goods'">
      <el-button type='primary' @click="add">添加</el-button>
  </div>
</template>

<script>

export default {
    props:['info'],
    methods:{
        add(){
            this.info.showAdd = true;
            this.info.title = '添加商品';
            this.info.isAdd = true;
            this.$router.push('/goods/goodsadd')
        }
    }
}
</script>

<style scoped>
.el-button{
    margin: 10px auto;
}
</style>