<template>
  <div v-if="isFoot" class="footD">
    <nav class="navbar navbar-default navbar-fixed-bottom">
      <div class="container-fluid nav_icons">
        <router-link :to="{name:'msite'}">
          <i class="iconfont" :class="{fonc:isChoose1}" @click="changeColor1">&#xe722;</i>
          <p>外卖</p>
        </router-link>
        <router-link :to="{name:'search'}">
          <i class="iconfont" :class="{fonc:isChoose2}"  @click="changeColor2">&#xe718;</i>
          <p>搜索</p>
      </router-link>
        <router-link :to="{name:'order'}">
          <i class="iconfont" :class="{fonc:isChoose3}" @click="changeColor3">&#xe75f;</i>
          <p>订单</p>
        </router-link>
        <router-link :to="{name:'profile'}">
          <i class="iconfont" :class="{fonc:isChoose4}" @click="changeColor4">&#xe60b;</i>
          <p>我的</p>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
// 底部公共组件
export default {
  name: "footGuide",
  data(){
    return{
      isChoose1:false,
      isChoose2:false,
      isChoose3:false,
      isChoose4:false,
      isFoot:false
    }
  },
  methods:{
    changeColor1(){
      this.isChoose1 = true;
      this.isChoose2 = false;
      this.isChoose3 = false;
      this.isChoose4 = false;
    },
    changeColor2(){
      this.isChoose1 = false;
      this.isChoose2 = true;
      this.isChoose3 = false;
      this.isChoose4 = false;
    },
    changeColor3(){
      this.isChoose1 = false;
      this.isChoose2 = false;
      this.isChoose3 = true;
      this.isChoose4 = false;
    },
    changeColor4(){
      this.isChoose1 = false;
      this.isChoose2 = false;
      this.isChoose3 = false;
      this.isChoose4 = true;
    }
  },
  watch: {
    $route(now, old) {     //监控路由变换，控制返回按钮的显示
      console.log('now', now)
      if (now.path === "/msite") {
        this.isFoot = true;
      }else if(now.path === "/search"){
        this.isFoot = true;
      }else if(now.path === "/order"){
        this.isFoot = true;
      }else if(now.path === "/profile"){
        this.isFoot = true;
      }
    }
  }
}
</script>

<style scoped>
  .fonc{
    color: #008de1 !important;

  }
  .nav_icons{
    display: flex;
    justify-content: space-between;
    background-color: white;
  }
  .nav_icons>a{
    text-align: center;
    /*line-height: 0.16px;*/
    display: inline-block;
    text-decoration: none;
    margin-top: 0.1rem;
  }
  .nav_icons>a>i{
    color: #000;
  }
  .nav_icons p{
    color: #000;
  }
  .footD {
    width: 100%;
    z-index: 100;
    position: absolute;
    bottom: 0;
    height: 0.36rem;
  }
</style>
