<template>
  <section class="container-fluid confirmOrder">
    <div class="deliveryAddres">
      <router-link :to="{name:'chooseAddress'}">
        <div class="addressLeft">
          <i class="iconfont">&#xe636;</i>
          <div>
            <span>{{selectAds.name}}</span>
            <span>{{selectAds.sex}}</span>
            <span>{{selectAds.phone}}</span><br>
            <span>{{selectAds.tag_type}}</span>
            <span>{{selectAds.address}}</span>
          </div>
        </div>
        <div class="addressRight">
          <i class="iconfont">&#xe634;</i>
        </div>
      </router-link>
    </div>
    <div class="arriveTime">
      <p>送达时间</p>
      <div>
        <span>尽快送达</span>
        <span>|</span>
        <span>预计21:10</span>
        <p>蜂鸟专送</p>
      </div>
    </div>
    <div class="payStyle">
      <router-link :to="{}" @click.native="payStyle">
        <span>支付方式</span>
        <span>{{'在线支付'}} <i class="iconfont">&#xe634;</i> </span>
      </router-link>
      <div><span>红包</span><span>暂时只在饿了么APP中支持</span></div>
    </div>
    <div class="orderInfo"  v-for="(item,key) in cartGoods">
      <div>
        <img src="../../assets/logo.png"/>
        <span>{{'效果展示'}}</span>
      </div>
      <ul>
        <el-row :gutter="10" >
          <el-col :xs="16"><div class="grid-content bg-purple">{{item.entities.name}}</div></el-col>
          <el-col :xs="4"><div class="grid-content bg-purple-light special">x{{item.quantity}}</div></el-col>
          <el-col :xs="4"><div class="grid-content bg-purple-light">¥ {{item.entities.price}}</div></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="12"><div class="grid-content bg-purple">餐盒</div></el-col>
          <el-col :xs="12"><div class="grid-content bg-purple-light">¥ {{item.entities.packing_fee*item.quantity}}</div></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="12"><div class="grid-content bg-purple">配送费</div></el-col>
          <el-col :xs="12"><div class="grid-content bg-purple-light">¥ {{item.entities.packing_fee*item.quantity}}</div></el-col>
        </el-row>
      </ul>
      <div class="pay">
        <el-row :gutter="10">
          <el-col :xs="12"><div class="grid-content bg-purple">订单  ¥ {{item.quantity*item.entities.price+item.entities.packing_fee*item.quantity*2}}</div></el-col>
          <el-col :xs="12"><div class="grid-content bg-purple-light special">待支付</div></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24"><div class="grid-content bg-purple-light special">¥ {{item.quantity*item.entities.price+item.entities.packing_fee*item.quantity*2}}</div></el-col>
        </el-row>
      </div>
    </div>
    <div class="remarks">
      <router-link :to="{name:'remark'}">
        <span>订单备注</span>
        <span>{{'口味偏好等'}}<i class="iconfont">&#xe634;</i> </span>
      </router-link>
      <router-link :to="{name:'invoice'}">
        <span>发票抬头</span>
        <span>{{'不需要开发票'}}<i class="iconfont">&#xe634;</i></span>
      </router-link>
    </div>
    <div class="foot">
      <span>待支付 ¥{{totalPrices}} </span>
      <button @click="confirm">确认下单</button>
    </div>
    <!--上拉actionSheet-->
    <mt-actionsheet :actions="actions" cancelText ='' closeOnClickModal=true v-model="sheetVisible" class="actionSheet">
    </mt-actionsheet>
  </section>
</template>

<script>
  import Vue from 'vue'
  import { Actionsheet } from 'mint-ui';
  Vue.component(Actionsheet.name, Actionsheet);
// 确认订单页
export default {
  name: "confirmOrder",
  data(){
    return{
      // 声明变量存储已选地址
      selectAds:{},
      // 获取购物车数据
      cartGoods:[],
      // 获取购物车商品总价
      totalPrices: '',
      // 上拉actionSheet显示或隐藏
      sheetVisible:false,
      //上拉actionSheet显示的内容
      actions:[
        {
        name:'支付方式',
      },
        {
          name:'货到付款(商家不支持货到付款)',
        },
        {
          name:'在线支付',
        }
      ]
      }
    },

  methods:{
    // 选择支付方式
    payStyle(){
      this.sheetVisible = true
    },
    confirm(){
      // 路由切换到支付页
      this.$router.push({name:'payment'})
    }
  },
  created(){
// 获取购物车数据
    this.cartGoods = this.$store.state.dome.cartSingleFood;
    console.log(this.cartGoods);
    // 获取总价和总数
    this.totalPrices = 0;
    for (let prices of this.cartGoods) {
      this.totalPrices += prices.entities.price * prices.quantity
    }
  },
  mounted(){
    // 获取选定的地址
    this.selectAds = this.$store.state.ghc.useThisAds;
  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
      // 该页面不显示footer
      vm.$store.state.ghc.showOrHidden = false
    })
  },
  beforeRouteLeave(to,from,next){
    next(
      // 离开该页面时显示footer
      this.$store.state.ghc.showOrHidden = true
    )
  },
}
</script>

<style scoped>
.confirmOrder{
  width: 100%;
  /*height: 100%;*/
  padding: 0;
  background-color: whitesmoke;
  list-style: none;
}
.confirmOrder>div{
  padding: 0 0.16rem;
  width: 100%;
}
  .deliveryAddres{
    display: inline-block;
    width: 100%;
    height: 1rem;
    border-bottom: 0.02rem dashed orange;
    padding: 0 0.1rem;
  }
