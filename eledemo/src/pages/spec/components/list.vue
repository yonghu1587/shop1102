<template>
<div>
  <el-table
      :data="specList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column prop="id" label="规格编号">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称">
      </el-table-column>
      <el-table-column label="规格属性">
          <template v-slot="prop">
           <el-tag v-for="(item,index) in prop.row.attrs" :key="index" >{{item}}</el-tag>
        </template>
      </el-table-column>
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
    <el-pagination
        background
        layout="prev, pager, next"
        :pager-count='5'
        :page-size='pageInfo.pageSize'
        :total="specCount"
        @current-change='updateSpecList'>
    </el-pagination>
</div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import { successAlert } from '../../../utils/alert'
import {delSpec} from '../../../utils/request'
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
            'specList':'spec/specList',
            'specCount':'spec/specCount'
        })
    },
    mounted(){
        this.requestSpecCount();
        this.requestSpecList({'size':this.pageInfo.pageSize,'page':1});
        // 非父子之间通信，通过eventBus把事件传递给add组件
        this.event.$emit('specPageInfo',this.pageInfo);
        this.requestBreadList([{path:'/',name:'首页'},{path:'/goods',name:'商品规格列表'}]);
    },
    methods:{
        ...mapActions({
            'requestSpecList':'spec/specListActions',
            'requestSpecCount':'spec/specCountActions',
            'requestBreadList':'breadListActions'
        }),
        updateSpecList(page){
            this.pageInfo.page = page;
            this.event.$emit('specPageInfo',this.pageInfo);
            this.requestSpecList({'size':this.pageInfo.pageSize,'page':page})
        },
        edit(id){
            this.$emit('edit',id);
        },
        del(id){
            this.$confirm('确定删除该管理员?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            }).then(() => {
                delSpec({id}).then(res=>{
                    successAlert(res.data.msg);
                    // 更新分页数量
                    this.requestSpecCount();
                    // 如果当前页数>1并且当前页只有一条数据，则当前页数-1然后再更新页面
                    if(this.specList.length < 2 && this.pageInfo.page > 1){
                        this.pageInfo.page = this.pageInfo.page-1;
                    }
                    this.requestSpecList({'size':this.pageInfo.pageSize,'page':this.pageInfo.page});
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