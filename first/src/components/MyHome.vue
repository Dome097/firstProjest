<template>
  <section>
    <nav class="nav1 nav navbar navbar-default bg-primary navbar-fixed-top">
    <span>
      <a href="###">ele.me</a>
    </span>
      <span>
      <a href="###">登录</a>
      <span>|</span>
      <a href="###">注册</a>
    </span>
    </nav>
    <nav class="nav2 nav navbar navbar-default">
      <span>当前定位城市:</span>
      <span>定位不准时,请在城市列表中选择</span>
    </nav>
    <nav class="nav3 nav navbar navbar-default">
      <span>{{Guess}}</span>
      <span>{{'〉'}}</span>
    </nav>
    <div class="container-fluid centre-hot">
      <p>热门城市</p>
      <div class="row">
        <div class="col-3 centre-hotCity" v-for="item in hotCity">
          <router-link :to="{}">{{item}}</router-link>
        </div>
      </div>
    </div>
    <div class="container-fluid centre-all">
      <div class="row" v-for="item in allCity">
        <p>{{item.allCity}}</p>
        <div v-for="i in item.city" class="col-3 centre-allCity">
          <router-link to="{}">{{i.name}}</router-link>
        </div>
      </div>
    </div>


  </section>

</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'MyHome',
    data() {
      return {
        // 定位城市的数据
        Guess: '',
        // 热门城市的数据
        hotCity: [],
        // 全部城市的数据
        allCity: []
      }
    },
    mounted() {
      Vue.axios.get("https://elm.cangdu.org/v1/cities?type=guess", null).then((res) => {
        this.Guess = res.data.name;
      });
      Vue.axios.get("https://elm.cangdu.org/v1/cities?type=hot", null).then((res) => {
        res.data.map((v) => {
          // console.log(res.data)
          this.hotCity.push(v.name);
        })
      }).catch((error) => {
        console.log(error)
      });
      Vue.axios.get("https://elm.cangdu.org/v1/cities?type=group", null).then((res) => {
       // console.log(res.data);
        let arr = Object.keys(res.data).sort();
       // console.log(arr);
        for (let i = 0; i < arr.length; i++) {
          const obj = {allCity: arr[i], city: res.data[arr[i]]};
          console.log(obj);
          this.allCity.push(obj);
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }



</script>

<style scoped>
  * {
    font-size: .16rem;
  }
  .nav1 {
    padding: 0;
  }
  .nav1  a {
    color: white;
  }
  .nav1 span {
    padding: 0.05rem;
    color: white;
  }
  .nav2 {
    padding: 0;
    border-bottom: darkgrey solid .01rem;
  }
  .nav2 span {
    padding: 0.05rem;
  }
  .nav2 span+span {
    color: darkgrey;
  }
  .nav3 {
    padding: 0;
    border-bottom: darkgrey solid .01rem;
  }
  .nav3 span {
    padding: 0.05rem;
  }
  .centre-hot>p{
    width: 100%;
    height: 0.3rem;
    line-height: 0.3rem;
    margin: 0 0 0 0.05rem;
  }
  .centre-hotCity {
    height: 0.4rem;
    line-height: 0.4rem;
    border: 1px solid #E3E3E3;
    text-align: center;
  }
  .centre-all p{
    width: 100%;
    height: 0.3rem;
    line-height: 0.3rem;
    margin: 0 0 0 0.05rem;
  }
  .centre-all{
    table-layot:fixed;
  }
  .centre-allCity{
    color:gray;
    height: 0.4rem;
    line-height: 0.4rem;
    border: 1px solid #E3E3E3;
    text-align: center;
    width: 25%;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;*/
  }
</style>
