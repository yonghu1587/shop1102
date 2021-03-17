import axios from 'axios'
import qs from 'qs'
import {errorAlert} from './alert'
import store from '../store/index'
// 配置基础路径
// const baseUrl = '/api';
const baseUrl = ''

// 定义全局请求拦截
axios.interceptors.request.use(config=>{
   if(config.url != baseUrl+'/api/userlogin'){
    // 如果不是登录接口则设置请求头
    config.headers.authorization = store.state.user.token;
   }
    // console.log(config.url);
    return config;
})

// 定义全局响应拦截
axios.interceptors.response.use(res=>{
    if(res.data.code !== 200){
        errorAlert(res.data.msg);
        return;
    }
    // console.group(res.config.url)
    // console.log(res);
    // console.groupEnd();
    return res;
})
// 添加菜单
export const addMenu = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+"/api/menuadd",
        data:qs.stringify(data)
    })
}

// 获取菜单列表
export const getMenuList = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/menulist',
        params,
    })
}

//获取菜单详情（一条数据）
export const getMenuDetail = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/menuinfo',
        params,
    })
}

// 修改菜单
export const updateMenuDetail = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/menuedit',
        data:qs.stringify(data),
    })
}

// 删除菜单
export const delMenu = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/menudelete',
        data:qs.stringify(data)
    })
}

// 添加角色
export const addRole = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/roleadd',
        data:qs.stringify(data),
    })
}

//角色列表
export const getRoleList = ()=>{
    return axios ({
        method:'get',
        url:baseUrl+'/api/rolelist',
    })
}

// 获取角色详情（一条）
export const getRoleDetail = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/roleinfo',
        params,
    })
}

// 修改角色
export const updateRoleDetail = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/roleedit',
        data:qs.stringify(data),
    })
}

// 删除角色
export const delRole = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/roledelete',
        data:qs.stringify(data),
    })
}

// 添加管理员
export const addManage = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/useradd',
        data:qs.stringify(data)
    })
}
// 获取管理员列表
export const getManageList = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/userlist',
        params,
    })
}

// 获取管理员总数
export const getManageCount = ()=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/usercount',
    })
}

// 获取管理员信息（一条）
export const getManageDetail = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/userinfo',
        params,
    })
}

// 修改管理员信息
export const updateManageDetail = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/useredit',
        data:qs.stringify(data),
    })
}

// 删除管理员
export const delManage = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/userdelete',
        data:qs.stringify(data)
    })
}

// 登录
export const userLogin = (data)=>{
    return axios({
      method:'post',
      url:baseUrl+'/api/userlogin',
      data:qs.stringify(data)
    })
}

// 商品分类添加
export const addCate = (data)=>{
    const form = new FormData();
    for(let item in data){
        form.append(item,data[item]);
    }
    return axios({
        method:'post',
        url:baseUrl+'/api/cateadd',
        data:form,
    })
}

//获取商品分类列表 
export const getCateList = ()=>{
    const params = {
        istree:true,
    }
    return axios({
        method:'get',
        url:baseUrl+'/api/catelist',
        params,
    })
}

// 获取商品分类详情（一条数据）
export const getCateDetail = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/cateinfo',
        params,
    })
}

// 修改商品分类
export const updateCateDetail = (data)=>{
    const form = new FormData();
    for(let item in data){
        form.append(item,data[item]);
    }
    return axios({
        method:'post',
        url:baseUrl+'/api/cateedit',
        data:form,
    })
}

// 删除商品分类
export const delCate = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/catedelete',
        data:qs.stringify(data),
    })
}

// 添加商品规格
export const addSpec = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/specsadd',
        data:qs.stringify(data),
    })
}

// 获取商品规格列表
export const getSpecList = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/specslist',
        params,
    })
}

// 获取商品规格总数
export const getSpecCount = ()=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/specscount',
    })
}

// 获取商品规格（一条）
export const getSpecDetail = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/specsinfo',
        params,
    })
}

// 修改商品规格
export const updateSpecDetail = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/specsedit',
        data:qs.stringify(data),
    })
}

// 删除商品规格
export const delSpec = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/specsdelete',
        data:qs.stringify(data),
    })
}

// 商品添加
export const addGoods = (data)=>{
    let form = new FormData();
    for(let i in data){
        form.append(i,data[i]);
    }
    return axios({
        method:'post',
        url:baseUrl+'/api/goodsadd',
        data:form,
    })
}