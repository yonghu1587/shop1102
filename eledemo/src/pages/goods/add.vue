<template>
  <div v-show="this.$route.path == '/goods/goodsadd/' + routeId">
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
        <el-col :span="8">
          <el-input v-model="form.goodsname"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="价格" :label-width="formLabelWidth">
        <el-col :span="8">
          <el-input v-model="form.price"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="市场价格" :label-width="formLabelWidth">
        <el-col :span="8">
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
        <el-select v-model="form.specsid" @change="changeSpec">
          <el-option label="--请选择--" value="" disabled></el-option>
          <el-option
            v-for="item in specList"
            :key="item.id"
            :label="item.specsname"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品属性" :label-width="formLabelWidth">
        <el-select v-model="form.specsattr" multiple>
          <el-option label="--请选择--" value="" disabled></el-option>
          <!-- <el-option label="顶级分类" :value="0"></el-option> -->
          <el-option
            v-for="item in specsAttrList"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
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
        <div id="div1" style="z-index: 0"></div>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth">
        <el-button type="primary" @click="confirm" v-if="info.isAdd"
          >确 定</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import E from "wangeditor";
import { mapActions, mapGetters } from "vuex";
import { successAlert, warningAlert } from "../../utils/alert";
import { addGoods, getGoodsDetail, updateGoods } from "../../utils/request";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //价格
        market_price: "", //市场价格
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, //是否热卖
        ishot: 1, //是否新品
        description: "", //商品描述
        img: "", //图片
        status: 1, //状态
      },
      second_catelist: [], //根据一级分类获取二级分类list
      specsAttrList: [], //根据规格编号获取规格属性
      editor: "", //富文本商品描述
      formLabelWidth: "120px",
      imageUrl: "", //要显示的图片地址
      pageInfo: {
        pageSize: 2,
        page: 1,
      },
      // 路由传参，根据ID请求当前的商品详情，0为添加，其余为修改
      routeId: this.$route.params.id,
    };
  },
  watch: {
    specCount: function (newValue, oldValue) {
      this.requestSpecList({ size: newValue, page: 1 });
    },
    $route: {
      handler(newValue, oldValue) {
        this.routeId = newValue.params.id;
        // 路由改变时更改页面的breadList显示
        this.changeRouteId();
      },
      deep: true,
    },
  },
  mounted() {
    this.requestCateList();
    this.requestSpecCount();
    // 使用富文本插件
    this.editor = new E("#div1");
    this.editor.create();

    this.changeRouteId();
  },
  computed: {
    ...mapGetters({
      cateList: "cate/cateList",
      specList: "spec/specList",
      specCount: "spec/specCount",
    }),
  },
  methods: {
    ...mapActions({
      requestCateList: "cate/cateListActions",
      requestSpecList: "spec/specListActions",
      requestSpecCount: "spec/specCountActions",
      requestGoodsCount: "goods/goodsCountActions",
      requestGoodsList: "goods/goodsListActions",
      requestBreadList: "breadListActions",
    }),
    changeRouteId() {
      // 判断是不是列表
      if (this.routeId == undefined) {
        // 清空form表单
        this.cancel();
        this.requestBreadList([
          { path: "/", name: "首页" },
          { name: "商品列表" },
        ]);
      } else if (this.routeId == 0) {
        // 判断是添加还是修改
        this.requestBreadList([
          { path: "/", name: "首页" },
          { path: "/goods", name: "商品列表" },
          { name: "商品添加" },
        ]);
      } else {
        this.requestBreadList([
          { path: "/", name: "首页" },
          { path: "/goods", name: "商品列表" },
          { name: "商品修改" },
        ]);
        this.getDetail(this.routeId);
      }
    },
    changeCate(e) {
      // 一级分类改变时先清空二级分类
      this.second_catelist = [];
      this.form.second_cateid = "";
      // 根据一级分类显示二级分类
      for (let i of this.cateList) {
        if (e == i.id) {
          this.second_catelist = i.children;
        }
      }
      // console.log(this.second_catelist);
    },
    changeSpec(e) {
      // 商品规格改变时先清空规格属性
      this.specsAttrList = [];
      this.form.specsattr = "";
      // 根据商品规格显示规格属性
      for (let i of this.specList) {
        if (e == i.id) {
          console.log(i.attrs);
          this.specsAttrList = i.attrs;
        }
      }
      // console.log(this.specsAttrList);
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
      // 先设置富文本的内容
      this.form.description = this.editor.txt.html();
      addGoods(this.form).then((res) => {
        successAlert(res.data.msg);
        this.cancel();
        // 更新商品数量
        this.requestGoodsCount();
        // 更新列表页面
        this.requestGoodsList({
          page: this.pageInfo.page,
          size: this.pageInfo.pageSize,
        });
      });
    },
    getDetail(id) {
      // 存储list的分页信息
      getGoodsDetail({ id }).then((res) => {
        // 更新二级目录的list
        this.changeCate(res.data.list.first_cateid);
        this.changeSpec(res.data.list.specsid);
        // 更新form的值
        this.form = res.data.list;
        // 添加id属性，提交时要使用
        this.form.id = id;
        // 由于specsattr是一个字符串，要转为数组
        this.form.specsattr = this.form.specsattr.split(",");
        // 图片赋值
        this.imageUrl = this.$preImg + this.form.img;
        // 富文本赋值
        this.editor.txt.html(this.form.description);
      });
    },
    update() {
      // 先设置富文本的内容
      this.form.description = this.editor.txt.html();
      updateGoods(this.form).then((res) => {
        successAlert(res.data.msg);
        // 更新列表页面
        this.requestGoodsList({
          page: this.pageInfo.page,
          size: this.pageInfo.pageSize,
        });
        this.$router.push("/goods");
      });
    },
    cancel() {
      // 清空页面输入
      this.form = {
        first_cateid: "", //二级分类编号
        second_cateid: "", //一级分类编号
        goodsname: "", //商品名称
        price: "", //价格
        market_price: "", //市场价格
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, //是否热卖
        ishot: 1, //是否新品
        description: "", //商品描述
        img: "", //图片
        status: 1, //状态
      };
      this.second_catelist = []; //根据一级分类获取二级分类list
      this.specsAttrList = []; //根据规格编号获取规格属性
      // 设置富文本内容
      this.editor.txt.html("");
      // 清除照片
      this.imageUrl = "";
    },
  },
};
</script>

<style scoped>
.el-form {
  margin: 20px auto;
}
.el-form-item >>> .el-form-item__content {
  z-index: 1;
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