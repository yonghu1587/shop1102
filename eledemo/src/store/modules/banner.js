import {getBannerList} from '../../utils/request'

const state = {
    bannerList:[],
}

const mutations = {
    changeBannerList(state,arr){
        state.bannerList = arr;
    }
}

const actions = {
    bannerListActions(context){
        getBannerList().then(res=>{
            context.commit('changeBannerList',res.data.list)
        })
    }
}

const getters = {
    bannerList(state){
        return state.bannerList;
    }
}

export default {
    state,mutations,actions,getters,namespaced:true,
}