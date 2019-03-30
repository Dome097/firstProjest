<template>
  <section class="container-fluid resetName">
    <div>
      <input placeholder="输入用户名" @focus="inputInfo" v-model="isValue" :class="{changeColor:isChange} "></input>
    </div>
    <p :class="{changeTextColor:isChange}">用户名只能修改一次(5-24字符之间)</p>
    <div class="btn">
      <button :class="{changeBtnColor:isChange}" @click="resetThat">确认修改</button>
    </div>
  </section>
</template>

<script>
// 重置用户名
export default {
  name: "setusername",
  data(){
    return{
      isChange:false,
      isValue:""
    }
  },
  methods:{
    // 输入框状态改变时,修改input的边框颜色,p标签颜色
    inputInfo(){
      this.isChange = true
    },
    resetThat(){
      this.$router.push({name:'info',query:{name:this.isValue}})
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
  input{
    width: 95%;
    height:0.4rem;
    margin-top: 0.1rem;
    border: 0.01rem solid #e4e4e4;
    border-radius: 0.04rem;
    padding-left: 0.1rem;
    outline-style: none;
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
    border: 0;
    border-radius: 0;
  }
  .changeBorderColor{
    border: 0.01rem solid red;
  }
  .changeTextColor{
    color: red;
  }
  .changeBtnColor{
    color: darkgrey;
  }
</style>
