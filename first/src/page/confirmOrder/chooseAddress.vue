<template>
  <section class="container-fluid chooseAddres">
    <div class="addressLeft" @click="selectThis(item)" v-for="(item,key) in addressesInfo">
      <i class="iconfont" :class="{select:selectT}">&#xe663;</i>
      <div>
        <span>{{item.name}}</span>
        <span>{{item.sex===1?'先生':'女士'}}</span>
        <span>{{item.phone}}</span><br>
        <span :class="{colorRed:item.tag === '无'||'家',colorBlue:item.tag === '学校',colorGreen:item.tag === '公司'}">{{item.tag}}</span>
        <span>{{item.address}}</span>
      </div>
    </div>
    <div class="addNewAddress" @click="addNewAddress">
      <i class="iconfont">&#xe627;</i>
      <span>新增收货地址</span>
    </div>
  </section>
</template>

<script>
  import Vue from 'vue'
// 选择地址页
export default {
  name: "chooseAddress",
  data(){
    return{
      // 选择项的状态
      selectT:false,
      // 存储用户信息
      userInfomation:{},
      // 所有增加的地址信息
      addressesInfo:[],
    }
  },
  methods:{
    addNewAddress(){
      this.$router.push({name:'addAddress'})
    },
    selectThis(i){
      // 选定要使用的地址,并将地址信息传到vuex,同时切换路由
      this.$store.commit("selectAdrs",i);
      this.selectT = !this.selectT;
      this.$router.push({name:'confirmOrder'})
    }
  },
  created(){
    // 从vuex中取出新增的收货地址信息
    // this.newAds = this.$store.state.ghc.newAddres;
    // console.log(this.newAds);
    // 把每次新增的收货地址信息存到localStorage
    // if(this.storage.get("addresses")!= null){
    //   this.storage.get("addresses").push(this.newAds);
    //   console.log(1111111111111111)
    // }else{
    //   this.storage.set("addresses",[])
    //   console.log(2222222222)
    // }
    // 获取localstorage中存储的所有收货地址信息
    // this.addressesInfo = this.storage.get("addresses");
    // console.log(this.addressesInfo);


    // 从vuex中接受用户信息,获得用户id,geohash值
    this.userInfomation = this.$store.state.ghc.userInfo;
    console.log(this.userInfomation);

    //请求地址信息
    Vue.axios.get(`https://elm.cangdu.org/v1/users/${this.userInfomation.user_id}/addresses`).then(res=>{
      console.log(res.data);
      this.addressesInfo = res.data;
    }).catch(error=>{
      console.log(error)
    })
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
  }
}
</script>

<style scoped>
  .chooseAddres{
    width: 100%;
    height: 100%;
    padding: 0;
    background-color: white;
  }
  .addressLeft{
    display: inline-block;
    width: 100%;
    height: 1rem;
    border-bottom: 0.02rem solid #e4e4e4;
    float: left;
    padding: 0.2rem 0.16rem;
  }
  .addressLeft>i{
    display: inline-block;
    font-size: x-large;
    color: darkgray;
  }
  .addressLeft>div{
    display: inline-block;
  }
  .addressLeft>div>span{
    margin: 0.02rem 0.02rem;
  }
  .addressLeft>div>span:nth-child(1){
    font-size: 0.16rem;
    font-weight: bolder;
    color: #000;
  }
  .addressLeft>div>span:nth-child(2),.addressLeft>div>span:nth-child(3){
    color: #000;
  }
  .addressLeft>div>span:nth-child(5){
    width: 0.6rem;
    height: 0.2rem;
    background-color: limegreen;
    border-radius: 0.04rem;
    color: white;
    font-size: 0.12rem;
    text-align: center;
    line-height: 0.2rem;
  }
  .addressLeft>div>span:nth-child(6){
    color: darkgrey;
    font-size: 0.14rem;
  }
  .addNewAddress{
    width: 100%;
    height: 0.4rem;
    line-height: 0.4rem;
    text-align: center;
    position: fixed;
    left: 0;
    bottom: 0.2rem;
  }
.addNewAddress>i,span{
  display: inline-block;
  font-size: 0.16rem;
  color: #008de1;
  }
  .addNewAddress>i{
    font-size: 0.3rem;
  }
  .addressLeft>.select{
  color: limegreen;
}
  .chooseAddres>.addressLeft>div>.colorRed{
    background-color: red;
  }
  .chooseAddres>.addressLeft>div>.colorBlue{
    background-color: #008de1;
  }
  .chooseAddres>.addressLeft>div>.colorGreen{
    background-color: limegreen;
  }
</style>
