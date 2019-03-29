<template>
  <section class="container-fluid addAddress">
    <div class="infos">
      <el-input placeholder="请填写你的姓名"></el-input>
      <el-input placeholder="小区/写字楼/学校等" @click="searchAddress"></el-input>
      <el-input placeholder="请填写详细送餐地址"></el-input>
      <el-input placeholder="请填写能够联系到您的手机号"></el-input>
      <el-input placeholder="备用联系电话(选填)"></el-input>
    </div>
    <el-button class="btn">新增地址</el-button>

  </section>
</template>

<script>
// 新增地址
export default {
  name: "add",
  data(){
    return{

    }
  },
  methods:{
    searchAddress(){
      // 跳转到搜索地址
      this.$router.push({name:'addDetail',query:{}})
    }
  }
}
</script>

<style scoped>
  .addAddress{
    width: 100%;
    height: 100%;
    padding: 0;
  }
  .infos input{
    width: 90%;
    text-align: center;
    height: 0.4rem;
    margin: 0.1rem 0;
    border-radius: 0.04rem;
  }
  .btn{
    margin-top: 0.2rem;
    width: 90%;
    height: 0.4rem;
    color: #b2b2b2;
    background-color: limegreen;
    border-radius: 0.04rem;
  }
</style>
