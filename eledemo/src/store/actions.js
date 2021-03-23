
export default {
    userActions(context,user){
        context.commit('changeUser',user);
    },
    breadListActions(context,arr){
        context.commit('changeBreadList',arr);
    }
}