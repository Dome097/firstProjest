<template>
  <section class="container-fluid searchAddress">
    <div class="searchArea">
      <!--输入框添加属性:
      v-model双向数据绑定,方便获取输入框的值;
      @focus 绑定获取焦点事件;
      @click 鼠标点击事件
      -->
      <el-input
        v-model="input"
        @focus="showIcon"
        placeholder="请输入小区/写字楼/学校等"
      ><i slot="suffix" class="el-input__icon el-icon-close" @click="clearInput" v-if="isIcon"></i></el-input>
      <el-button
        type="primary"
        @click="searchInfo(input)" :disabled="!input">搜索</el-button>
    </div>
    <ul class="recordList" v-if="record">
      <li>搜索历史</li>
      <li v-for = "(item ,key) in searchList" class="records" @click.self="selectInRecord(item)">{{item}}</li>
      <li @click="clearAllRecord">清空搜索历史</li>
    </ul>
    <ul class="searchFail" v-if="noAnswer">
      <li>很抱歉!无搜索结果</li>
    </ul>
    <ul class="searchFail" v-if="isAnswer">
      <li v-for="(item ,key) in arrData" @click="selectThis(item)">
        <p>{{item.name}}</p>
        <p>{{item.address}}</p>
      </li>
    </ul>
  </section>
</template>

<script>
import Vue from 'vue'
// 搜索地址页
export default {
  name: "searchAddress",
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
      searchList:[],
      // 从store中获取当前城市信息
      curCity:{},
      // 搜索到的返回数据
      arrData:[],
      // 选择的具体地址
      selectAddress:''
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
      this.storage.set("searchList", []);
      this.record = false
    },
    // 点击删除图标,删除当前行
    removeData(key){
      this.searchList.splice(key,1);
      this.storage.set("searchList",this.searchList);
      this.searchList.checked = false;
    },
    // 在搜索结果中选择
    selectThis(i){
      this.selectAddress = i.name;
      // 跳转到上一页,并传递所选地址参数
      this.$router.push({name:'addAddress',params:{select:this.selectAddress}})
    },
    // 在搜索记录中选择搜索目的
    selectInRecord(i){
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
      Vue.axios.get(`https://elm.cangdu.org/v1/pois?city_id=${this.curCity.id}&keyword=${i}&type=search`,null).then(res => {
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
      if (this.searchList.length>0){//有数据
        // 判断是否有重复
        if(this.searchList.includes(this.input)){
          // 删除原数组中重复的内容,并在原来位置上添加本次输入的内容
          this.searchList.splice(this.searchList.indexOf(this.input),1,this.input);
        }else{
          // 如果没有重复,直接添加
          this.searchList.unshift(this.input);
        }
      }else{
        // 如果没有数据,直接加入
        this.searchList.unshift(this.input);
      }

      // 如果记录超过6条,删除最后一条
      if(this.searchList.length>20){
        this.searchList.pop()
      }
      this.storage.set("searchList", this.searchList)
    },

  },
  mounted(){
    /*生命周期函数， vue页面刷新就会触发的方法*/
    let searchList = this.storage.get("searchList");
    if (searchList){
      this.searchList = searchList;
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
  .searchAddress{
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
  .el-input__icon{
    color: darkslateblue;
    font-size: 0.16rem;
    font-weight: bolder;
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
    padding: 0.04rem 0.14rem;
    color: #000;
    height: 0.6rem;
    background-color: white;
    margin-top: 0.02rem;
  }
  .searchFail>li>p{
    height: 0.2rem;
  }
</style>
