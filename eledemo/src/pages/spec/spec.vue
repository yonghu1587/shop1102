<template>
  <div>
      <v-bread></v-bread>
      <el-button type='primary' @click="add">添加</el-button>
      <v-add :info='info' ref="add"></v-add>
      <v-list @edit='edit'></v-list>
  </div>
</template>

<script>
import vBread from '../public/breadcrumb'
import vAdd from './components/add'
import vList from './components/list'
export default {
    components:{
        vBread,
        vAdd,
        vList
    },
    data(){
        return {
            info:{
                showAdd:false,
                title:'',
                isAdd:true,
            }
        }
    },
    methods:{
        add(){
            this.info.showAdd = true;
            this.info.title = '商品规格添加';
            this.info.isAdd = true;
        },
        edit(id){
            this.info.showAdd = true;
            this.info.title = '商品规格修改';
            this.info.isAdd = false;
            this.$refs.add.getDetail(id);
        }
    }
}
</script>

<style scoped>
.el-button{
    margin: 10px auto;
}
</style>