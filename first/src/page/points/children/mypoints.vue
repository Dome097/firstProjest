<template>
  <section class="mypoints">
    <div class="header">
      <div class="myPoints">
        <span>当前积分</span>
        <router-link :to="{name:'pointsDetail'}"><i class="el-icon-question
"></i>积分说明</router-link>
        <p><span>0</span>分</p>
        <el-row>
          <el-button type="danger">积分兑换商品</el-button>
        </el-row>
      </div>
    </div>
    <div class="content">
      <div class="defaultShow">
        <p>最近30天积分记录</p>
        <img src="../../../../src/images/no-log.png" alt="">
        <p>最近30天无积分记录</p>
        <p>快去下单赚取大量积分吧</p>
      </div>
    </div>
  </section>
</template>

<script>
    export default {
        name: "mypoints"
    }
</script>

<style scoped>
  .mypoints{
    width: 100%;
    height: 100%;
  }
  .header{
    width: 100%;
    height: 1.6rem;
    background-color: #008de1;
    padding: 0.1rem 0;
  }
  .myPoints{
    background-color: white;
    width: 3.6rem;
    height: 1.4rem;
    margin: 0 auto;
    border-radius: 0.04rem;
    text-align: center;
    clear: both;
  }
  .myPoints>span{
    float: left;
    margin: 0.1rem;
  }
  .myPoints>a{
    float: right;
    margin: 0.1rem;
    color: #008de1;
    text-decoration: none;
  }
  .myPoints>p{
    clear: both;
    float: left;
    margin-left: 0.1rem;
    font-size: 0.16rem;
  }
  .myPoints>p>span{
    font-size: 0.3rem;
  }
  .el-row{
    clear: both;
  }
  .el-row>button{
    width: 3.4rem;
  }
  .defaultShow{
    text-align: center;
    font-size: 0.16rem;
  }
  .defaultShow>p:nth-child(1){
    text-align: left;
    margin: 0.1rem;
    font-size: 0.14rem;
    color: #b2b2b2;
  }
  .defaultShow>p:nth-child(4){
    font-size: 0.12rem;
    color: #b2b2b2;
  }
</style>
