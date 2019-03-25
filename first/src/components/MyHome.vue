<template>
  <section class="city container-fluid" >
    <nav class="nv navbar navbar-fixed-top">
      <a href="###" class="pull-left">ele.me</a>
      <div class="pull-right">
        <span><a href="###">登录</a></span>
        <span>|</span>
        <span><a href="###">注册</a></span>
      </div>
    </nav>
    <div class="content container-fluid" >
      <div class="selectCity row">
        <span class="col-xs-5" >当前定位城市:</span>
        <span class="ps col-xs-7">定位不准时,请在城市列表选择</span>
      </div>
      <div class="selectCity row">
        <span class="col-xs-10">{{currentCity}}</span>
        <span class="col-xs-2">></span>
      </div>
      <div class="hotCity container-fluid">
        <p>热门城市</p>
        <ul class="row">
          <td v-for="(item , index) in hot_city" class="col-xs-3"><router-link :to="{}">{{item}}</router-link></td>
        </ul>
      </div>
      <div class="hotCity container-fluid row" v-for="item in allCity" >
          <p>{{item.cityNum}}</p>
          <ul class="row">
            <td v-for="i in item.city" class="col-xs-3 citys"><router-link :to="{}">{{i.name}}</router-link></td>
          </ul>
      </div>
    </div>
  </section>
</template>

<script>
  import Vue from 'vue'
    export default {
        name: "MyHome",
      data(){
          return {
            // 声明变量存贮定位城市
            currentCity:'',
            // 声明数组存贮热门城市
            hot_city:[],
            // 声明数组存贮全部城市对应的编号
            allCity:[],
          }
      },
      methods:{},
      computed:{},
      mounted(){
        // 当前定位城市
        Vue.axios.get('https://elm.cangdu.org/v1/cities?type=guess',null).then((res)=>{
          this.currentCity = res.data.name
          // console.log(this.currentCity);
        }).catch((error)=>{
          console.log(error)
        })
        // 在创建之前请求hot_city数据
        Vue.axios.get('https://elm.cangdu.org/v1/cities?type=hot',null).then((res)=>{
          // 把请求到的数据遍历一下,存入数组
          this.hot_city = res.data.map((item)=>{return item.name})
          // console.log(this.hot_city);
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
        }).catch((error)=>{
          console.log(error)
        })
      }
    }
</script>

<style scoped>

.city{
  font-size: .16rem;
  overflow: hidden;
  width: 100%;
  padding: 0;
  background-color: #f5f5f5;
}
.nv>a{
  color: #fff;
  text-decoration: none;
}
.pull-right>span>a{
  color: #fff;
  text-decoration: none;
}
  .nv{
    padding: 0.12rem;
    color: white;
    width: 100%;
    height: 0.2rem;
    background-color: blue;
  }
  .content{
    width: 100%;
    margin-top: 0.5rem;
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
