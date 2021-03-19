<template>
  <div>
    <v-bread></v-bread>
    <v-add
      v-show="this.$route.path == '/seckill/seckilladd/' + this.$route.params.id"
    ></v-add>
    <div class="list" v-show="this.$route.path == '/seckill'">
      <el-button type="primary" @click="add">添加</el-button>
      <el-table
        :data="seckillList"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
      >
        <el-table-column prop="title" label="名称"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot="prop">
            <el-button type="success" size="mini" v-if="prop.row.status == 1"
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
import { delSeckill } from "../../utils/request";
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
      seckillList: "seckill/seckillList",
    }),
  },
  mounted() {
    this.requestSeckillrList();
  },
  methods: {
    ...mapActions({
      requestBreadList: "breadListActions",
      requestSeckillrList: "seckill/seckillListActions",
    }),
    add() {
      this.$router.push("/seckill/seckilladd/0");
      this.requestBreadList([
        { path: "/", name: "首页" },
        { path: "/seckill", name: "活动列表" },
        { name: "活动添加" },
      ]);
      // console.log(this.$route.params.id);
    },
    edit(id) {
      this.$router.push("/seckill/seckilladd/" + id);
    },
    del(id) {
      this.$confirm("确定删除该活动?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      })
        .then(() => {
          delSeckill({id}).then(res=>{
            successAlert(res.data.msg);
            this.requestSeckillrList();
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

</style>