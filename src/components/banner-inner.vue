<template>
  <div class="counter" @click="linkNext() | debounce 500">
    <img v-bind:src="img_url" alt="" class="entrance">
    <a href="javascript:void(0)" class="now-part"></a>
  </div>
</template>

<script>
import { myStore } from '../js/store'
export default {
  name: 'banner-inner',
  replace:true,
  data () {
    return { user_ID: 0 }
  },

  ready () {
    let vue_this = this;
    if(myStore.storage.get('info_data') || this.info_data){
      vue_this.info_data = myStore.storage.get('info_data') || this.info_data;
      vue_this.user_ID = vue_this.info_data.user_ID;
      myApp.hideIndicator();
    }
  },
  computed: { 
    img_url(){
      return "dist/img/ginner.png";
    }
  },
  methods: {
    linkNext(){
      if(isInApp.call()){
        const path = "http://app.52tt.com";
        // const path = "http://192.168.9.230";
        var link = path+"/active/guild_support_lachine/#!/#guild-zone-rules";
        myWebview.appNav(link);
      }
    }
  },
  component: {

  },
  compiled(){

  }
  
}
</script>
<style lang="less">
  @import url('../less/vars.less');
  html{
    font-size: 62.5%;
  }
  body{
    font-size: 1.4rem;
    .entrance{
      width: 90%;
      height: 90px;
      margin: auto;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }
    .counter{
      position: relative;
      background: #313131;
      width: 100%;
      height: 90px;
      .now-part{
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        width: 9.5rem;
        height: 2rem;
        bottom: 0.3rem;
      }
    }
  }
  
</style>