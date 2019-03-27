<template>
  <section class="balance">
    <div class="header">
      <div class="myBalance">
        <span>当前余额</span>
        <router-link :to="{name:'BalanceDetail'}"><i class="el-icon-question
"></i>余额说明</router-link>
        <p><span>0.00</span>元</p>
        <el-row>
          <el-button type="info">提现</el-button>
        </el-row>
      </div>
    </div>
    <div class="content">
      <div class="defaultShow">
        <p>交易明细</p>
        <img src="../../../../src/images/no-log.png" alt="">
        <p>暂无明细记录</p>
      </div>
    </div>
  </section>
</template>

<script>
    export default {
        name: "mybalance"
    }
</script>

<style scoped>
  .balance{
    width: 100%;
    height: 100%;
  }
  .header{
    width: 100%;
    height: 1.6rem;
    background-color: #008de1;
    padding: 0.1rem 0;
  }
  .myBalance{
    background-color: white;
    width: 3.6rem;
    height: 1.4rem;
    margin: 0 auto;
    border-radius: 0.04rem;
    text-align: center;
    clear: both;
  }
  .myBalance>span{
    float: left;
    margin: 0.1rem;
  }
  .myBalance>a{
    float: right;
    margin: 0.1rem;
    color: #008de1;
    text-decoration: none;
  }
  .myBalance>p{
    clear: both;
    float: left;
    margin-left: 0.1rem;
    font-size: 0.16rem;
  }
  .myBalance>p>span{
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
  }
</style>
