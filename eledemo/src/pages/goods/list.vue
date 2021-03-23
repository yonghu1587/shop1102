<template>
  <div v-show="this.$route.path == '/goods'">
    <el-button type='primary' @click="add">添加</el-button>
    <el-table
      :data="goodsList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column prop="id" label="商品编号"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称"></el-table-column>
      <el-table-column prop="price" label="商品价格"></el-table-column>
      <el-table-column prop="market_price" label="商品市场价格"></el-table-column>
      <el-table-column label="图片">
        <template v-slot='prop'>
            <img :src="$preImg+prop.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品">
          <template v-slot="prop">
              <el-button type="primary" size='mini' v-if="prop.row.isnew==1">是</el-button>
              <el-button type="danger" size='mini' v-else>否</el-button>
          </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖">
          <template v-slot="prop">
              <el-button type="primary" size='mini' v-if="prop.row.ishot==1">是</el-button>
              <el-button type="danger" size='mini' v-else>否</el-button>
          </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
          <template v-slot="prop">
              <el-button type="primary" size='mini' v-if="prop.row.status==1">启用</el-button>
              <el-button type="danger" size='mini' v-else>禁止</el-button>
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
        :total="goodsCount"
        @current-change='updateGoodsList'>
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { successAlert } from '../../utils/alert';
import {delGoods} from '../../utils/request'

export default {
    props:['info'],
    data(){
        return{
            pageInfo:{
                pageSize:2,
                page:1,
            }
        }
    },
    methods:{
        ...mapActions({
            'requestGoodsCount':'goods/goodsCountActions',
            'requestGoodsList':'goods/goodsListActions',
            'requestBreadList':'breadListActions',
        }),
        add(){
            this.info.isAdd = true;
            this.requestBreadList([{path:'/',name:'首页'},{path:'/goods',name:'商品列表'},{name:'商品添加'}]);
            this.$router.push('/goods/goodsadd/0')
        },
        updateGoodsList(page){
            // 更新页码
            this.pageInfo.page = page;
            this.requestGoodsList({'size':this.pageInfo.pageSize,'page':page});
        },
        edit(id){
            this.info.isAdd = false;
            
            this.$router.push('/goods/goodsadd/'+id);
        },
        del(id){
            this.$confirm('确定删除该商品?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            }).then(() => {
                delGoods({id}).then(res=>{
                    successAlert(res.data.msg);
                    if(this.goodsList.length < 2 && this.pageInfo.page != 1){
                        this.pageInfo.page--;
                    }
                    this.requestGoodsCount();
                    this.requestGoodsList({'size':this.pageInfo.pageSize,'page':this.pageInfo.page});
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
        this.requestGoodsCount();
    },
    computed:{
        ...mapGetters({
            'goodsCount':'goods/goodsCount',
            'goodsList':'goods/goodsList',
        })
    },
    watch:{
        // 监听商品数量，如果改变则更新list视图
        goodsCount:function(newValue,oldValue){
            this.requestGoodsList({'size':this.pageInfo.pageSize,'page':this.pageInfo.page});
        },
    }
}
</script>

<style scoped>
.el-button{
    margin: 10px auto;
}
img{
    width: 60px;
}
</style>