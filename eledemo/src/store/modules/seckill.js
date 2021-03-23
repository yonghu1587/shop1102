import {getSeckillList} from '../../utils/request'

const state = {
    seckillList:[],
}

const mutations = {
    changeSeckillList(state,arr){
        state.seckillList = arr;
    }
}

const actions = {
    seckillListActions(context){
        getSeckillList().then(res=>{
            context.commit('changeSeckillList',res.data.list)
        })
    }
}

const getters = {
    seckillList(state){
        return state.seckillList;
    }
}

export default {
    state,mutations,actions,getters,namespaced:true,
}