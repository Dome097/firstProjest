<template>
<section class="container-fluid search">
  <div class="searchArea">
    <!--输入框添加属性:
    v-model双向数据绑定,方便获取输入框的值;
    @focus 绑定获取焦点事件;
    @click 鼠标点击事件
    -->
    <el-input
      v-model="input"
      @focus="showIcon"
      placeholder="请输入商家或美食名称"
      ><i slot="suffix" class="el-input__icon el-icon-close" @click="clearInput" v-if="isIcon"></i></el-input>
    <el-button
      type="primary"
      @click="searchInfo(input)" :disabled="!input">提交</el-button>
  </div>
  <ul class="recordList" v-if="record">
    <li>搜索历史</li>
    <li v-for = "(item ,key) in list" class="records" @click.self="searchInRecord(item)">{{item}}<i class="iconfont" @click.self="removeData(key)">&#xe62a;</i></li>
    <li @click="clearAllRecord">清空搜索历史</li>
  </ul>
  <ul class="searchFail" v-if="noAnswer">
    <li>很抱歉!无搜索结果</li>
  </ul>
  <ul class="searchFail" v-if="isAnswer">
    <li v-for="(item ,key) in arrData">
      <p>{{item.name}}</p>
      <p>{{item.description}}</p>
    </li>
  </ul>
</section>
</template>

<script>
// 搜索页
import Vue from 'vue'
export default {
  name: "search",
  data() {
    return {
      // 当输入框获取焦点时显示清空图标
      isIcon:false,
      // 没有搜索结果时显示
      noAnswer:false,
      // 有结果时,显示结果
      isAnswer:false,
      // 搜索有结果时,隐藏历史记录
      record:true,
      input: '',
      // 存储历史记录
      list:[],
      // 从store中获取当前城市信息
      curCity:{},
      // 搜索到的返回数据
      arrData:[],
      // 经纬度信息
      geohash:'',
      // 存储用户信息
      userInfomation:{}
    }
  },
  methods: {
    // 点击清除文字图标 清空输入框信息,隐藏该图标
    clearInput(){
      this.input = "";
      this.isIcon = false;
    },
    // 输入框获取焦点时,显示该图标
    showIcon(){
      this.isIcon = true
    },
    // 点击清空历史,清空所有记录
    clearAllRecord(){
      this.storage.set("list", []);
      this.record = false
    },
    // 点击删除图标,删除当前行
    removeData(key){
      this.list.splice(key,1);
      this.storage.set("list",this.list);
      this.list.checked = false;
    },
    // 在记录中发起搜索
    searchInRecord(i){
      this.searchInfo(i)
    },
    searchInfo(i){
      //传入参数
      this.input = i;
      // 调用添加历史记录的函数
      this.doAdd(i);
      //懒加载
      this.$store.commit({
        type:'amendDataLoad'
      });
      // 点击提交按钮时,传入用户输入的参数,发起请求
      Vue.axios.get(`https://elm.cangdu.org/v4/restaurants?geohash=${this.curCity.latitude},${this.curCity.longitude}&keyword=${i}`,null).then(res => {
        //懒加载
        this.$store.commit({
          type:'amendDataLoad'
        });
        // 请求到数据后让内容显示
        this.isAnswer = true;
        this.record = false;
        this.noAnswer = false;
        console.log(res.data);
        this.arrData = res.data;
        // 如果没有请求到数据
        if(res.data === []){
          this.record = false;
          this.noAnswer = true;
          this.isAnswer = false
        }
      }).catch((error) => {
        console.log(error);
        // 没有请求到数据先让历史记录页隐藏,让无结果页显示
        this.record = false;
        this.noAnswer = true;
        this.isAnswer = false
      })
    },
    doAdd() {
       // 将输入框的值去除空格
        this.input = this.input.trim();
        // 判断list中是否有数据
        if (this.list.length>0){//有数据
          // 判断是否有重复
          if(this.list.includes(this.input)){
            // 删除原数组中重复的内容,并在原来位置上添加本次输入的内容
            this.list.splice(this.list.indexOf(this.input),1,this.input);
          }else{
            // 如果没有重复,直接添加
            // this.list.unshift(this.input)
            this.list.unshift(this.input);
          }
        }else{
          // 如果没有数据,直接加入
          this.list.unshift(this.input);
        }

      // 如果记录超过6条,删除最后一条
      if(this.list.length>7){
        this.list.pop()
      }
      this.storage.set("list", this.list)
    },

  },
  mounted(){
    /*生命周期函数， vue页面刷新就会触发的方法*/
    let list = this.storage.get("list");
    if (list){
     this.list = list;
    };
    // 从vuex中接受用户信息,获得用户id,geohash值
    this.userInfomation = this.$store.state.ghc.userInfo;
    this.geohash = this.$store.state.ghc.localInfo.geohash;
    console.log(this.userInfomation,this.geohash);
  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
      vm.curCity = vm.$store.state.ghc.currentCity
    })
  }
}
</script>

<style scoped>
  .search{
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
  .el-input__inner{
    outline-style: none;
  }
  .el-row{
    width: 0.8rem;
  }
  .el-button--primary{
    width: 0.8rem;
    float: right;
    margin-top: 0.1rem;
  }
  .recordList{
    background-color: white;
    margin-bottom: 0;
  }
  .recordList>li{
    border-bottom: 0.01rem solid #e4e4e4;
    height: 0.4rem;
    line-height: 0.4rem;
    padding: 0 0.1rem;
  }
  .recordList>li:nth-child(1){
    background-color: #f5f5f5;
  }
  .recordList>li:last-child{
    text-align: center;
    color: #008de1;
    border-bottom: none;
  }
  .records>i{
    float: right;
  }
  .searchFail>li{
    text-align: left;
    padding: 0 0.1rem;
    color: #000;
    height: 0.6rem;
    background-color: white;
    margin-top: 0.02rem;
  }
  .searchFail>li>p{
    height: 0.2rem;
  }
</style>
