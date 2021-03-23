<template>
  <div>
    <v-bread></v-bread>
    <v-edit
      v-show="this.$route.path == '/member/memberedit/' + this.$route.params.id"
    ></v-edit>
    <div class="list" v-show="this.$route.path == '/member'">
      <el-table
        :data="memberList"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
      >
        <el-table-column prop="id" label="用户编号"></el-table-column>
        <el-table-column prop="nickname" label="昵称"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
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
              <el-button type="primary" @click="edit(prop.row.uid)"
                >编辑</el-button
              >
              <el-button type="danger" @click="del(prop.row.uid)"
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
import vEdit from "./edit";
import vBread from "../public/breadcrumb";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    vEdit,
    vBread,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      memberList: "member/memberList",
    }),
  },
  mounted() {
    this.requestMemberList();
  },
  methods: {
    ...mapActions({
      requestBreadList: "breadListActions",
      requestMemberList: "member/memberListActions",
    }),
    edit(uid) {
      this.$router.push("/member/memberedit/" + uid);
    },
  },
};
</script>

<style scoped>
.list{
  margin-top: 10px;
}
</style>