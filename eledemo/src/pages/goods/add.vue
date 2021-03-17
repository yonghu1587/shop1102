<template>
<div v-show="this.$route.path == '/goods/goodsadd'">
    <el-form :model="form">
      <el-form-item label="一级分类" :label-width="formLabelWidth">
        <el-select v-model="form.first_cateid" @change="changeCate">
          <el-option label="--请选择--" value="" disabled></el-option>
          <el-option
            v-for="item in cateList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" :label-width="formLabelWidth">
        <el-select v-model="form.second_cateid">
          <el-option label="--请选择--" value="" disabled></el-option>
          <el-option
            v-for="item in second_catelist"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称" :label-width="formLabelWidth">
        <el-col :span='8'>
          <el-input v-model="form.goodsname"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="价格" :label-width="formLabelWidth">
        <el-col :span='8'>
          <el-input v-model="form.price"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="市场价格" :label-width="formLabelWidth">
        <el-col :span='8'>
          <el-input v-model="form.market_price"></el-input>
        </el-col>
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
      <el-form-item label="商品规格" :label-width="formLabelWidth">
        <el-select v-model="form.specsid">
          <el-option label="--请选择--" value="" disabled></el-option>
          <!-- <el-option
            v-for="item in specList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item label="商品属性" :label-width="formLabelWidth">
        <el-select v-model="form.specsattr">
          <el-option label="--请选择--" value="" disabled></el-option>
          <el-option label="顶级分类" :value="0"></el-option>
          <!-- <el-option
            v-for="item in cateList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option> -->
        </el-select>
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
      <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth">
        <el-button type="primary" @click="confirm" v-if="info.isAdd">确 定</el-button>
       <el-button type="primary" @click="update" v-else>修 改</el-button>
      </el-form-item>
    </el-form>
</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { successAlert, warningAlert } from "../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        first_cateid: '',//二级分类编号
        second_cateid:'',//一级分类编号
        goodsname: "",//商品名称
        price:'',//价格
        market_price:'',//市场价格
        specsid:'',//商品规格编号
        specsattr:'',//商品规格属性
        isnew:1,//是否热卖
        ishot:1,//是否新品
        description:'',//商品描述
        img: "",//图片
        status: 1,//状态
      },
      second_catelist:[],
      formLabelWidth: "120px",
      imageUrl: "", //要显示的图片地址
    };
  },
  mounted() {
    this.requestCateList();
    this.requestSpecCount();
    this.requestSpecList({'size':4,'page':1});
  },
  computed: {
    ...mapGetters({
      'cateList': "cate/cateList",
      'specList':'spec/specList',
      'specCount':'spec/specCount'
    }),
  },
  methods: {
    ...mapActions({
      'requestCateList': "cate/cateListActions",
      'requestSpecList':'spec/specListActions',
      'requestSpecCount':'spec/specCountActions',
    }),
    changeCate(e){
        // 一级分类改变时先清空二级分类
        this.second_catelist = [];
        this.form.second_cateid = '';
        // 根据一级分类显示二级分类
        for(let i of this.cateList){
            if (e == i.id){
                this.second_catelist = i.children;
            }
        }
        // console.log(this.second_catelist);
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
      
    },
    getDetail(id) {
      
    },
    update() {
     
    },
  },
};
</script>

<style scoped>
.el-form{
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