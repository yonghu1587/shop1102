<template>
  <el-form :model="form">
    <el-form-item label="活动名称" :label-width="formLabelWidth">
      <el-col :span="8">
        <el-input v-model="form.title"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item v-model="form.img" label="活动时间" :label-width="formLabelWidth">
      <div class="block">
        <el-date-picker
          v-model="dateValue"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format='yyyy-MM-dd'
          format='yyyy-MM-dd'>
        </el-date-picker>
      </div>
    </el-form-item>
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
      <el-select v-model="form.second_cateid" @change="changeSecondCate">
        <el-option label="--请选择--" value="" disabled></el-option>
        <el-option
          v-for="item in second_catelist"
          :key="item.id"
          :label="item.catename"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="商品" :label-width="formLabelWidth">
      <el-select v-model="form.goodsid">
        <el-option label="--请选择--" value="" disabled></el-option>
        <el-option
          v-for="item in goodslist"
          :key="item.id"
          :label="item.goodsname"
          :value="item.id"
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
    <el-form-item :label-width="formLabelWidth">
      <el-button type="primary" @click="confirm" v-if="$route.params.id == 0"
        >确 定</el-button
      >
      <el-button type="primary" @click="update" v-else>修 改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { warningAlert, successAlert } from "../../utils/alert";
import { addSeckill, getSeckillDetail, updateSeckill, sidGetGoodsList } from "../../utils/request";
// import { mapActions } from 'vuex';
export default {
  data() {
    return {
      form: {
        title: "",
        begintime:'',
        endtime:'',
        first_cateid:'',
        second_cateid:'',
        goodsid:'',
        status: 1,
      },
      formLabelWidth: "120px",
      // 路由传参，根据ID请求当前的商品详情，0为添加，其余为修改
      seckillId: this.$route.params.id,
      second_catelist: [], //根据一级分类获取二级分类list
      goodslist: [], //根据一级分类和二级分类获取商品list
      dateValue: [], //活动时间
    };
  },
  mounted() {
    this.changeBreadList();
    this.requestCateList();
  },
  computed:{
    ...mapGetters({
      cateList: "cate/cateList",
    }),
  },
  methods: {
    ...mapActions({
      requestBreadList: "breadListActions",
      requestSeckillList: "seckill/seckillListActions",
      requestCateList: "cate/cateListActions",
    }),
    changeCate(e) {
      // 一级分类改变时先清空二级分类和商品
      this.second_catelist = [];
      this.goodslist = [];
      this.form.second_cateid = "";
      this.form.goodsid = "";
      // 根据一级分类显示二级分类
      for (let i of this.cateList) {
        if (e == i.id) {
          this.second_catelist = i.children;
        }
      }
      console.log(this.second_catelist);
    },
    changeSecondCate(){
      // 二级分类改变时清空商品
      this.goodslist = [];
      this.form.goodsid = "";
      sidGetGoodsList({fid:this.form.first_cateid,sid:this.form.second_cateid}).then(res=>{
        this.goodslist = res.data.list;
      })
      // console.log(this.goodslist);
    },
    confirm() {
      this.form.begintime = this.dateValue[0];
      this.form.endtime = this.dateValue[1];
      addSeckill(this.form).then((res) => {
        successAlert(res.data.msg);
        this.requestSeckillList();
        this.cancel();
      });
    },
    seckillDetail() {
      getSeckillDetail({ id: this.seckillId }).then((res) => {
        this.changeCate(res.data.list.first_cateid);
        sidGetGoodsList({fid:res.data.list.first_cateid,sid:res.data.list.second_cateid}).then(res=>{
          this.goodslist = res.data.list;
        })
        this.form = res.data.list;
        this.dateValue = [];
        this.dateValue.push(this.form.begintime);
        this.dateValue.push(this.form.endtime);
      });
    },
    update() {
      this.form.id = this.seckillId;
      this.form.begintime = this.dateValue[0];
      this.form.endtime = this.dateValue[1];
      // console.log(this.form);
      updateSeckill(this.form).then((res) => {
        successAlert(res.data.msg);
        this.requestSeckillList();
        this.cancel();
        this.$router.push("/seckill");
      });
    },
    cancel() {
      // 清空form表单
      this.form = {
        title: "",
        begintime:'',
        endtime:'',
        first_cateid:'',
        second_cateid:'',
        goodsid:'',
        status: 1,
      };
      this.second_catelist= []; //根据一级分类获取二级分类list
      this.goodslist= []; //根据一级分类和二级分类获取商品list
      this.dateValue= ""; //活动时间
    },
    changeBreadList() {
      // 通过seckillId控制面包屑导航
      if (this.seckillId == undefined) {
        this.requestBreadList([
          { path: "/", name: "首页" },
          { path: "/seckill", name: "活动列表" },
        ]);
        // 清空form表单
        this.cancel();
      } else if (this.seckillId == 0) {
        this.requestBreadList([
          { path: "/", name: "首页" },
          { path: "/seckill", name: "活动列表" },
          { name: "活动添加" },
        ]);
      } else {
        this.requestBreadList([
          { path: "/", name: "首页" },
          { path: "/seckill", name: "活动列表" },
          { name: "活动修改" },
        ]);
        // 发起活动详情请求
        this.seckillDetail();
      }
    },
  },
  watch: {
    $route: {
      deep: true,
      handler(newValue) {
        this.seckillId = newValue.params.id;
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