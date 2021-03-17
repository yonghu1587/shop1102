import { getSpecCount, getSpecList } from "../../utils/request";

const state = {
    specCount:0,
    specList:[],
}

const mutations = {
    changeSpecCount(state,num){
        state.specCount = num;
    },
    changeSpecList(state,arr){
        state.specList = arr;
    }
}

const actions = {
    specCountActions(context){
        getSpecCount().then(res=>{
            context.commit('changeSpecCount',res.data.list[0].total);
        })
    },
    specListActions(context,params){
        getSpecList(params).then(res=>{
            context.commit('changeSpecList',res.data.list);
        })
    }
}

const getters = {
    specCount(state){
        return state.specCount;
    },
    specList(state){
        return state.specList;
    }
}

export default {
    state,mutations,actions,getters,namespaced:true,
}