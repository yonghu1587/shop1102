import {getManageList,getManageCount} from '../../utils/request'
const state = {
    manageList:[],
    manageCount:0,
}

const mutations = {
    changeManageList(state,arr){
        state.manageList = arr;
    },
    changeManageCount(state,num){
        state.manageCount = num;
    }
}

const actions = {
    manageListActions(context,params){
        getManageList(params).then(res=>{
            context.commit('changeManageList',res.data.list)
        })
    },
    manageCountActions(context){
        getManageCount().then(res=>{
            context.commit('changeManageCount',res.data.list[0].total)
        })
    }
}

const getters = {
    manageList(state){
        return state.manageList;
    },
    manageCount(state){
        return state.manageCount;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true,
}