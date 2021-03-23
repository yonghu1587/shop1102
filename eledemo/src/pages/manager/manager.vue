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
    components:{
        vBread,
        vAdd,
        vList,
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
            this.info.title='添加管理员';
            this.info.isAdd = true;
        },
        edit(uid){
            this.info.showAdd = true;
            this.info.title='修改管理员信息';
            this.info.isAdd = false;
            this.$refs.add.getDetail(uid);
        }
    }
}
</script>

<style scoped>
.el-button{
    margin: 10px 0;
}
</style>