<template>
  <div class="rule container">
    <ul>
      <li class="item1"><img v-bind:src="grule_02" alt=""></li>
      <li class="item2">
        <img v-bind:src="grule_03" alt="">
        <a href="javascript:void(0)" class="regist" @click="joinUs(is_signup,is_build)"></a>
      </li>
      <li class="item3"><img v-bind:src="grule_04" alt=""></li>
      <li class="item4"><img v-bind:src="grule_05" alt=""></li>
      <li class="item5"><img v-bind:src="grule_06" alt=""></li>
      <li class="item6"><img v-bind:src="grule_07" alt=""></li>
    </ul>
  </div>
</template>

<script>
import { myStore } from '../js/store'
export default {
  name: 'banner-rules',
  replace:true,
  data () {
    return {
      is_signup:0,
      is_build:0,
      info_data_join:{}
    }
  },
  ready(){
    let vue_this = this;
    if(myStore.storage.get('info_data') || this.info_data){
      vue_this.info_data =  myStore.storage.get('info_data') || this.info_data;
      vue_this.is_signup = vue_this.info_data.is_signup;
      vue_this.is_build = vue_this.info_data.user_role;
      vue_this.user_id = vue_this.info_data.user_ID || vue_this.user_id;
    }else{
      vue_this.is_signup = 0;
      vue_this.is_build = 0;
    }
    
  },
  methods: {
    joinUs(key,value){
      let vue_this = this;
      if(key){
        myApp.alert('您所在公会已报名参与！');
      }else if(!value){
        myApp.alert('本活动只能公会会长报名参与哦，  赶紧去通知会长吧。');
      }else{
        let promise = new Promise((resolve, reject) => {
          let value = myStore._f7Ajax('get',{'uid':myStore.paramter.get('uid'),'token':myStore.paramter.get('token'),'act_id':1},myStore.project.joinUrl,'info_data');
          resolve(value);
        });
        promise.then(function(value) {
            let info_data = myStore.storage.get('info_data');
            vue_this.info_data = info_data;
            vue_this.is_signup = vue_this.info_data.is_signup;
            if(!!vue_this.info_data){
              myApp.modal({
                  title: '提示',
                  text: '报名成功！',
                  buttons: [
                      {
                          text: '确定',
                          onClick: function () {

                          }
                      }
                  ]
              });
            }
          }, function(value) {
        });
      }
    }
  },
  component: {
  },
  computed: { 
    grule_02(){
      return "dist/img/grule_02.png";
    },
    grule_03(){
      return "dist/img/grule_03.png";
    },
    grule_04(){
      return "dist/img/grule_04.png";
    },
    grule_05(){
      return "dist/img/grule_05.png";
    },
    grule_06(){
      return "dist/img/grule_06.png";
    },
    grule_07(){
      return "dist/img/grule_07.png";
    }
  },
  compiled(){
    let vue_this = this;
  }
}

</script>

<style lang="less">
  @import url('../less/vars.less');
    .container{
      &.rule{
        ul>li>img{
          width: 100%;
        }
        ul>li{
          position: relative;
          .regist{
              position: absolute;
              left: 0;
              right: 0;
              margin: auto;
              bottom: 1.4rem;
              width: 40%;
              height: 42px;
          }
        }
      }
    &.page-on-left{
      display: none;
    }
  }
</style>