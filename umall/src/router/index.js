import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const login  = ()=>import('../pages/login')
const register  = ()=>import('../pages/register')
const index  = ()=>import('../pages/index')
const home  = ()=>import('../pages/home')
const goodsList  = ()=>import('../pages/goodsList')
const mime  = ()=>import('../pages/mime')
const cate  = ()=>import('../pages/cate')
const cart  = ()=>import('../pages/cart')
export default new Router({
  routes: [
    {
      path:'/login',
      component:login,
      name:"登录",
    },
    {
      path:'/register',
      component:register,
      name:"注册",
    },
    {
      path:'/',
      component:index,
      name:"首页",
      children:[
        {
          path:'home',
          component:home,
          name:"首页",
        },
        {
          path:'cate',
          component:cate,
          name:"分类",
        },
        {
          path:'cart',
          component:cart,
          name:"购物车",
        },
        {
          path:'mime',
          component:mime,
          name:"个人中心",
        },
        {
          path:'*',
          redirect:'/home',
        },
      ]
    },
    {
      path:'/goodsList',
      component:goodsList,
      name:"商品列表",
    },
    {
      path:'*',
      redirect:'/login'
    },
  ]
})
