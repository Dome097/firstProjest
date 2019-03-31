<template>
  <section class="container-fluid" >
    <!--第一个头部 初始界面-->
    <nav class="nv navbar navbar-fixed-top firstHead" v-if="isFirst">
      <router-link class="pull-left" :to="{}">ele.me</router-link>
      <div class="pull-right">
        <span><router-link :to="{name:'login'}">登录</router-link></span>
        <span>|</span>
        <span><router-link :to="{name:'login'}">注册</router-link></span>
      </div>
    </nav>
    <!--第二个头部 当前城市-->
    <nav class="nv navbar navbar-fixed-top firstHead"  v-show="isShow">
      <i class="pull-left iconfont" @click="back">&#xe682;</i>
      <router-link :to="{}" class="centerContent">郑州</router-link>
      <span class="pull-right" v-show="isHide" @click="back">切换城市</span>
    </nav>
    <!--第三个头部 当前区域-->
    <nav class="nv navbar navbar-fixed-top firstHead" v-if="isThree">
      <router-link class="glyphicon glyphicon-search pull-left" :to="{name:'search'}"></router-link>
      <router-link class="centerContent" :to="{}">千山区</router-link>
      <div class="pull-right">
        <span><router-link :to="{name:'login'}">登录</router-link></span>
        <span>|</span>
        <span><router-link :to="{name:'login'}">注册</router-link></span>
      </div>
    </nav>
    <!--第四个头部 商家界面-->
    <nav class="nv navbar navbar-fixed-top bg-warning fourModule" :style="{}" v-if="isFour">
      <i class="iconfont toLeft">&#xe682</i>
      <img src="../../assets/logo.png" alt="" class="pull-left" style="width: 0.8rem; height: 1rem">
      <div class="introduce">
        <p>效果演示</p>
        <p>
          <span>商家配送</span>
          <span>/</span>
          <span>分钟送达</span>
          <span>/</span>
          <span>配送费¥5</span>
        </p>
        <i class="iconfont pull-right goFoodDetail" @click="toFoodDetail">&#xe634</i>
        <p>公告:欢迎光临,用餐高峰请提前下单,谢谢</p>
        <span class="pull-left leftSmallImg">
          <img src="../../assets/logo.png" alt="" style="width: 0.3rem">
          <span>满30减5,满60减8 (APP专享) </span>
        </span>
        <i class="iconfont pull-right bottomContent">1个活动 &#xe634 </i>
      </div>
    </nav>
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
      isHide:true
    }
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
  watch:{
    $route(now,old){     //监控路由变换，控制返回按钮的显示
      if(now.path==="/home"){
        this.isFirst=true;
        this.isShow=false;
        this.isThree = false;
        this.isFour = false;
      } else if(now.path==="/city"){
        this.isShow = true;
        this.isFirst=false;
        this.isThree = false;
        this.isFour = false;
      }else if(now.path === "/msite"){
        this.isThree = true;
        this.isFirst=false;
        this.isShow=false;
        this.isFour = false;
      }else if(now.path === "/shop/shopDetail"){
        this.isFour = true;
        this.isFirst=false;
        this.isShow=false;
        this.isThree = false;
      }
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
    background-color: #008de1;
    text-align: center;
  }
  .bottomContent{
    position: absolute;
    right:0;
    bottom:0.1rem;
  }
  .introduce{
    margin-left:0.06rem;
  }
  .fourModule{
    height: 1.5rem;
    background:#BBBBBB;
    opacity:0.4
  }
  .toLeft{
    color:white;
    position: absolute;
    left:0.05rem;
  }
  .goFoodDetail{
    position: absolute;
    right:0.05rem;
    z-index: 5;
    margin-left: 0.2rem;
    height: 0.4rem;
    font-family: initial;
    font-weight: bold;
  }

</style>
