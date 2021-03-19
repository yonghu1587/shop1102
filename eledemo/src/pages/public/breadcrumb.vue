<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <template v-for="(item,index) in breadList">
        <el-breadcrumb-item v-if="item.path" :key="index" :to="{ path:item.path }">{{item.name}}</el-breadcrumb-item>
        <el-breadcrumb-item v-else :key="index">{{item.name}}</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>{{ this.$route.name }}</el-breadcrumb-item> -->
        </template>
    </el-breadcrumb>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed:{
        ...mapGetters({
            'breadList':'breadList',
        })
    }
}
</script>

<style>

</style>