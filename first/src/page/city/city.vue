<template>
  <section class="container-fluid city">
    <div class="searchAddress">
      <div class="input-group input-group-lg inValue">
        <input type="text" class="form-control" placeholder="输入学校、商务楼、地址" aria-describedby="sizing-addon1" v-model="inputValue">
      </div>
      <div class="btn-group btn-group-lg btns" @click="searchCity(inputValue)">提交</div>
    </div>
    <div class="adds" v-for="item in addrList" @click="selectShop(item )">
      <p>{{item.name}}</p>
      <p>{{item.address}}</p>
    </div>
    <p class="listTitle" v-if="historyTitle">搜索历史</p>
    <div class="searchHistory" v-for="item in historyList" v-if="history" @click="research(item)">
      <p>{{item.name}}</p>
      <p>{{item.address}}</p>
    </div>
    <p @click="clearAll" v-if="history" class="clear">清空所有</p>
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
      // 搜索历史标题
      historyTitle : true,
      // 历史记录显隐
      history:true,
      // 存储历史记录信息
      historyInfo:[],
      // 接收vuex中的商家历史记录
      historyList:this.$store.state.ghc.historyRecord,
      // 存储搜索信息
      addrList:[]
    }
  },
  methods:{
    searchCity(i){
      // 点击提交按钮时,传入用户输入的参数,发起请求
      this.inputValue = i;
      Vue.axios.get(`https://elm.cangdu.org/v1/pois?city_id=${this.$store.state.ghc.currentCity.id}&keyword=${i}&type=search`,null).then(res => {
        console.log(res.data);
        this.addrList = res.data;
        //请求到数据后将历史记录隐藏
        this.history = false;
        this.historyTitle = false
      }).catch((error) => {
        console.log(error)
      })
    },
    // 点击选定商家,同时把信息存入历史记录
    selectShop(i){
      this.historyInfo.push(i);
      console.log(i);
      console.log('historyRecord本次',i)
      this.$store.commit({type:'getRegion', region:i})
      this.$router.push({name:'msite'});
      // 把数据传到store
      this.$store.commit('HISTORYRECORD',i)
    },
    // 在历史记录中点击重新搜索
    research(i){
      console.log('historyRecord历史',i)
      this.$store.commit({type:'getRegion', region:i})
      this.$router.push({name:'msite'});
    },
    // 清空历史记录(view层和数据都要消除)
    clearAll(){
      this.history = false;
      this.$store.state.ghc.historyRecord = []
    }
  },
  // 路由进入前加载历史记录
  beforeRouteEnter(to,from,next){
    next(vm=>{
      vm.history = true
    })
  }
 }
</script>

<style scoped>
  .city{
    width: 100%;
    height: 100%;
    padding: 0;
    background-color: #f7f7f7;
  }
  .city>p{
    width: 100%;
    background-color: #f5f5f5;
    border-top: 0.01rem solid #e4e4e4;
    border-bottom: 0.01rem solid #e4e4e4;
    font-size: 0.12rem;
    padding-left: 0.1rem;
    margin-bottom: 0;
  }
 .city>.clear{
    width: 100%;
    background-color: white;
    font-size: 0.14rem;
    height: 0.4rem;
    line-height: 0.4rem;
    text-align: center;
    border: none;
    padding: 0;
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
  .searchHistory{
    height: 0.8rem;
    border-bottom: 0.01rem solid #e4e4e4;
    background-color: white;
    padding: 0.2rem 0.2rem;
  }
  .searchHistory>p{
    font-size: 0.14rem;
    margin-bottom:0;
  }
  .adds>p+p{
    color: #A2A2A2;
    font-size: 0.12rem;
  }
  .searchHistory>p+p{
    color: #A2A2A2;
    font-size: 0.12rem;
  }
</style>
