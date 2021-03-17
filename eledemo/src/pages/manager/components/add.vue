<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.showAdd" @close="cancel">
      <el-form :model="form">
        <el-form-item label="所属角色" :label-width="formLabelWidth">
          <el-select v-model="form.roleid">
            <el-option label="--请选择--" value="" disabled></el-option>
          <el-option v-for="item in roleList" :key="item.id" :label="item.rolename" :value='item.id'></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" type='password'></el-input>
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
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import {addManage,getManageDetail,updateManageDetail} from '../../../utils/request'
import {successAlert} from '../../../utils/alert'
export default {
  props: ["info"],
  data() {
    return {
      form: {
        roleid:'',
        username: '',
        password:'',
        status: 1,
      },
      formLabelWidth:'120px',
      pageInfo:{
        pageSize:2,
        page:1,
      },//页码信息
    };
  },
  mounted(){
    this.requestRoleList();
    // 监听pageInfo事件，得到当前页面的page信息
    this.event.$on('pageInfo',(res)=>{
        this.pageInfo = res;
    });
  },
  computed:{
    ...mapGetters({
    'roleList':'role/roleList'
    })
  },
  methods: {
    ...mapActions({
        'requestRoleList':'role/roleListActions',
        'requestManageList':'manage/manageListActions',
        'requestManageCount':'manage/manageCountActions',
    }),
    cancel() {
        // 关闭弹窗
        this.info.showAdd = false;
        // 输入清零
        this.form = {
            roleid:'',
            username: '',
            password:'',
            status: 1,
        }
    },
    confirm() {
        if(this.form.username != '' && this.form.password != '' && this.form.roleid != ''){
            addManage(this.form).then(res=>{
            successAlert(res.data.msg);
            this.cancel();
            // 更新页码
            this.requestManageCount();
            // 更新表格  
            this.requestManageList({'size':this.pageInfo.pageSize,'page':this.pageInfo.page});
            })
        }
    },
    // 获取角色详情
    getDetail(uid){
        console.log(uid);
        getManageDetail({uid}).then(res=>{
            this.form = res.data.list;
            this.form.password = '';
        })
    },
    // 修改角色
    update() {
        if(this.form.username != '' && this.form.password != ''){
            updateManageDetail(this.form).then(res=>{
                successAlert(res.data.msg);
                this.cancel();
                // 更新表格
                this.requestManageList({'size':this.pageInfo.pageSize,'page':this.pageInfo.page});
            })
        }
      
    },
  },
};
</script>

<style>
</style>