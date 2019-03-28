<template>
<section class="container-fluid search">
  <div class="searchArea">
    <!--输入框添加属性:
    v-model双向数据绑定,方便获取输入框的值;
    @focus 绑定获取焦点事件;
    @keydown 键盘enter进入事件
    @click 鼠标点击事件
    -->
    <el-input
      v-model="input"
      @focus="showIcon"
      placeholder="请输入商家或美食名称"
      ><i slot="suffix" class="el-input__icon el-icon-close" @click="clearInput" v-if="isIcon"></i></el-input>
    <el-button
      type="primary"
      @keydown="doAdd(event)"
      @click="doAdd(event)">提交</el-button>
  </div>
  <ul class="recordList">
    <li>搜索历史</li>
    <li v-for = "(item ,key) in list" v-if = "!item.checked">{{item.title}}<i class="iconfont" @click="closeIcon">&#xe62a;</i></li>
    <li @click="clearAllRecord">清空搜索历史</li>
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
      isIcon:false,
      input: '',
      list:[]
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
    // 点击close图标,删除当前记录
    closeIcon(){

    },
    // 点击清空历史,清空所有记录
    clearAllRecord(){

    },
    doAdd(e) {
      if (e.keyCode === 13) {
        this.list.push({
          title: this.input,
          checked: false
        });
      }
      Vue.storage.set("list", this.list)
    },
    removeData(key){
      this.list.splice(key,1);
      Vue.storage.set("list",this.list);
    },
    saveData(){
      Vue.storage.set("list",this.list);
    }
  },
  mounted(){
    /*生命周期函数， vue页面刷新就会触发的方法*/
    let list = Vue.storage.get("list");
    if (list){
     this.list = list;
    }
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
</style>
