<template lang="jade">
div(class="page-banner")
  div(v-if="is_signup == 1")
    banner_success
  div(v-else)
    banner_inner
</template>

<script>
import banner_success from '../components/banner-success.vue'
import banner_inner from '../components/banner-inner.vue'
import { myStore } from '../js/store'

export default {
  name:'gbuild-index',
  replace: true,
  data () {
    return {
      msg: 'Hello from vue-loader 2016 changed!',
      info_data:{},
      is_signup:0,
      item:{}
    }
  },
  ready(){
    /* 取uid */
    let vue_this = this;
    vue_this.info_data = myStore.storage.get('info_data');
    console.log(vue_this.info_data);
  },
  components: {
    banner_success,
    banner_inner
  },

  watch: { 
    info_data(val){
      let vue_this = this;
      if(!vue_this.info_data){

        let value = myStore._f7Ajax('get',{'uid':myStore.paramter.get('uid'),'token':myStore.paramter.get('token'),'act_id':1},myStore.project.url,'info_data');

        function cb(){
            let info_data = myStore.storage.get('info_data');
            vue_this.info_data = info_data;
        };

      }
    }
  },

  computed: { 
    is_signup(){
      const info_data = this.info_data;
      if( info_data.is_signup){
        return info_data.is_signup
      }else{
        return 0
      }
    }
  },

  methods: { },

  compiled(){
    let vue_this = this;
    vue_this.info_data = myStore.storage.get('info_data');
  }

}
</script>

<style lang="less">
  .page{
    background: none;
  }
  .page-content{
    background: none;
    &.page-banner{
      position: relative;
    }
  }
</style>
