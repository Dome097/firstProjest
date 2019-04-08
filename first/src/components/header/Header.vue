<template>
  <section class="container-fluid" >
    <!--第一个头部 初始界面-->
    <nav class="nv navbar navbar-fixed-top firstHead" v-if="isFirst">
      <router-link class="pull-left" :to="{}">ele.me</router-link>
      <div class="pull-right" v-if="!loggingStatus">
        <span><router-link :to="{name:'login'}">登录</router-link></span>
        <span>|</span>
        <span><router-link :to="{name:'login'}">注册</router-link></span>
      </div>
      <div class="pull-right" v-if="loggingStatus">
        <span><router-link :to="{name:'profile'}"><i class="iconfont">&#xe71d;</i></router-link></span>
      </div>
    </nav>
    <!--第二个头部 当前城市-->
    <nav class="nv navbar navbar-fixed-top firstHead"  v-show="isShow">
      <i class="pull-left iconfont" @click="back">&#xe682;</i>
      <router-link :to="{}" class="centerContent">{{nowCity}}</router-link>
      <span class="pull-right" v-show="isHide" @click="back">切换城市</span>
    </nav>
    <!--第三个头部 当前区域-->
    <nav class="nv navbar navbar-fixed-top firstHead" v-if="isThree">
      <router-link class="glyphicon glyphicon-search pull-left" :to="{name:'search'}"></router-link>
      <span class="dome-span">
              <router-link :to="{}">{{domeRegion}}</router-link>
      </span>
      <div class="pull-right" v-if="!loggingStatus">
        <span><router-link :to="{name:'login'}">登录</router-link></span>
        <span>|</span>
        <span><router-link :to="{name:'login'}">注册</router-link></span>
      </div>
      <div class="pull-right" v-if="loggingStatus">
        <span><router-link :to="{name:'profile'}"><i class="iconfont">&#xe71d;</i></router-link></span>
      </div>
    </nav>
    <!--第四个头部 商家界面-->
    <nav class="nv navbar navbar-fixed-top bg-warning fourModule"  v-if="isFour" :style="{background: 'url('+http+singleStoreData.image_path+')',backgroundSize:'cover'}" style="box-shadow: 2rem 2rem 5rem lightgray inset">
      <i class="iconfont toLeft" @click="back">&#xe682</i>
      <img :src="http+singleStoreData.image_path" alt="" class="pull-left fourModuleImg" style="">
      <div class="introduce">
        <p class="introduce_name">{{singleStoreData.name}}</p>
        <p class="introduceC">
          <span>商家配送</span>
          <span>/</span>
          <span>{{singleStoreData.order_lead_time}}送达</span>
          <span>/</span>
          <span>配送费¥{{singleStoreData.float_minimum_order_amount}}</span>
        </p>
        <p class="introduceC">公告:{{singleStoreData.promotion_info}}</p>
      </div>
      <i class="iconfont goFoodDetail" @click="toFoodDetail">&#xe634</i>
      <div  class="leftSmall" v-if="singleStoreData.activities[0]" @click="isThis=true;isFour=false">
          <span class="pull-left leftSmallL">
            <span class="leftSmallLP">{{singleStoreData.activities[0].icon_name}}</span>
            <span>{{singleStoreData.activities[0].description}}(APP专享) </span>
          </span>
          <i class="iconfont leftSmallR pull-right">1个活动 &#xe634 </i>
      </div>
    </nav>
    <!--第五个头部food的头部-->
    <nav class="nv navbar navbar-fixed-top firstHead"  v-if="isFive">
      <i class="pull-left iconfont" @click="back">&#xe682;</i>
      <router-link :to="{}" class="centerContent">{{foodTitle}}</router-link>
    </nav>
    <!--点击活动页面出现活动页面-->
    <div class="activityPage" v-if="isThis">
      <p class="activityPageTitle">{{singleStoreData.name}}</p>
        <span class="activityPageC">优惠信息</span>
        <span class="activityPageD">
          <span class="leftSmallLP">{{singleStoreData.activities[0].icon_name}}</span>
          <span>{{singleStoreData.activities[0].description}}(APP专享)</span>
        </span>
        <span class="activityPageC">商家公告</span>
        <span class="activityPageD">{{singleStoreData.promotion_info}}</span>
      <i class="iconfont goBackShop" @click="isThis=false;isFour=true">&#xe618</i>
    </div>
  </section >
