<template>
  <div>
    <v-bread></v-bread>
    <el-button type="primary" @click="add">添加</el-button>
    <!-- <add-button :info='info' ref="open"></add-button> -->
    <v-add :info='info' ref="add"></v-add>
    <v-list @edit='edit'></v-list>
  </div>
</template>

<script>
import vAdd from './addmenu'
import vList from './menulist'
import vBread from '../public/breadcrumb'
// import addButton from '../public/addbutton'
export default {
  data() {
    return {
      info:{
        title:"",
        showAdd:false,
        isAdd:true,//标志是否是add添加方法，区别添加和编辑方法
      },
    };
  },
  mounted() {
    // console.log(this.$route);
    // this.event.$emit('addbutton','添加菜单')
  },
  components:{
    vAdd,
    vList,
    vBread,
    // addButton
  },
  methods:{
    add(){
        this.info.showAdd = true;
        this.info.isAdd = true;
        this.info.title = '添加菜单';
    },
    edit(id){
        this.info.showAdd = true;
        this.info.title = '修改菜单';
        this.info.isAdd = false;
        this.$refs.add.getDetail(id);
    }
  }
};
</script>

<style scoped>
.el-button {
  margin: 10px 0;
}
</style>