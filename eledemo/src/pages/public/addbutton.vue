<template>
  <el-button type="primary" @click="add">添加</el-button>
</template>

<script>
export default {
  props:['info'],
  methods:{
    add(){
        this.info.showAdd = true;
        this.info.isAdd = true;
        // this.info.title = this.title;
        // this.$emit('changeInfo',this.info);
    },
  },
  mounted(){
      this.event.$on('addbutton',res=>{
          console.log(res);
      })
  }
}
</script>

<style>

</style>