</template>

<script>
// 头部公共组件
export default {
  name: "Header",
  data(){
    return {
      isFirst:true,
      isThree:false,
      isFour:false,
      isShow:false,
      isHide:true,
      isFive:false,
      singleStoreData:'',
      http:'//elm.cangdu.org/img/',
      isThis:false,
    //  nowFoodDetailTitle:''

    }
  },
  computed: {
    // 储存当前城市名
    nowCity:{
      get () {
        return this.$store.state.ghc.currentCity.name
      },
      set () {}
      },
    // food 标题
    foodTitle: {
      get () {
       return this.$store.state.dome.foodTitle
      //   this.$store.state.dome.foodTitle;
      },
      set () {}
    },
    // 登录状态
    loggingStatus: {
      get () {
        return this.$store.state.dome.loggingStatus
      },
      set () {}
    },
    // msite头部
    domeRegion: {
      get () {
        return this.$store.state.dome.region
      },
      set () {}
    },
    // shop 头部
    shopHead:{
      get(){
        return this.$store.state.dome.singleStore
      },
      set(){
      }
    },
  },
  methods:{
    back(){
      this.$router.go(-1);
    },
    toFoodDetail(){
      console.log(11112345678)
      this.$router.push({name:'foodDetail'});
    }
  },
  // computed:{
  //   // 存储当前选中的食物数据
  //   nowFood(){
  //     // console.log("接收到的当前的单个食物信息",this.$store.state.dome.singleFood)
  //     return this.$store.state.dome.singleFood
  //   }
  // },
  watch: {
    $route(now, old) {     //监控路由变换，控制返回按钮的显示
      console.log('now', now)
      if (now.path === "/home") {
        this.nowCity = ''
        this.isFirst = true;
        this.isShow = false;
        this.isThree = false;
        this.isFour = false;
        this.isFive = false
      } else if (now.path === "/city") {
        console.log('this.$store.state.ghc.currentCity.name', this.$store.state.ghc.currentCity.name)

        this.nowCity = this.$store.state.ghc.currentCity.name
        this.isShow = true;
        this.isFirst = false;
        this.isThree = false;
        this.isFour = false;
        this.isFive = false
      } else if (now.path === "/msite") {
        this.isThree = true;
        this.isFirst = false;
        this.isShow = false;
        this.isFour = false;
        this.isFive = false
      } else if (now.path === "/shop/shopDetail") {
        this.isFour = true;
        this.isFirst = false;
        this.isShow = false;
        this.isThree = false;
        this.isFive = false
      } else if (now.path === "/food") {
        this.isFour = false;
        this.isFirst = false;
        this.isShow = false;
        this.isThree = false;
        this.isFive = true
      } else if (now.path === "/profile/mind") {
        this.$store.commit({type: 'goMsite', name: '我的'})
        // this.$store.state.dome.foodTitle = '我的'
        this.isFour = false;
        this.isFirst = false;
        this.isShow = false;
        this.isThree = false;
        this.isFive = true
      } else if (now.path === "/vipcard") {
        this.$store.commit({type: 'goMsite', name: '会员中心'})
        this.isFour = false;
        this.isFirst = false;
        this.isShow = false;
        this.isThree = false;
        this.isFive = true
      } else if (now.path === "/order") {
        this.$store.commit({type: 'goMsite', name: '订单列表'})
        this.isFour = false;
        this.isFirst = false;
        this.isShow = false;
        this.isThree = false;
        this.isFive = true
      } else if (now.path === "/service") {
        this.$store.commit({type: 'goMsite', name: '服务中心'})
        this.isFour = false;
        this.isFirst = false;
        this.isShow = false;
        this.isThree = false;
        this.isFive = true
      } else if (now.path === "/download") {
        this.$store.commit({type: 'goMsite', name: '下载'})
        this.isFour = false;
        this.isFirst = false;
        this.isShow = false;
        this.isThree = false;
        this.isFive = true
      } else if (now.path === "/foodDetail") {
        this.$store.commit({type: 'goMsite', name: '商家详情'})
        this.isFour = false;
        this.isFirst = false;
        this.isShow = false;
        this.isThree = false;
        this.isFive = true
      } else if (now.path === "/search") {
        this.$store.commit({type: 'goMsite', name: '搜索'})
        this.isFour = false;
        this.isFirst = false;
        this.isShow = false;
        this.isThree = false;
        this.isFive = true
      } else if (now.path === "/singleFoodDetail") {
        console.log('8888888888888888',this.$store.state.dome.singleFood.name)
       // this.foodTitle = this.$store.state.dome.singleFood.name
        this.isFour = false;
        this.isFirst = false;
        this.isShow = false;
        this.isThree = false;
        this.isFive = true
      }
    },
    shopHead: {
      handler() {
        console.log('接收到的值', this.singleStoreData)
        this.singleStoreData = this.$store.state.dome.singleStore
      },
      //是否在页面刷新时调用回调函数,默认值是false
      immediate: true,
      deep: true
    }
  }
}
</script>