.deliveryAddres>a{
  text-decoration: none;
  color: #000;
}
  .addressLeft{
    float: left;
    padding: 0.2rem 0;
  }
.addressLeft>i{
  display: inline-block;
  color: #008de1;
  font-size: x-large;
}
.addressLeft>div{
  display: inline-block;
}
.addressLeft>div>span{
  margin: 0 0.02rem;
}
.addressLeft>div>span:nth-child(1){
  font-size: 0.16rem;
  font-weight: bolder;
}
.addressLeft>div>span:nth-child(5){
  width: 0.6rem;
  height: 0.2rem;
  background-color: limegreen;
  border-radius: 0.04rem;
  color: white;
  font-size: 0.12rem;
}
.addressLeft>div>span:nth-child(6){
  color: darkgrey;
  font-size: 0.14rem;
}
  .addressRight{
    float: right;
    line-height: 1rem;
  }
  .arriveTime{
    margin-top: 0.04rem;
    height: 0.8rem;
    background-color: white;
    border-left: 0.06rem solid #008de1;
    display: inline-block;
  }
.arriveTime>p{
  display: inline-block;
  float: left;
  line-height: 0.8rem;
  font-size: 0.16rem;
  font-weight: bolder;
}
.arriveTime>div{
  display: inline-block;
  float: right;
  position: relative;
  padding: 0.14rem 0;
}
.arriveTime>div>span{
  font-size: 0.14rem;
  color: #008de1;
  margin: 0 0.02rem;
}
.arriveTime>div>p{
  font-size: 0.12rem;
  color: #fff;
  background-color: #008de1;
  border-radius: 0.04rem;
  width: 0.6rem;
  text-align: center;
  margin-bottom: 0;
  position: absolute;
  right: 0;
  top: 0.4rem;
}
  .payStyle{
    margin-top: 0.04rem;
    height: 0.8rem;
    background-color: white;
  }
.payStyle>a{
  height: 0.4rem;
  line-height: 0.4rem;
  text-decoration: none;
  display: inline-block;
  width: 100%;
  border-bottom: 0.01rem solid #e4e4e4;
}
.payStyle>a>span{
  color: grey;
  font-size: 0.14rem;
  float: left;
}
.payStyle>a>span+span{
  color: lightgray;
  font-size: 0.12rem;
  float: right;
}
.payStyle>div{
  height: 0.3rem;
  line-height: 0.3rem;
  width: 100%;
  display: inline-block;
}
.payStyle>div>span{
  color: lightgray;
  font-size: 0.12rem;
  float: left;
}
.payStyle>div>span+span{
  float: right;
}
.confirmOrder>.orderInfo{
  margin-top: 0.1rem;
  background-color: white;
  padding: 0;
}
.orderInfo>div:nth-child(1){
  padding: 0 0.16rem;
  height: 0.6rem;
  line-height: 0.6rem;
  text-decoration: none;
  display: inline-block;
  width: 100%;
  border-bottom: 0.01rem solid #e4e4e4;
}
.orderInfo>div:nth-child(1)>img{
  width: 0.2rem;
  height: 0.2rem;
  background-color: #008de1;
}
.orderInfo>div:nth-child(1)>span{
  font-size: 0.16rem;
  padding: 0 0.1rem;
}
.orderInfo>ul{
  padding: 0 0.16rem;
  border-bottom: 0.01rem solid #e4e4e4;
}
.orderInfo>div:nth-child(3){
  padding: 0 0.16rem;
  border-bottom: 0.01rem solid #e4e4e4;
}
.orderInfo>.pay{
  padding: 0 0.16rem;
}
.bg-purple {
  text-align: left;
}
.bg-purple-light {
  text-align: right;
}
.grid-content {
  min-height: 0.4rem;
  margin: 0.02rem 0;
  line-height: 0.4rem;
  color: grey;
}
  .special{
    color: orangered;
  }
  .pay{
    border-bottom:none;
  }
.remarks{
  margin-top: 0.1rem;
  height: 0.9rem;
  background-color: white;
  margin-bottom: 0.7rem;
}
.remarks>a{
  height: 0.4rem;
  line-height: 0.4rem;
  text-decoration: none;
  display: inline-block;
  width: 100%;
  border-bottom: 0.01rem solid #e4e4e4;
}
.remarks>a>span{
  color: grey;
  font-size: 0.14rem;
  float: left;
}
.remarks>a>span+span{
  float: right;
  color: lightgray;
}
.remarks>a:last-child{
  border-bottom: none;
}
.confirmOrder>.foot{
    padding: 0;
    width:100%;
    height: 0.5rem;
    background-color: #000;
    line-height: 0.5rem;
    color: #fff;
    font-size: 0.16rem;
    position: fixed;
    left: 0;
    bottom: 0;
  }
.confirmOrder>.foot>span{
  padding: 0 0.16rem;
}
.confirmOrder>.foot>button{
  display: inline-block;
  float: right;
  background-color: limegreen;
  outline-style: none;
  border: none;
  width: 1rem;
}
.mint-actionsheet{
  width: 100%;
  padding: 0;
  height: 2rem;
  background-color: white;
}

</style>
