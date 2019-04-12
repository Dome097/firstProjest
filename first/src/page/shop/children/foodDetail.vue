<template>
  <!--商家详情整个页面-->
  <div class="foodDetailWrap">
    <!--活动与属性页面-->
    <div class="foodDetailHead">
      <p>活动与属性</p>
      <ul class="activity">
        <li v-if="nowStoreDetail.activities[0]">
          <span>
            <span class="spanAF">{{nowStoreDetail.activities[0].icon_name}}</span>
            <span class="spanAF_C">{{nowStoreDetail.activities[0].description}}(APP专享) </span>
          </span>
        </li>
        <li v-if="nowStoreDetail.supports[0]">
          <span class="spanAS">{{nowStoreDetail.supports[0].icon_name}}</span>
          <span>{{nowStoreDetail.supports[0].description}}</span>
        </li>
        <li v-if="nowStoreDetail.supports[1]">
          <span class="spanAT">{{nowStoreDetail.supports[1].icon_name}}</span>
          <span>{{nowStoreDetail.supports[1].description}}</span>
        </li>
        <li v-if="nowStoreDetail.supports[2]">
          <span class="spanAL">{{nowStoreDetail.supports[2].icon_name}}</span>
          <span>{{nowStoreDetail.supports[2].description}}</span>
        </li>
      </ul>
    </div>
    <!--食品监督安全公示页面-->
    <div class="foodDetailSafe">
      <p class="foodDetailSafeF">
        <span class="safePage">食品监督安全公示</span>
        <span @click="toShopSafe" class="goSafePage"><i class="iconfont pull-right ">企业认证详情 &#xe634 </i></span>
      </p>
      <div class="smile">
        <canvas id="Canvas" width="50" height="50"></canvas>
        <div class="safeContent">
          <span>监督检查结果:</span>
          <span :class="{poor:nowStoreDetail.status===0,good:nowStoreDetail.status!==0}">{{nowStoreDetail.status===0?"差":"良好"}}</span>
          <p>检查日期</p>
        </div>
      </div>
    </div>
    <!--商家信息部分-->
    <div class="businessInfo">
      <p>商家信息</p>
      <ul>
        <li>{{nowStoreDetail.name}}</li>
        <li>地址:{{nowStoreDetail.address}}</li>
        <li>营业时间:[{{nowStoreDetail.opening_hours[0]}}]</li>
        <li @click="isShowImg=true">
          <span>营业执照</span>
          <i class="iconfont pull-right" >&#xe634 </i>
        </li>
        <li @click="isShowImg=true">
          <span>餐饮服务许可证</span>
          <i class="iconfont pull-right"> &#xe634 </i>
        </li>
      </ul>
      <transition name="mm">
        <div v-if="isShowImg" class="showImg" @click="isShowImg=false">
          <img src="//elm.cangdu.org/img/167543e718022786.jpeg" alt="">
        </div>
      </transition>
    </div>

  </div>
</template>

<script>
// 商铺信息页
export default {
  name: "foodDetail",
  data(){
    return{
      // 当前选中的商家
      nowStoreDetail:'',
      http:'//elm.cangdu.org/img/',
      isShowImg:false
    }
  },
  computed:{
    // 存储当前选中的食商家数据
    nowStore(){
      return this.$store.state.dome.singleStore
    }
  },
  watch:{
    nowStore:{
      handler() {
        console.log("商家详情页面数据",this.$store.state.dome.singleStore)
        this.nowStoreDetail = this.$store.state.dome.singleStore
      },
      immediate:true,
      deep:true
    }
  },
  mounted(){
    var canvas = document.getElementById("Canvas");
    console.log("canvas",canvas)
    if (!canvas) return;
    var content = canvas.getContext("2d");
    if(this.nowStoreDetail.status===0){
      content.fillStyle = "red"
      content.beginPath();
      content.arc(25,25,25,0,2*Math.PI,false)
      content.closePath();
      content.fill();

      content.strokeStyle = "white";
      content.lineWidth = 2;
      content.beginPath();
      content.arc(13,15,5,0.15*Math.PI,0.85*Math.PI,false)
      content.stroke();

      content.strokeStyle = "white";
      content.lineWidth = 2;
      content.beginPath();
      content.arc(37,15,5,0.15*Math.PI,0.85*Math.PI,false)
      content.stroke();

      content.strokeStyle = "white";
      content.lineWidth = 2;
      content.beginPath();
      content.arc(25,45,10,1.15*Math.PI,1.85*Math.PI,false)
      content.stroke();
    }else{
      content.fillStyle = "green"
      content.beginPath();
      content.arc(25,25,25,0,2*Math.PI,false)
      content.closePath();
      content.fill();

      content.strokeStyle = "white";
      content.lineWidth = 2;
      content.beginPath();
      content.arc(13,20,5,1*Math.PI,2*Math.PI,false)
      content.stroke();

      content.strokeStyle = "white";
      content.lineWidth = 2;
      content.beginPath();
      content.arc(37,20,5,1*Math.PI,2*Math.PI,false)
      content.stroke();

      content.strokeStyle = "white";
      content.lineWidth = 2;
      content.beginPath();
      content.arc(25,30,10,0.15*Math.PI,0.85*Math.PI,false)
      content.stroke();
    }
  },
  methods:{
    toShopSafe(){
      this.$router.push({name:'shopSafe'})
    }
  }
}
</script>

