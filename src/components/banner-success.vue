<template>
  <div class="banner">
   <div class="bg">
      <div class="gbuild">
        <dl class="name">
          <dt>公会创建时间：</dt>
          <dd>{{buildTime}}</dd>
        </dl>
        <dl class="kind">
          <dt>贵公会属于：</dt>
          <dd>{{buildKind}}</dd>
        </dl>
      </div>
      <div class="rp" v-if="gbuild_type == 0">
        <dl class="num">
          <dt>今日人气值：<em> {{guild_popularity_value.today}} </em> </dt>
        </dl>
        <dl class="total">
          <dt>本周累积人气值：<em> {{guild_popularity_value.total}}</em> </dt>
        </dl>
      </div>
      <div class="rp" v-if="gbuild_type == 1">
        <dl class="num">
          <dt>今日活跃值：<em>{{guild_activity_value.today}}</em></dt>
        </dl>
        <dl class="total">
          <dt>本周累积活跃值：<em>{{guild_activity_value.total}}</em> </dt>
        </dl>
      </div>
      <a href="javascript:void(0)" class="gentry" @click="inlinkNext() | debounce 500"></a>
   </div>
  </div>
</template>

<script>
import { myStore } from '../js/store'

export default {
  name: 'banner-sucess',
  data () {
    return {
      item:{},
      gbuild_type:0,
      guild_popularity_value:{},
      guild_activity_value:{},
      isajax:false
    }
  },
  ready(){
    let vue_this = this;
    vue_this.info_data = myStore.storage.get('info_data') || this.info_data;
    vue_this.item = vue_this.info_data || [];
    vue_this.guild_popularity_value = vue_this.item.guild_popularity_value;
    vue_this.guild_activity_value = vue_this.item.guild_activity_value;
    vue_this.user_id = vue_this.item.user_ID || vue_this.user_id;
    this.create_time = vue_this.item.create_time;
    // console.log(vue_this.info_data)
  },
  props:['info_data'],
  computed: { 
    buildTime() {
      if(this.item){
        let buildtime = this.create_time;
        let buildtimeIn = new Date(parseInt(buildtime)*1000).toLocaleString();
        let length = buildtimeIn.indexOf(' ');
        let buildtimeTn = new Date(parseInt(buildtime)*1000).toLocaleString().substr(0,length).split('/').join('-');
        console.log(buildtimeTn);
        return buildtimeTn
      }
    },
    buildKind(){
      if(this.item){
        let buildcreat = this.create_time;
        //春节时间
        let buildholiday = new Date(2016,1,7).getTime()/1000;
        let buildname;
        if(buildcreat > buildholiday){
          this.gbuild_type = 0;
          buildname ='新公会'
        }else{
          this.gbuild_type = 1;
          buildname = '老公会'
        }
        return buildname
      }
    },
    gsuc_joins(){
      return "dist/img/gsuc_joins.png"
    }
  },
  methods: {
    inlinkNext(){
      if(isInApp.call()){
        const path = "http://app.52tt.com";
        var link = path+"/active/guild_support_lachine/#!/#guild-zone-rules?uid=" + this.user_ID;
        myWebview.appNav(link);
      }
    }
  },
  compiled(){
    let vue_this = this;
  }
}

</script>

<style lang="less">
@import url('../less/vars.less');
  body{
    .entrance{
      width: 90%;
      margin: auto;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }
    .bg{
      position: relative;
      background: url(http://app.52tt.com/active/guild_support_lachine/dist/img/gsuc_joins.png) no-repeat;
      width: 100%;
      height: 90px;
      background-size: 100% 100%;
      color: #fff;
      dl{
          display: block;
      }
      .gbuild{
        position: absolute;
        top: 40px;
        left: 8px;
        right: 0;
        margin: auto;
        width: 260px;
        color: #bd998b;
        .flexbox();
        .justify-content(space-between);
        font-size: @size-T1;
        dl.name{
          width: 180px;
          dt{
            float: left;
          }
        } 
        dl.kind{
          width: 130px;
          dt{
            float: left;
          }
        } 
      }
      .rp{
        position: absolute;
        bottom: -10px;
        left: 8px;
        right: 0;
        margin: auto;
        width: 260px;
        padding-top: 45px;
        .flexbox();
        .justify-content(space-between);
        font-size: @size-T1;
        dl.num{
          width: 120px;
          .clearfix();
          dt{
            line-height: 25px;
            em{
              position: relative;
              top: 2px;
              font-size: @size-T6;
              color: #ffd75a;
            }
          }
        } 
        dl.total{
          .clearfix();
          width: 160px;
          dt{
            line-height: 25px;
            em{
              position: relative;
              top: 2px;
              font-size: @size-T6;
              color: #ffd75a;
            }
          }
        } 
      }
      .gentry{
        display: inline-block;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 45px;
        height: 40px;
      }
    }
  }
</style>
