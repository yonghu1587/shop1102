import {getMemberList} from '../../utils/request'

const state = {
    memberList:[],
}

const mutations = {
    changeMemberList(state,arr){
        state.memberList = arr;
    }
}

const actions = {
    memberListActions(context){
        getMemberList().then(res=>{
            context.commit('changeMemberList',res.data.list);
        })
    }
}

const getters = {
    memberList(state){
        return state.memberList;
    }
}

export default {
    state,mutations,actions,getters,namespaced:true,
}