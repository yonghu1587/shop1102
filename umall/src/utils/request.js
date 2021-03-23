import axios from 'axios'
import qs from 'qs'
import { Toast } from 'vant'
import router from '../router/index'
// 配置基础路径
const baseUrl = "/api";
// 设置请求头
axios.interceptors.request.use(config => {
    // console.group("本次请求地址为:" + config.url)
    // 设置请求头
    const user = JSON.parse(sessionStorage.getItem('user'))
    if (user) {
        // 设置请求头
        config.headers.authorization = user.token;
    }
    return config
})

// 设置响应拦截
axios.interceptors.response.use(res => {
    console.group('本次响应路径为:' + res.config.url)
    if (res.data.code === 200) {
        console.log(res);
        console.groupEnd();
        return res;
    }else{
        // 提示错误信息
        Toast.fail(res.data.msg);
        if(res.data.code == 403){
            router.push('/login');
        }
        return false;
    }
})

// 会员注册
export const register = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/register',
        data:qs.stringify(data)
    })
}

// 会员登录
export const login = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/login',
        data:qs.stringify(data)
    })
}

// 获取banner信息
export const getBanner = ()=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/getbanner'
    })
}
// 获取分类信息
export const getCate = ()=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/getcate'
    })
}

// 获取分类信息，树形结构
export const getCateTree = ()=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/getcatetree',
    })
}

// 获取商品信息
export const getGoods = ()=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/getindexgoods'
    })
}

// 添加购物车
export const cartAdd = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/cartadd',
        data:qs.stringify(data)
    })
}

// 获取分类商品
export const getCateGoods = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/getgoods',
        params,
    })
}

// 获取购物车列表
export const getCartList = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/cartlist',
        params,
    })
}

// 删除购物车
export const delCart = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/cartdelete',
        data:qs.stringify(data),
    })
}