export const state = {
    user:sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null,
    cartList:[],
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
    changeCartList(state,arr){
        state.cartList = arr;
    }
}


export const getters = {
    user(state){
        return state.user;
    },
    cartList(state){
        return state.cartList;
    },
    cartNum(state){
        let num = 0;
        state.cartList.map(item=>{
            num += item.num;
        })
        return num;
    }
}