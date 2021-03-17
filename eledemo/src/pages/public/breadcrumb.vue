<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <template v-for="(item,index) in this.$route.matched">
        <el-breadcrumb-item :key="index" :to="{ path: index==0? '/':item.path }">{{item.name}}</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>{{ this.$route.name }}</el-breadcrumb-item> -->
        </template>
    </el-breadcrumb>
</template>

<script>
export default {
}
</script>

<style>

</style>