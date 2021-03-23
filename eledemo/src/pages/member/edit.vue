<template>
  <el-form :model="form">
    <el-form-item label="手机号" :label-width="formLabelWidth">
      <el-col :span="8">
        <el-input v-model="form.phone"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="昵称" :label-width="formLabelWidth">
      <el-col :span="8">
        <el-input v-model="form.nickname"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth">
      <el-col :span="8">
        <el-input type='password' v-model="form.password" placeholder="留空则表示不修改"></el-input>
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
    <el-form-item :label-width="formLabelWidth">
      <el-button type="primary" @click="update">修 改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions } from "vuex";
import { successAlert } from "../../utils/alert";
import { getMemberDetail, updateMember } from "../../utils/request";
export default {
  data() {
    return {
      form: {
        nickname: "",
        phone:'',
        password:'',
        status: 1,
      },
      formLabelWidth: "120px",
      // 路由传参，根据ID请求当前的商品详情，0为添加，其余为修改
      memberId: this.$route.params.id,
    };
  },
  mounted() {
    this.changeBreadList();
  },
  methods: {
    ...mapActions({
      requestBreadList: "breadListActions",
      requestMemberList: "member/memberListActions",
    }),
    memberDetail() {
      getMemberDetail({ uid: this.memberId }).then((res) => {
        this.form = res.data.list;
        this.form.password = '';
      });
    },
    update() {
      updateMember(this.form).then((res) => {
        successAlert(res.data.msg);
        // 更新表格
        this.requestMemberList();
        this.cancel();
        this.$router.push("/member");
      });
    },
    cancel() {
      // 清空form表单
      this.form = {
        nickname: "",
        phone:'',
        password:'',
        status: 1,
      };
    },
    changeBreadList() {
      // 通过seckillId控制面包屑导航
      if (this.memberId == undefined) {
        this.requestBreadList([
          { path: "/", name: "首页" },
          { name: "会员列表" },
        ]);
        // 清空form表单
        this.cancel();
      } else {
        this.requestBreadList([
          { path: "/", name: "首页" },
          { path: "/member", name: "会员列表" },
          { name: "会员修改" },
        ]);
        // 发起会员详情请求
        this.memberDetail();
      }
    },
  },
  watch: {
    $route: {
      deep: true,
      handler(newValue) {
        this.memberId = newValue.params.id;
        this.changeBreadList();
      },
    },
  },
};
</script>

<style scoped>
.el-form {
  margin: 20px auto;
}
.avatar-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  min-width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  min-width: auto;
  height: 100px;
  display: block;
}
</style>