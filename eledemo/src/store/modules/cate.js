import { getCateList } from "../../utils/request";

const state = {
    cateList:[],
}

const mutations = {
    changeCateList(state,arr){
        state.cateList = arr;
    }
}

const actions = {
    cateListActions(context){
        getCateList().then(res=>{
            context.commit('changeCateList',res.data.list);
        })
    }
}

const getters = {
    cateList(state){
        return state.cateList
    }
}

export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true,
}