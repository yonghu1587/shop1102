<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.showAdd" @close="cancel">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
            <el-tree
                :data="menuList"
                show-checkbox
                node-key="id"
                :default-checked-keys='defaultKey'
                :props="defaultProps" ref="tree">
            </el-tree>
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
import {addRole,getRoleDetail,updateRoleDetail} from '../../../utils/request'
import {successAlert} from '../../../utils/alert'
export default {
  props: ["info"],
  data() {
    return {
      form: {
        rolename: "",
        status: 1,
      },
      formLabelWidth:'120px',
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      defaultKey:[],//默认选中的树形文件的值
    };
  },
  mounted(){
    this.requestMenuList({istree:true})
  },
  computed:{
    ...mapGetters({
    'menuList':'menu/menuList'
    })
  },
  methods: {
    ...mapActions({
        'requestMenuList':'menu/menuListActions',
        'requestRoleList':'role/roleListActions'
    }),
    cancel() {
        // 关闭弹窗
        this.info.showAdd = false;
        // 输入清零
        this.form = {
            rolename: "",
            status: 1,
        }
        // 清除选中的角色权限
        this.$refs.tree.setCheckedKeys([]);
    },
    confirm() {
        this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
        addRole(this.form).then(res=>{
          successAlert(res.data.list);
          this.cancel();
          this.requestRoleList();
        })
    },
    // 获取角色详情
    getDetail(id){
      getRoleDetail({id}).then(res=>{
        this.form = res.data.list;
        this.form.id = id;
        // 设置tree的默认选项
        this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus));
      })
    },
    // 修改角色
    update() {
      // 先获取选中的节点，更新form中的数据
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      updateRoleDetail(this.form).then(res=>{
        successAlert(res.data.msg);
        this.cancel();
        this.requestRoleList();
      })
    },
  },
};
</script>

<style>
</style>