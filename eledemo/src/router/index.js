import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const index = ()=> import('../pages/index/index')
const login = ()=> import('../pages/login/login')
const menu = ()=> import('../pages/menu/menu')
const role = ()=> import('../pages/role/role')
const manager = ()=> import('../pages/manager/manager')
const cate = ()=> import('../pages/cate/cate')
const spec = ()=> import('../pages/spec/spec')
const goods = ()=> import('../pages/goods/goods')
const goodsadd = ()=> import('../pages/goods/add')
const goodsedit = ()=> import('../pages/goods/add')
const echarts = ()=> import('../pages/index/echarts')

export default new Router({
  routes: [
    {
      path:'/login',
      component:login,
      name:'登录'
    },
    {
      path:'/',
      component:index,
      name:'首页',
      children:[
        {
          path:'home',
          component:echarts,
          name:'首页'
        },
        {
          path:'menu',
          component:menu,
          name:"菜单列表"
        },
        {
          path:'role',
          component:role,
          name:'角色管理'
        },
        {
          path:'manager',
          component:manager,
          name:'管理员管理'
        },
        {
          path:'cate',
          component:cate,
          name:'商品分类'
        },
        {
          path:'spec',
          component:spec,
          name:'商品规格'
        },
        {
          path:'goods',
          component:goods,
          name:'商品列表',
          children:[
            {
              path:'goodsadd',
              component:goodsadd,
              name:'商品添加'
            },
            {
              path:'goodsedit',
              component:goodsedit,
              name:'商品修改'
            },
          ]
        },
        
        {
          path:"*",
          redirect:'/home'
        }
      ]
    },
    {
      path:"*",
      redirect:'/login'
    }
  ]
})
