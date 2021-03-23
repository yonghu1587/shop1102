export const state = {
    user:sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null,
    breadList:[{path:'/',name:'首页'}],
}   

export const mutations = {
    changeUser(state,user){
        state.user = user;
        if(user){
            // 2.同时将用户信息存入sessionStorage中
            sessionStorage.setItem('user',JSON.stringify(user))
        }else{
            sessionStorage.removeItem('user')
        }
    
    },
    changeBreadList(state,arr){
        state.breadList = arr;
    }
}


export const getters = {
    user(state){
        return state.user;
    },
    breadList(state){
        return state.breadList;
    }
}