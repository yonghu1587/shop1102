import {getCartList} from '../utils/request'
export default {
    userActions(context,user){
        context.commit('changeUser',user);
    },
    cartListActions(context,params){
        getCartList({uid:context.state.user.uid}).then(res=>{
            context.commit('changeCartList',res.data.list);
        })
    }
}