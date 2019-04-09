<template>
  <section class="container-fluid addDetail">
    <div class="searchArea">
      <input type="text" v-model="input"  placeholder="请输入小区/写字楼/学校等">
      <button type="primary" @click="searchAdds(input)">确认</button>
    </div>
    <div class="content">
      <p>为了满足商家的送餐要求,建议您从列表中选取地址</p>
      <div class="addrsList" v-for="(item,index) of listArr" @click="selectAddres(item)">
        <p>{{item.name}}</p>
        <p>{{item.address}}</p>
      </div>
    </div>
    <div class="noAnswer" v-if="noAnswer">
      <p>找不到地址?</p>
      <p>请尝试输入小区,写字楼或学校名</p>
      <p>详细地址(如门牌号)可稍后输入哦.</p>
    </div>
  </section>
</template>

<script>
  import Vue from 'vue'
// 搜索地址
export default {
  name: "addDetail",
  data(){
    return{
      input:'',
      // 设置布尔值控制搜索地址时的信息显隐
      noAnswer:true,
      // 声明数组存储请求到的信息
      listArr:[],
      // 获取选定城市的信息
      curCity:{}
    }
  },
  methods:{
    searchAdds(i){
      //懒加载
      this.$store.commit({
        type:'amendDataLoad'
      });
      Vue.axios.get(`https://elm.cangdu.org/v1/pois?city_id=${this.curCity.id}&keyword=${i}&type=search`,null).then((res)=>{
        //懒加载
        this.$store.commit({
          type:'amendDataLoad'
        });
        console.log(res.data);
        // 请求成功隐藏提示
        this.noAnswer = false;
        this.listArr = res.data
      }).catch((error)=>{
        console.log(error)
      })
    },
    selectAddres(i){
      this.$router.push({name:'add',query:{detailAdd:i}})
    }
  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
      vm.curCity = vm.$store.state.ghc.currentCity
    })
  }
}
</script>

<style scoped>
  .addDetail{
    width: 100%;
    height: 100%;
    padding: 0;
  }
  .searchArea{
    display: inline-block;
    width: 100%;
    height: 0.6rem;
    line-height: 0.6rem;
    background-color: white;
    padding: 0 0.1rem;
  }
  .searchArea>input{
    background-color: whitesmoke;
    color: gray;
    height: 0.4rem;
    margin-top: 0.1rem;
    border: 0.01rem solid #e4e4e4;
    border-radius: 0.04rem;
    width: 76%;
    float: left;
    padding: 0 0.1rem;
    outline-style: none;
  }
  .searchArea>button{
    width: 22%;
    float: right;
    margin-top: 0.1rem;
    height: 0.4rem;
    outline-style: none;
    line-height: 0.4rem;
    color: #fff;
    background-color: #008de1;
    border-radius: 0.04rem;
    border: none;
  }
  .content{
    width: 100%;
  }
  .content>p{
    width: 100%;
    height: 0.3rem;
    line-height: 0.3rem;
    font-size: 0.14rem;
    text-align: center;
    color: orange;
    background-color: lemonchiffon;
  }
  .content .addrsList{
    text-align: left;
    padding: 0.04rem 0.14rem;
    color: #000;
    height: 0.6rem;
    background-color: white;
    margin-top: 0.02rem;
  }
  .addrsList>p{
    height: 0.2rem;
  }
  .addrsList{
    width: 100%;
    height: 0.4rem;
    color: darkgray;
  }
  .noAnswer{
    margin-top: 2rem;
    text-align: center;
    color: darkgray;
  }
</style>
