<template>
  <div id="elmloading">
    <div class="imgbox">
      <div class="img"></div>
    </div>
    <div class="loadfoot">
      <span class="footspan"></span>
    </div>
  </div>
</template>

<script>
// 页面初始化加载数据的动画组件
export default {
  name: "loading"
}
</script>

<style scoped>
  #elmloading{
    width: 0.50rem;
    height:1.30rem;
    position:fixed;
    top: 50%;
    left: 50%;
    margin-top: -0.65rem;
    margin-left: -.25rem;
    z-index:100000;
  }
  .imgbox{
    width: .50rem;
    height: .50rem;
    animation: myfirst 0.8s infinite;
  }
  .img{
    height: 100%;
    width: 100%;
    background: url('../../images/icon_loading.png')  no-repeat;
    background-size:100%;
    animation: myf 5.6s infinite;
  }
  .loadfoot{
    height: .20rem;
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
  }
  .footspan{
    display: inline-block;
    height: .10rem;
    width: .20rem;
    margin: .05rem 0;
    border-radius: 50%;
    animation: foot 0.8s infinite;
    background: radial-gradient(#7E7E7E, #EDEDED);
  }

  @keyframes myfirst
  {
    0% {margin-top:0;}
    50% {margin-top:.50rem;}
    100% {margin-top:0;}
  }
  @keyframes myf
  {
    0% {background-position:0% 0%;}
    14.2% {background-position:0% 0%;}
    14.2001% {background-position:0% 16%;}
    28.4% {background-position:0% 16%;}
    28.4001% {background-position:0% 33%;}
    42.6% {background-position:0% 33%;}
    42.6001% {background-position:0% 50%;}
    56.8% {background-position:0% 50%;}
    56.8001% {background-position:0% 67%;}
    71% {background-position:0% 67%;}
    71.0001% {background-position:0% 84%;}
    85.2% {background-position:0% 84%;}
    85.2001% {background-position:0% 100%;}
    100% {background-position:0% 100%;}
  }

  @keyframes foot
  {
    0% {width:.20rem;}
    50% {width:100%;}
    100% {width:.20rem;}
  }
</style>
