<template>
  <section class="container-fluid">
    <!--<div class="emptyEle"></div>-->
    <div class="download">
      <img src="../../assets/appLogo.jpg" alt="">
      <p>下载饿了么APP</p>
      <div class="btn btn-success btnColor">下载</div>
    </div>
  </section>

</template>

<script>
// 下载App
export default {
  name: "downLoad"
}
</script>

<style scoped>
  /*.emptyEle{*/
    /*width: 100%;*/
    /*height: 0.46rem;*/
  /*}*/
  .download{
    width: 100%;
    height: 100%;
    text-align: center;
  }
  .download>img{
    border-radius: 0.2rem;
  }
  .download>p{
    font-size: 0.16rem;
    margin-top: 0.1rem;
  }
  .btnColor{
    font-size: 0.16rem;
    width: 3.4rem;
    height: 0.4rem;
    background-color:limegreen;
  }
</style>
