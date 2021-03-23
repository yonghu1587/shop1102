<template>
  <div>
    <v-bread></v-bread>
    <v-add
      v-show="this.$route.path == '/banner/banneradd/' + this.$route.params.id"
    ></v-add>
    <div class="list" v-show="this.$route.path == '/banner'">
      <el-button type="primary" @click="add">添加</el-button>
      <el-table
        :data="bannerList"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
      >
        <el-table-column prop="id" label="编号" width="50"></el-table-column>
        <el-table-column prop="title" label="轮播图标题"></el-table-column>
        <el-table-column label="图片">
          <template v-slot="prop">
            <img :src="$preImg + prop.row.img" alt="" />
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot="prop">
            <el-button type="primary" size="mini" v-if="prop.row.status == 1"
              >启用</el-button
            >
            <el-button type="danger" size="mini" v-else>禁止</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150">
          <template v-slot="prop">
            <el-row>
              <el-button type="primary" @click="edit(prop.row.id)"
                >编辑</el-button
              >
              <el-button type="danger" @click="del(prop.row.id)"
                >删除</el-button
              >
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import vAdd from "./add";
import vBread from "../public/breadcrumb";
import { mapActions, mapGetters } from "vuex";
import { delBanner } from "../../utils/request";
import { successAlert } from "../../utils/alert";
export default {
  components: {
    vAdd,
    vBread,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      bannerList: "banner/bannerList",
    }),
  },
  mounted() {
    this.requestBannerList();
  },
  methods: {
    ...mapActions({
      requestBreadList: "breadListActions",
      requestBannerList: "banner/bannerListActions",
    }),
    add() {
      this.$router.push("/banner/banneradd/0");
      this.requestBreadList([
        { path: "/", name: "首页" },
        { path: "/banner", name: "轮播图列表" },
        { name: "轮播图添加" },
      ]);
      // console.log(this.$route.params.id);
    },
    edit(id) {
      this.$router.push("/banner/banneradd/" + id);
    },
    del(id) {
      this.$confirm("确定删除该轮播图?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      })
        .then(() => {
          delBanner({id}).then(res=>{
            successAlert(res.data.msg);
            this.requestBannerList();
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
.el-button {
  margin: 10px auto;
}
img {
  width: 130px;
}
</style>