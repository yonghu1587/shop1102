<template>
  <div>
      <v-bread></v-bread>
      <v-add :info='info'></v-add>
      <v-list :info='info'></v-list>
  </div>
</template>

<script>
import vBread from '../public/breadcrumb'
import vList from './list'
import vAdd from './add'
export default {
    components:{
        vBread,
        vAdd,
        vList,
    },
    data(){
        return {
            info:{
                isAdd:true,
            }
        }
    },
}
</script>

<style>

</style>