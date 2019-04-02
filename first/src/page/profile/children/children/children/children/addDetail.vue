<template>
  <section class="container-fluid addDetail">
    <div class="searchArea">
      <el-input
        v-model="input"
        @focus="showIcon"
        placeholder="请输入小区/写字楼/学校等"
      ></el-input>
      <el-button type="primary" @click="searchAdds">确认</el-button>
    </div>
    <div class="content">
      <p>为了满足商家的送餐要求,建议您从列表中选取地址</p>
      <div class="addrsList" v-for="(item,index) of listArr">
        <p>{{'name'}}</p>
        <p>{{'address'}}</p>
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
      listArr:[]
    }
  },
  methods:{
    searchAdds(){
      //懒加载
      this.$store.commit({
        type:'amendDataLoad'
      });
      Vue.axios.get('https://elm.cangdu.org/v1/pois?city_id=1&keyword='+this.input+'&type=search',null).then((res)=>{
        //懒加载
        this.$store.commit({
          type:'amendDataLoad'
        });
        console.log(res.data)
      }).catch((error)=>{
        console.log(error)
      })
    }
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
  .el-input{
    width: 2.7rem;
    float: left;
  }
  .el-row{
    width: 0.8rem;
  }
  .el-button--primary{
    width: 0.8rem;
    float: right;
    margin-top: 0.1rem;
  }
  .content{
    width: 100%;
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
