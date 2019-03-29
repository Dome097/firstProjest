<template>
  <section class="container-fluid resetName">
    <div>
      <el-input placeholder="输入用户名" @change="inputInfo"></el-input>
    </div>
    <p>用户名只能修改一次(5-24字符之间)</p>
    <div class="btn">
      <el-button>确认修改</el-button>
    </div>
  </section>
</template>

<script>
// 重置用户名
export default {
  name: "setusername",
  data(){
    return{

    }
  },
  methods:{
    // 输入框状态改变时,修改input的边框颜色,p标签颜色
    inputInfo(){

    }
  }
}
</script>

<style scoped>
  .resetName{
    width: 100%;
    height: 100%;
    padding: 0;
  }
  .resetName>div{
    text-align: center;
  }
  .el-input{
    width: 95%;
    height:0.4rem;
    margin-top: 0.1rem;
  }
  .el-input__inner{
    padding: 0 !important;
  }
  .resetName>p{
    width: 95%;
    padding: 0.04rem 0.1rem;
    color: dimgrey;
    font-size: 0.12rem;
  }
  .btn{
    width: 100%;
    padding: 0;
  }
  .btn>button{
    width: 96%;
    height:0.4rem;
    background-color: #008de1;
    color: #ffffff;
    border-radius: 0;
  }
</style>
