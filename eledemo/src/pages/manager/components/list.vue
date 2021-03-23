<template>
<div>
  <el-table
      :data="manageList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column prop="id" label="用户编号">
      </el-table-column>
      <el-table-column prop="username" label="用户名">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色"> </el-table-column>
      <el-table-column prop="status" label="状态">
          <template v-slot="prop">
              <el-button type="primary" v-if="prop.row.status==1">启用</el-button>
              <el-button type="danger" v-else>禁止</el-button>
          </template>
      </el-table-column>
      <el-table-column label="操作" min-width='150'>
        <template v-slot="prop">
            <el-row>
                <el-button type="primary" @click="edit(prop.row.uid)">编辑</el-button>
                <el-button type="danger" @click="del(prop.row.uid)">删除</el-button>
            </el-row>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        :pager-count='5'
        :page-size='pageInfo.pageSize'
        :total="manageCount"
        @current-change='updateSpecList'>
    </el-pagination>
</div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import {delManage} from '../../../utils/request'
export default {
    data(){
        return{
            pageInfo:{
                pageSize:2,//每页个数
                page:1,//表示当前页码
            }
        }
    },
    computed:{
        ...mapGetters({
            'manageList':'manage/manageList',
            'manageCount':'manage/manageCount'
        })
    },
    mounted(){
        this.requestManageCount();
        this.requestManageList({'size':this.pageInfo.pageSize,'page':1});
        // 非父子之间通信，通过eventBus把事件传递给add组件
        this.event.$emit('pageInfo',this.pageInfo);
        this.requestBreadList([{path:'/',name:'首页'},{path:'/goods',name:'管理员列表'}]);
    },
    methods:{
        ...mapActions({
            'requestManageList':'manage/manageListActions',
            'requestManageCount':'manage/manageCountActions',
            'requestBreadList':'breadListActions',
        }),
        updateSpecList(page){
            this.pageInfo.page = page;
            this.event.$emit('pageInfo',this.pageInfo);
            this.requestManageList({'size':this.pageInfo.pageSize,'page':page})
        },
        edit(id){
            this.$emit('edit',id);
        },
        del(uid){
            this.$confirm('确定删除该管理员?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            }).then(() => {
                delManage({uid}).then(res=>{
                    // 更新分页数量
                    this.requestManageCount();
                    // 如果当前页数>1并且当前页只有一条数据，则当前页数-1然后再更新页面
                    if(this.manageList.length < 2 && this.pageInfo.page > 1){
                        this.pageInfo.page = this.pageInfo.page-1;
                    }
                    this.requestManageList({'size':this.pageInfo.pageSize,'page':this.pageInfo.page});
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