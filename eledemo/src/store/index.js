import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 引入文件
import {state,mutations,getters} from './mutations'
import actions from './actions'

// 引入子模块
import menu from './modules/menu'
import role from './modules/role'
import manage from './modules/manage'
import cate from './modules/cate'
import spec from './modules/spec'
import goods from './modules/goods'
import banner from './modules/banner'
import seckill from './modules/seckill'
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        menu,
        role,
        manage,
        cate,
        spec,
        goods,
        banner,
        seckill,
    }
})