<style scoped>
  .nv a{
    color: #fff;
    text-decoration: none;
  }
  .nv{
    padding: 0.12rem;
    color: white;
    width: 100%;
    height: 0.2rem;
  }
  .leftSmallImg{
    position: absolute;
    left:0;
    bottom:0.05rem;
  }
  .firstHead{
    width: 100%;
    background-color: #008de1;
    text-align: center;
  }
  .bottomContent{
    position: absolute;
    right:0;
    bottom:0.1rem;
  }
  .fourModule{
    width: 100%;
    height: 1.5rem;
    background:#BBBBBB;
    opacity:0.9;
    padding:0.1rem 0.2rem;
  }
  .toLeft{
    color:white;
    position: absolute;
    left:0;
  }
  .fourModuleImg{
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 0.1rem;
    margin-right: 0.1rem;
  }
  .introduce_name{
    font-size: 0.2rem;
    font-weight: bold;
  }
  .introduceC{
    font-size: 0.12rem;
  }
  .goFoodDetail{
    position: absolute;
    right:0.05rem;
    bottom:0.5rem;
    z-index: 5;
    margin-left: 0.1rem;
    height: 0.4rem;
    font-family: initial;
    font-weight: bold;
  }
  .leftSmall{
    width: 100%;
    padding-top: 0.1rem;
  }
  .leftSmallLP{
    background-color: red;
    padding: 0.02rem;
    border-radius: 0.04rem;
  }
  .dome-span {
    position: absolute;
    text-align: center;
    left: 0.7rem;
    width: 2.0rem;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用*/
  }
  .activityPage{
    width: 100%;
    height: 100%;
    background: black;
    position: absolute;
    z-index:100 ;
    top:0;
    left:0;
    color:white;
  }
  .goBackShop{
    font-size: 0.3rem;
    position: absolute;
    bottom: 0.1rem;
    left: 45%;
    border: 0.02rem solid #555;
    color: #555;
    border-radius: 50%;
    width: 0.5rem;
    height: 0.5rem;
    text-align: center;
  }
  .activityPageC{
    display: inline-block;
    font-size:0.12rem;
    border: 0.02rem solid #555;
    border-radius: 0.5rem;
    padding:0.05rem 0.1rem;
    margin:0.1rem 0 0.2rem 1.5rem;
  }
  .activityPageTitle{
    text-align: center;
    font-size: 0.25rem;
    margin: 0.2rem 0 0.4rem 0;
  }
  .activityPageD{
    display: inline-block;
    margin: 0 0 0.2rem 0.3rem;
  }
</style>
