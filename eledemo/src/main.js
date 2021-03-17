// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
// 引入重置样式
import './assets/css/reset.css'

// 引入全局公共组件
import components from './components'
for(let item in components){
  Vue.component(item,components[item]);
}

// 引入全局过滤器
import comFilters from './filter'
for(let item in comFilters){
  Vue.filter(item,comFilters[item])
}
//eventBus 
Vue.prototype.event = new Vue;//eventBus
// Vue.prototype.$preImg = 'http://localhost:3000';//定义一个公共的请求端口
Vue.prototype.$preImg = '';//定义一个公共的请求端口
// 引入store
import store from './store'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
