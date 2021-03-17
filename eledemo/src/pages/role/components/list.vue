<template>
  <el-table
    :data="roleList"
    border
    style="width: 100%">
    <el-table-column prop="id" label="角色编号" width="180"></el-table-column>
    <el-table-column prop="rolename" label="角色名称" width="180"></el-table-column>
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
import {delRole} from '../../../utils/request'
export default {
    data(){
        return {
        }
    },
    computed:{
        ...mapGetters({
            'roleList':'role/roleList'
        })
    },
    methods:{
        ...mapActions({
            'requestRoleList':'role/roleListActions'
        }),
        edit(id){
            this.$emit('edit',id);
        },
        del(id){
            this.$confirm('确定删除该角色?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            }).then(() => {
                delRole({id}).then(res=>{
                    this.requestRoleList({istree:true});
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
    },
    mounted(){
        this.requestRoleList();
    }
}
</script>

<style>

</style>