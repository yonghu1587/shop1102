<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        router :default-active="$route.path"
        :unique-opened=true
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/home">
          <i class="el-icon-menu"></i>
          <span>首页</span>
        </el-menu-item>
        <!-- 遍历菜单 -->
        <template v-for="item in user.menus">
          <!-- 一级菜单 有children的时候 -->
          <el-submenu :index="item.title" :key="item.id" v-if="item.children">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <!-- 遍历二级菜单 -->
            <el-menu-item v-for="i in item.children" :key="i.id" :index="'/'+i.url">{{i.title}}</el-menu-item>
          </el-submenu>
          <!-- 没有children的时候 -->
          <el-menu-item :key="item.id" v-else :index="'/'+item.url">{{item.title}}</el-menu-item>
        </template>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span>{{user.username}}</span>
        <i class="el-icon-setting" @click="logout"></i>
      </el-header>
      <el-main>
        <!-- 二级路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  computed:{
    ...mapGetters({
      'user':'user'
    })
  },
  methods:{
    ...mapActions({
      'requestUser':'userActions',
    }),
    logout(){
      // 清空vuex的user
      this.requestUser({});
      // 跳转登录页
      this.$router.push('/login')
    }
  },
};
</script>

<style>
.el-header {
  background-color: #dcdfe6;
  color: black;
  text-align: right;
  height: 60px;
  line-height: 60px;
  padding-right: 50px;
}
.el-aside {
  background-color: #303133;
  color: white;
}

.el-main {
  flex: 1;
  background-color: white;
  color: black;
}

#app > .el-container {
  height: 100vh;
}
</style>