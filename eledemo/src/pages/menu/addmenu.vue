<template>
  <el-dialog :title="info.title" :visible.sync="info.showAdd" @close='cancel'>
    <el-form :model="form" >
      <el-form-item label="菜单名称" :label-width="formLabelWidth">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" :label-width="formLabelWidth">
        <el-select v-model="form.pid">
          <el-option label="--请选择--" value="" disabled></el-option>
          <el-option label="顶级菜单" :value="0"></el-option>
          <el-option v-for="item in list" :key="item.id" :label="item.title" :value='item.id'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单类型" :label-width="formLabelWidth">
        <el-radio v-model="form.type" :label="1">目录</el-radio>
        <el-radio v-model="form.type" :label="2">菜单</el-radio>
      </el-form-item>
      <el-form-item label="菜单图标" :label-width="formLabelWidth" v-if="form.type == 1">
        <el-select v-model="form.icon">
          <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item">{{item}}</i>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else>
        <el-select v-model="form.url" >
            <el-option v-for="item in urls" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-switch
        v-model="form.status"
        active-color="#13ce66"
        inactive-color="#ccc" :active-value="1" :inactive-value="2">
        </el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm" v-if="info.isAdd">确 定</el-button>
      <el-button type="primary" @click="update" v-else>修 改</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { successAlert } from '../../utils/alert';
import { addMenu,getMenuDetail,updateMenuDetail } from '../../utils/request';
export default {
    props:['info'],
    data(){
        return{
          form: {
              pid: 0,
              title: '',
              icon: '',
              type: 1,//类型 1目录 2菜单
              url: '',
              status: 1,//状态 1正常 2 禁用
          },
          formLabelWidth: '120px',
          // 所有图标
          icons:['el-icon-setting','el-icon-s-goods','el-icon-menu'],
          // 所有菜单地址
          urls:[
          'menu',
          'home',
          'role',
          'manager',
          'cate',
          'spec',
          'goods',
          'member',
          'banner',
          'seckill'
          ],
        }
    },
    computed:{
      ...mapGetters({
        'list':'menu/menuList'
      })
    },
    mounted(){
      this.requestMenuList();
    },
    methods:{
      ...mapActions({
        'requestMenuList':'menu/menuListActions'
      }),
      // 取消添加
      cancel(){
        this.info.showAdd = false;
        this.form = {
          pid: 0,
          title: '',
          icon: '',
          type: 1,//类型 1目录 2菜单
          url: '',
          status: 1,//状态 1正常 2 禁用
        }
      },
      // 添加方法
      confirm(){
        // 提交数据
        addMenu(this.form).then(res=>{
          successAlert(res.data.msg);
          this.requestMenuList({istree:true});
          this.cancel();
        })
      },
      // 获取菜单详情
      getDetail(id){
        getMenuDetail({id}).then(res=>{
          this.form = res.data.list;
          this.form.id = id;
        })
      },
      // 修改菜单方法
      update(){
        updateMenuDetail(this.form).then(res=>{
          successAlert(res.data.msg);
          this.requestMenuList({istree:true});
          this.cancel();
        })
      }
    }
};
</script>

<style scoped>
#app .el-dialog-body{
    padding-bottom: 10px;
}
</style>