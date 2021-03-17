import {getManager,managerCount} from '../../utils/request'
const state = {
  managerList:[],
  // size :每页显示的条数
  size:2,
  // page: 当前页码数据
  page:1,
  count:0,//计算总的记录数
}

const mutations = {
  changeManagerList(state,arr){
    state.managerList = arr
  },
  changeCount(state,num){
    state.count = num
  },
  //修改当前页码数
  changePage(state,page){
    state.page = page
  }
}


const actions = {
  managerListActions(context){
    var params = {
      size:context.state.size,
      page:context.state.page
    }
    // 发起获取管理员列表请求
    getManager(params).then(res=>{
      // 判断返回列表的数据是否为空.如果为空,将page-1,如果不为空则直接获取列表数据
      if((res.data.list == null || res.data.list.length == 0) && context.state.page > 1){
        // 将page-1
        var p = context.state.page -1;
        context.commit('changePage',p);
        // 自调
        context.dispatch('managerListActions');
        return;
      }
      context.commit('changeManagerList',res.data.list)
    })
  },
  countActions(context){
    // 发起获取总的额记录数请求
    managerCount().then(res=>{
        context.commit('changeCount',res.data.list[0].total)
    })
  },
  pageActions(context,page){
    context.commit('changePage',page)
  }
}

const getters = {
  managerList(state){
    return state.managerList
  },
  count(state){
    return state.count
  }
}

export default {
  state,mutations,actions,getters,
  namespaced:true,
}
