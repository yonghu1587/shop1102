<template>
    <el-dialog :title="info.title" :visible.sync="info.showAdd" @close="cancel">
      <el-form :model="form">
        <el-form-item label="规格名称" :label-width="formLabelWidth">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>
        <el-form-item label="规格属性" :label-width="formLabelWidth" v-for="(item,index) in list" :key='index'>
            <el-col :span="16">
                <el-input v-model="item.value"></el-input>
            </el-col>
            <el-col :span="8">
            <el-button type='primary' v-if="index==0" @click="addType">新增规格属性</el-button>
            <el-button type='danger' v-else @click="delType(index)">删除</el-button>
            </el-col>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ccc"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm" v-if="info.isAdd"
          >确 定</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import {addSpec,getSpecDetail,updateSpecDetail} from '../../../utils/request'
import {successAlert, warningAlert} from '../../../utils/alert'
export default {
  props: ["info"],
  data() {
    return {
      form: {
        specsname: "",
        attrs:'',
        status: 1,
      },
      formLabelWidth:'120px',
      list:[{value:''}],//商品规格属性
      pageInfo:{
        pageSize:2,//每页个数
        page:1,//表示当前页码
      }
    };
  },
  mounted(){
    this.event.$on('specPageInfo',res=>{
      this.pageInfo = res;
    })
  },
  computed:{
    ...mapGetters({
    })
  },
  methods: {
    ...mapActions({
      'requestSpecList':'spec/specListActions',
      'requestSpecCount':'spec/specCountActions',
    }),
    cancel() {
        // 关闭弹窗
        this.info.showAdd = false;
        // 输入清零
        this.form = {
            specsname: "",
            attrs:'',
            status: 1,
        };
        this.list = [{value:''}];
    },
    addType(){
        // 新增规格属性
        this.list.push({value:''});
    },
    delType(i){
        // 删除规格属性
        this.list.splice(i,1)
    },
    confirm() {
        // 处理list的数据
        if(this.list.some(item=>item.value === '')){
            warningAlert("规格属性值不能为空");
            return;
        }
        
        this.form.attrs = this.list.map(item=>item.value).join(',');
        
        addSpec(this.form).then(res=>{
          successAlert(res.data.msg);
          this.cancel();
          this.requestSpecCount();
          // console.log(this.pageInfo);
          this.requestSpecList({'size':this.pageInfo.pageSize,'page':this.pageInfo.page});
        })
    },
    // 获取角色详情
    getDetail(id){
      getSpecDetail({id}).then(res=>{
        this.form = res.data.list[0];
        // 处理attrs的数据
        let newList = this.form.attrs.split(',');
        this.list = [];
        for(let i in newList){
          this.list.push({value:newList[i]});
        }
      })
    },
    // 修改角色
    update() {
      // 处理list的数据
      if(this.list.some(item=>item.value === '')){
        warningAlert("规格属性值不能为空");
        return;
      }
      
      this.form.attrs = this.list.map(item=>item.value).join(',');
      updateSpecDetail(this.form).then(res=>{
        successAlert(res.data.msg);
        this.cancel();
        this.requestSpecList({'size':this.pageInfo.pageSize,'page':this.pageInfo.page});
      })
    },
  },
};
</script>

<style scoped>

</style>