<template>
  <section class="container-fluid">
    <div class="searchAddress">
      <div class="input-group input-group-lg inValue">
        <input type="text" class="form-control" placeholder="输入学校、商务楼、地址" aria-describedby="sizing-addon1" v-model="inputValue">
      </div>
      <div class="btn-group btn-group-lg btns" @click="searchCity(inputValue)">提交</div>
    </div>
    <div class="adds" v-for="item in addrList">
      <p>{{item.name}}</p>
      <p>{{item.address}}</p>
    </div>
  </section>
</template>
<script>
// 当前城市页
import Vue from 'vue'
export default {
  name: "city",
  data(){
    return{
      inputValue:'',
      addrList:[]
    }
  },
  methods:{
    searchCity(i){
      // 点击提交按钮时,传入用户输入的参数,发起请求
      this.inputValue = i
      Vue.axios.get(`https://elm.cangdu.org/v1/pois?city_id=${this.$store.state.ghc.currentCity.id}&keyword=${i}&type=search`,null).then(res => {
        console.log(res.data)
        this.addrList = res.data
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
  section{
    width: 100%;
    height: 100%;
    padding: 0;
    background-color: #f7f7f7;
  }
  .searchAddress{
    width: 100%;
    /*height: 100%;*/
    padding: 0.16rem 0;
    margin-top:  0.16rem;
    border-top: 0.01rem solid #e4e4e4;
    border-bottom: 0.01rem solid #e4e4e4;
    background-color: white;
  }
  .inValue>input{
    width: 3.2rem;
    height: 0.4rem;
    border-radius: 0.03rem !important;
    margin-bottom:  0.1rem;
    border: 0.01rem solid #e4e4e4 !important;
    box-shadow: none !important;
    font-size: 0.14rem;

  }
  .inValue{
    margin: 0 0.25rem;
  }
  .btns{
    background-color: #008de1;
    width: 3.2rem;
    color: #fff;
    height: 0.4rem;
    line-height: 0.4rem;
    margin: 0 0.25rem;
    text-align: center;
    border-radius: 0.03rem;
    font-size: 0.14rem;
  }
  .adds{
    height: 0.8rem;
    border-bottom: 0.01rem solid #e4e4e4;
    background-color: white;
    padding: 0.16rem 0.25rem;
  }
  .adds>p{
    font-size: 0.14rem;
  }
  .adds>p+p{
    color: #A2A2A2;
    font-size: 0.12rem;
  }
</style>