<style scoped>
  /*商家详情整个页面*/
  .foodDetailWrap{
    width: 100%;
    margin-top: 0.2rem;
  }
  /*活动与属性页面*/
  .foodDetailHead{
    background-color: white;
    height: 2rem;
    width: 100%;
    padding: 0.15rem;
  }
  .foodDetailHead>p{
    border-bottom:0.01rem solid #E3E3E3;
    font-size: 0.24rem;
    height: 0.4rem;
  }
  .activity{
    padding-top: 0.1rem;
  }
  .activity>li{
    padding-bottom: 0.1rem;
  }
  .activity>li>span+span{
    color:gray;
  }
  .activity>li{
    margin-bottom: 0.08rem;
  }
  .spanAF{
    color:white;
    background-color: red;
    padding: 0.02rem;
    border-radius: 10%;
    margin-right: 0.1rem;
  }
  .spanAF_C{
    color:gray;
  }
  .spanAS,.spanAL{
    color:white;
    background-color: gray;
    padding: 0.02rem;
    border-radius: 10%;
    margin-right: 0.1rem;
  }
  .spanAT{
    color:white;
    background-color: blue;
    padding: 0.02rem;
    border-radius: 10%;
    margin-right: 0.1rem;
  }
  .poor{
    color:red;
  }
  .good{
    color:green;
  }
  /*食品监督安全公示页面*/
  .foodDetailSafe{
    background-color: white;
    margin-top: 0.1rem;
    height: 1.5rem;
    width: 100%;
    padding: 0.15rem;
  }
  .foodDetailSafeF{
    border-bottom:0.01rem solid #E3E3E3;
    height: 0.4rem;
  }
  .safePage{
    font-size:0.2rem;
  }
  .goSafePage{
    font-size:0.18rem;
    color: lightgray;
    width: 50%;
    height:0.4rem;
  }
  /*商家信息部分*/
  .businessInfo{
    background-color: white;
    margin-top: 0.1rem;
    height: 3rem;
    width: 100%;
    padding: 0.15rem;
  }
  .businessInfo>p{
    border-bottom:0.01rem solid #E3E3E3;
    font-size: 0.24rem;
    height: 0.4rem;
  }
  .businessInfo>ul>li{
    margin-bottom: 0.08rem;
    height: 0.4rem;
    line-height: 0.4rem;
  }
  .businessInfo>ul>li+li{
    border-top:0.01rem solid #E3E3E3;
  }
  .safeContent{
    margin-left: 0.7rem;
    margin-top: -0.5rem;
  }
  .showImg{
    width: 100%;
    height: 150%;
    background-color: rgba(102,102,102,0.7);
    z-index: 1050;
    position:fixed;
    top:0;
    left:0
  }
  .showImg>img{
    width: 100%;
    margin-top: 35%;
  }
  .mm-enter-active,.mm-leave-active{
    transition: opacity 0.5s;
  }
  .mm-enter, .mm-leave-to {
    opacity: 0;
  }
  .smile{
    height: 1.1rem ;
    padding-top: 0.1rem;
  }
</style>
