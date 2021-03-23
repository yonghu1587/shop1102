import {getGoodsCount,getGoodsList} from '../../utils/request'

const state = {
    goodsCount:0,
    goodsList:[],
}

const mutations = {
    changeGoodsCount(state,num){
        state.goodsCount = num;
    },
    changeGoodsList(state,arr){
        state.goodsList = arr;
    }
}

const actions = {
    goodsCountActions(context){
        getGoodsCount().then(res=>{
            context.commit('changeGoodsCount',res.data.list[0].total);
        })
    },
    goodsListActions(context,params){
        getGoodsList(params).then(res=>{
            context.commit('changeGoodsList',res.data.list);
        })
    }
}

const getters = {
    goodsCount(state){
        return state.goodsCount;
    },
    goodsList(state){
        return state.goodsList;
    }
}

export default{
    state,mutations,actions,getters,namespaced:true,
}