<template>
  <div>
    <v-bread></v-bread>
    <el-button type="primary" @click="add">添加</el-button>
    <v-add :info='info' ref="add"></v-add>
    <v-list @edit='edit'></v-list>
  </div>
</template>

<script>
import vBread from '../public/breadcrumb'
import vAdd from './components/add'
import vList from './components/list'
export default {
  data(){
    return {
      info:{
        showAdd:false,
        title:'',
        isAdd:true,
      }
    }
  },
  components:{
    vBread,
    vAdd,
    vList,
  },
  methods:{
    add(){
      this.info.showAdd = true;
      this.info.title = '添加角色';
      this.info.isAdd = true;
    },
    edit(id){
      this.info.showAdd = true;
      this.info.title = '修改角色';
      this.info.isAdd = false;
      this.$refs.add.getDetail(id);
    }
  }
}
</script>

<style scoped>
.el-button {
  margin: 10px 0;
}
</style>