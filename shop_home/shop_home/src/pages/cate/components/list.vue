<template>
  <div>
    <el-table
      :data="cateData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{ children: 'children'}"
    >
      <el-table-column prop="id" label="分类编号"  >
      </el-table-column>
      <el-table-column prop="catename" label="分类名称"  >
      </el-table-column>
      <el-table-column  label="图片">
        <template v-slot="prop">
          <img :src="$preImg+prop.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
          <template v-slot="prop">
              <el-button type="primary" v-if="prop.row.status==1">启用</el-button>
              <el-button type="danger" v-else>禁止</el-button>
          </template>
      </el-table-column>
      <el-table-column prop="status" label="操作">
          <template v-slot="prop">
            <el-button type="primary" @click="edit(prop.row.id)">编辑</el-button>
            <el-button type="danger" @click="del(prop.row.id)">删除</el-button>
          </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import {delCate} from '../../../utils/request'
import {successAlert} from '../../../utils/alert'
export default {
  computed:{
    ...mapGetters({
      "cateData":"cate/cateList"
    })
  },
  methods:{
    ...mapActions({
      "requestCateList":"cate/cateListActions"
    }),
    edit(id){
      this.$emit("edit",id);
    },
    del(id){
       this.$confirm('确定要删除吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              // 发起删除分类请求
              delCate({id}).then(res=>{
                  // 已经删除成功
                  successAlert(res.data.msg);
                  this.requestCateList()
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
    this.requestCateList()
  }
}
</script>

<style scoped>
img{
  width:100px;
}

</style>
