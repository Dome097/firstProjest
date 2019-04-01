<template>
  <section class="container-fluid city" >
    <!--<nav class="nv navbar navbar-fixed-top">-->
      <!--<a href="###" class="pull-left">ele.me</a>-->
      <!--<div class="pull-right">-->
        <!--<span><a href="###">登录</a></span>-->
        <!--<span>|</span>-->
        <!--<span><a href="###">注册</a></span>-->
      <!--</div>-->
    <!--</nav>-->
    <div class="content container-fluid" >
      <div class="selectCity row">
        <span class="col-xs-5" >当前定位城市:</span>
        <span class="ps col-xs-7">定位不准时,请在城市列表选择</span>
      </div>
      <div class="selectCity row">
        <router-link :to="{name:'city'}" class="col-xs-10" @click.native="selectThis(currentCity)">{{currentCity.name}}</router-link>
        <router-link :to="{name:'city'}" class="col-xs-2">></router-link>
      </div>
      <div class="hotCity container-fluid">
        <p>热门城市</p>
        <ul class="row">
          <td v-for="(item , index) in hot_city"  class="col-xs-3" @click="selectThis(item)"><router-link :to="{name:'city'}">{{item.name}}</router-link></td>
        </ul>
      </div>
      <div class="hotCity container-fluid row" v-for="item in allCity" >
        <p>{{item.cityNum}}</p>
        <ul class="row">
          <td v-for="i in item.city" class="col-xs-3 citys" @click="selectThis(i)"><router-link :to="{name:'city'}">{{i.name}}</router-link></td>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
  import Vue from 'vue'
export default {
  name: "home",
  data(){
    return {
      // 声明变量存贮定位城市
      currentCity:'',
      // 声明数组存贮热门城市
      hot_city:[],
      // 声明数组存贮全部城市对应的编号
      allCity:[],
      // 声明数组存储热门城市编号
      hot_cityNum:[],
      // 声明数组存储所有城市编号
    }
  },
  methods:{
    // 点击热门城市跳转到对应城市,应传递参数,参数是对应城市id
    sendCityNum(i){
      this.hot_cityNum = i
      console.log(this.hot_cityNum)
    },
    // 点击任意城市,获取这个城市的信息
    selectThis(i){
      console.log(i)
      this.$store.commit('CITY',i)
    }
  },
  computed:{},
  mounted(){
    // 当前定位城市
    Vue.axios.get('https://elm.cangdu.org/v1/cities?type=guess',null).then((res)=>{
      this.currentCity = res.data
      // console.log(this.currentCity);
    }).catch((error)=>{
      console.log(error)
    })
    // 在创建之前请求hot_city数据
    Vue.axios.get('https://elm.cangdu.org/v1/cities?type=hot',null).then((res)=>{
      // 把请求到的数据遍历一下,获取城市对应的name,存入hot_city数组
      this.hot_city = res.data.map((item)=>{return item})
      // 把请求到的数据遍历一下,获取城市对应的id,存入cityNum数组
      this.hot_cityNum = res.data.map((item)=>{return item.id})
      console.log(this.hot_cityNum);
    }).catch((error)=>{
      console.log(error)
    })
    // 在创建之前请求groupCity数据
    Vue.axios.get('https://elm.cangdu.org/v1/cities?type=group',null).then((res)=>{
      // 把请求到所有城市的数据遍历一下,存入数组
      let arr = Object.keys(res.data).sort();
      for (let i = 0; i < arr.length; i++) {
        const obj = {cityNum: arr[i], city: res.data[arr[i]]};
        this.allCity.push(obj);
      }
      // console.log(this.allCity)
      // for (let item of this.allCity) {
      //   console.log(item.city)
      //   for (let i of item.city) {
      //     console.log(i.id)
      //   }
      // }
    }).catch((error)=>{
      console.log(error)
    })
  }
}
</script>

<style scoped>
  .city{
    /*font-size: .16rem;*/
    /*overflow: hidden;*/
    width: 100%;
    height: 100%;
    padding: 0;
    /*background-color: #f5f5f5;*/
  }
  /*.nv>a{*/
    /*color: #fff;*/
    /*text-decoration: none;*/
  /*}*/
  /*.pull-right>span>a{*/
    /*color: #fff;*/
    /*text-decoration: none;*/
  /*}*/
  /*.nv{*/
    /*padding: 0.12rem;*/
    /*color: white;*/
    /*width: 100%;*/
    /*height: 0.2rem;*/
    /*background-color: blue;*/
  /*}*/
  .content{
    width: 100%;
    font-size: smaller;
    padding: 0;
  }

  .selectCity{
    margin: 0;
    border-bottom: #e4e4e4 1px solid;
    height: 0.4rem;
    line-height: 0.4rem;
    width: 100%;
    background-color: #fff;
  }
  .selectCity>a{
    text-decoration: none;
    color: #000;
  }
  .ps{
    font-size: xx-small;
    color: darkgrey;
  }
  .hotCity{
    margin: 0.1rem 0;
    border-top:0.005rem solid #e4e4e4;
    border-bottom:0.005rem solid #e4e4e4;
    background-color: #fff;
    table-layout:fixed;
  }
  .hotCity p{
    height: 0.4rem;
    line-height: 0.4rem;
  }
  .hotCity ul{
    text-align: center;
    border-top: 0.005rem solid #e4e4e4;
  }
  .hotCity td{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-right: 0.005rem solid lightgray;
    border-bottom: 0.005rem solid lightgray;
    height: 0.4rem;
    line-height: 0.4rem;
  }
</style>
