<template>
  <el-table
      :data="menuList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children'}"
    >
      <el-table-column prop="id" label="菜单编号">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称">
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标"> </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
      <el-table-column prop="status" label="状态">
          <template v-slot="prop">
              <el-button type="primary" v-if="prop.row.status==1">启用</el-button>
              <el-button type="danger" v-else>禁止</el-button>
          </template>
      </el-table-column>
      <el-table-column label="操作" min-width='150'>
        <template v-slot="prop">
            <el-row>
                <el-button type="primary" @click="edit(prop.row.id)">编辑</el-button>
                <el-button type="danger" @click="del(prop.row.id)">删除</el-button>
            </el-row>
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import { delMenu } from '../../utils/request';
export default {
    data(){
        return{
            
        }
    },
    computed:{
        ...mapGetters({
            'menuList':'menu/menuList'
        })
    },
    mounted(){
        this.requestMenuList({istree:true});
        this.requestBreadList([{path:'/',name:'首页'},{path:'/goods',name:'菜单列表'}]);
    },
    methods:{
        ...mapActions({
            'requestMenuList':'menu/menuListActions',
            'requestBreadList':'breadListActions',
        }),
        edit(id){
            this.$emit('edit',id)
        },
        del(id){
            this.$confirm('确定删除该菜单?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            }).then(() => {
                delMenu({id}).then(res=>{
                    this.requestMenuList({istree:true});
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
    }
}
</script>

<style>

</style>