<template>
  <el-form :model="form">
    <el-form-item label="标题" :label-width="formLabelWidth">
      <el-col :span="8">
        <el-input v-model="form.title"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item v-model="form.img" label="图片" :label-width="formLabelWidth">
      <el-upload
        class="avatar-uploader"
        action="#"
        :show-file-list="false"
        :on-change="changeImg"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
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
      <el-button type="primary" @click="confirm" v-if="$route.params.id == 0"
        >确 定</el-button
      >
      <el-button type="primary" @click="update" v-else>修 改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions } from "vuex";
import { warningAlert, successAlert } from "../../utils/alert";
import { addBanner, getBannerDetail, updateBanner } from "../../utils/request";
// import { mapActions } from 'vuex';
export default {
  data() {
    return {
      form: {
        title: "",
        img: "",
        status: 1,
      },
      formLabelWidth: "120px",
      imageUrl: "", //要显示的图片地址
      // 路由传参，根据ID请求当前的商品详情，0为添加，其余为修改
      bannerId: this.$route.params.id,
    };
  },
  mounted() {
    this.changeBreadList();
  },
  methods: {
    ...mapActions({
      requestBreadList: "breadListActions",
      requestBannerList: "banner/bannerListActions",
    }),
    changeBreadList() {
      // 通过bannerId控制面包屑导航
      if (this.bannerId == undefined) {
        this.requestBreadList([
          { path: "/", name: "首页" },
          { path: "/banner", name: "轮播图列表" },
        ]);
        // 清空form表单
        this.cancel();
      } else if (this.bannerId == 0) {
        this.requestBreadList([
          { path: "/", name: "首页" },
          { path: "/banner", name: "轮播图列表" },
          { name: "轮播图添加" },
        ]);
      } else {
        this.requestBreadList([
          { path: "/", name: "首页" },
          { path: "/banner", name: "轮播图列表" },
          { name: "轮播图修改" },
        ]);
        // 发起轮播图详情请求
        this.bannerDetail();
      }
    },
    changeImg(e) {
      // 1.处理文件大小
      if (e.size > 2 * 1024 * 1024) {
        warningAlert("文件大小不能超过2M");
        return;
      }

      // 2.处理文件后缀
      var ext = [".jpg", ".png", ".jpeg", ".gif"];
      var extName = e.name.slice(e.name.lastIndexOf("."));
      if (!ext.some((item) => item == extName)) {
        warningAlert("上传文件格式不正确");
        return;
      }

      // 上传显示的文件
      // 将文件生成url地址,并显示在页面中
      this.imageUrl = URL.createObjectURL(e.raw);
      // 将文件存放到form.img中
      this.form.img = e.raw;
    },
    confirm() {
      addBanner(this.form).then((res) => {
        successAlert(res.data.msg);
        this.requestBannerList();
        this.cancel();
      });
    },
    bannerDetail() {
      getBannerDetail({ id: this.bannerId }).then((res) => {
        this.form = res.data.list;
        // 显示图片
        this.imageUrl = this.$preImg + res.data.list.img;
      });
    },
    update() {
      this.form.id = this.bannerId;
      console.log(this.form);
      updateBanner(this.form).then((res) => {
        successAlert(res.data.msg);
        this.requestBannerList();
        this.cancel();
        this.$router.push("/banner");
      });
    },
    cancel() {
      // 清空form表单
      this.form = {
        title: "",
        img: "",
        status: 1,
      };
      this.imageUrl = "";
    },
  },
  watch: {
    $route: {
      deep: true,
      handler(newValue) {
        this.bannerId = newValue.params.id;
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