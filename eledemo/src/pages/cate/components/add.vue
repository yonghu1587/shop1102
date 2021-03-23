<template>
  <el-dialog :title="info.title" :visible.sync="info.showAdd" @close="cancel">
    <el-form :model="form">
      <el-form-item label="所属角色" :label-width="formLabelWidth">
        <el-select v-model="form.pid">
          <el-option label="--请选择--" value="" disabled></el-option>
          <el-option label="顶级分类" :value="0"></el-option>
          <el-option
            v-for="item in cateList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" :label-width="formLabelWidth">
        <el-input v-model="form.catename"></el-input>
      </el-form-item>
      <el-form-item label="图片" :label-width="formLabelWidth">
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
import { mapActions, mapGetters } from "vuex";
import {
  addCate,
  getCateDetail,
  updateCateDetail,
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      },
      formLabelWidth: "120px",
      imageUrl: "", //要显示的图片地址
    };
  },
  mounted() {
    this.requestCateList();
  },
  computed: {
    ...mapGetters({
      cateList: "cate/cateList",
    }),
  },
  methods: {
    ...mapActions({
      'requestCateList': "cate/cateListActions",
    }),
    cancel() {
      // 关闭弹窗
      this.info.showAdd = false;
      // 输入清零
      this.form = {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      };
      this.imageUrl = "";
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
      if (this.form.catename != "") {
        addCate(this.form).then((res) => {
          successAlert(res.data.msg);
          this.cancel();
          // 更新表格
          this.requestCateList();
        });
      }
    },
    // 获取角色详情
    getDetail(id) {
      getCateDetail({ id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        // console.log(res.data);
        this.imageUrl = this.$preImg + res.data.list.img;
      });
    },
    // 修改角色
    update() {
      if (this.form.catename != "") {
        console.log(this.form);
        updateCateDetail(this.form).then((res) => {
          successAlert(res.data.msg);
          this.cancel();
          // 更新表格
          this.requestCateList();
        });
      }
    },
  },
};
</script>

<style scoped>
.el-dialog__wrapper {
  overflow: hidden;
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
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>