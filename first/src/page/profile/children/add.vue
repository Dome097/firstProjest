<template>
  <section class="container-fluid addAddress">
    <div class="infos">
      <input type="text" placeholder="请填写你的姓名" v-model="yourName">
      <input type="text" placeholder="小区/写字楼/学校等" @click="searchAddress" v-model="yourAddres">
      <input type="text" placeholder="请填写详细送餐地址" v-model="yourDetailAddres">
      <input type="text" placeholder="请填写能够联系到您的手机号" v-model="yourNumber">
      <input type="text" placeholder="备用联系电话(选填)" v-model="phone_bk">
    </div>
    <button class="btn" @click="addNew">新增地址</button>

  </section>
</template>

<script>
// 新增地址
export default {
  name: "add",
  data(){
    return{
      // 用户信息
      userInfomation:{},
      // 声明变量存储所填name
      yourName:'',
      // 声明变量存储所填电话
      yourNumber:'',
      // 备用电话
      phone_bk:'',
      // 声明变量存储所选地址
      yourAddres:'',
      // 声明变量存储所填详细地址
      yourDetailAddres:'',
      // 声明变量存储所填标签
      yourTag:'',
      // 经纬度信息
      geohash:'',
      // 声明对象存储所有信息
      newAddres:[]
    }
  },
  methods:{
    searchAddress(){
      // 跳转到搜索地址
      this.$router.push({name:'addDetail'})
    },
    addNew(){
// 有空内容,提示用户
      if(this.yourNumber === ''|| this.yourName === ''||this.yourDetailAddres === ''){
        alert('请输入完整信息');
        return
      }
      //发起网络请求,把信息添加到服务器地址
      this.$http({
        method:'post',
        url:`https://elm.cangdu.org/v1/users/${this.userInfomation.user_id}/addresses`,
        withCredentials:true,
        data:{
          address: this.yourAddres,
          address_detail: this.yourDetailAddres,
          geohash: this.geohash,
          name: this.yourName,
          phone: this.yourNumber,
          tag: '无',
          sex: 1,
          poi_type:0,
          phone_bk:this.phone_bk,
          tag_type:2
        }
      }).then(res => {
        // 路由切换到myAddress页面
        this.$router.push({name:'myaddress'});
        console.log('添加地址成功',res.data)
      }).catch((error) => {
        console.log(error);
      });
    }
  },
  mounted(){
    // 从vuex中接受用户信息,获得用户id,geohash值
    this.userInfomation = this.$store.state.ghc.userInfo;
    this.geohash = this.$store.state.ghc.localInfo.geohash;
    console.log(this.userInfomation,this.geohash);
    //获取选取的收货地址
    console.log(this.$route.query.detailAdd);
    this.yourAddres = this.$route.query.detailAdd?this.$route.query.detailAdd.name:null;
    this.yourDetailAddres = this.$route.query.detailAdd?this.$route.query.detailAdd.address:null;

  }
}
</script>

<style scoped>
  .addAddress{
    width: 100%;
    height: 100%;
    padding: 0;
    background-color: #f5f5f5;
  }
  .infos{
    width: 100%;
    padding: 0.1rem;
    background-color: white;
    text-align: center;
  }
  .infos>input{
    outline-style: none;
    color: gray;
    width: 98%;
    height: 0.36rem;
    margin: 0.06rem 0;
    padding: 0 0.1rem;
    border: 0.01rem solid #e4e4e4;
    border-radius: 0.04rem;
    background-color: whitesmoke;
  }
  .btn{
    margin:0.2rem 5%;
    width: 90%;
    height: 0.4rem;
    color: lightgrey;
    background-color: limegreen;
    border-radius: 0.04rem;
    text-align: center;
  }
</style>
