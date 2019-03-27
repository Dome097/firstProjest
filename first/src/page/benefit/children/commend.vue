<template>
  <section>
    <div class="top">
      <img src="../../../images/activity.png" @click="goEleApp" alt="">
    </div>
    <div class="container">
      <div>
        <img src="../../../images/weixin.png" @click="goEleApp" alt="">
        <p>邀请微信好友</p>
      </div>
      <div>
        <img src="../../../images/qq.png" @click="goEleApp" alt="">
        <p>邀请QQ好友</p>
      </div>
      <div>
        <img src="../../../images/fenxiang.png" @click="goEleApp" alt="">
        <p>面对面邀请</p>
      </div>
    </div>
    <div class="bottom">
      <div>
        <p>累计收益</p>
        <span>0</span>
        <span>元</span>
      </div>
      <div>
        <p>成功邀请</p>
        <span>0</span>
        <span>人</span>
      </div>
    </div>
    <div class="end">
      <p>-收益明细-</p>
      <img src="../../../images/qianbao.png" class="qianbao" alt="">
      <p>还不赶紧去邀请好友</p>
    </div>
  </section>
</template>

<script>
import { MessageBox } from 'mint-ui';

  // 推荐有奖
export default {
  name: "commend",
  methods: {
    goEleApp () {
      MessageBox.alert('请在饿了么APP中打开')
    }
  }
}
</script>

<style scoped>
  .top>img{
    width:100%
  }
  .container {
    display: flex;
    text-align: center;
    margin-top: 0.1rem;
    padding-top: 0.2rem;
    background-color: white;
  }
  .container img{
    width:50%;
  }
  .bottom {
    display: flex;
    text-align: center;
  }
  .bottom>div {
    margin-top: 0.1rem;
    width: 50%;
  }
  .bottom>div:nth-child(1){
    border-right: #e4e4e4 solid 0.01rem;
  }
  .bottom span:nth-child(2) {
    font-size: 0.25rem;
    color: red;
  }
  .end {
    text-align: center;
  }
  .qianbao {
    width: 10%;
  }
</style>
