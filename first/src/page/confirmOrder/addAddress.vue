<template>
  <section class="container-fluid addAddress">
    <div class="content">
      <el-row :gutter="10">
        <el-col :xs="8"><div class="grid-content bg-purple"><span>联系人</span></div></el-col>
        <el-col :xs="16"><div class="grid-content bg-purple-light"><input type="text" placeholder="你的名字" v-model="yourName"></div></el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="8"><div class="grid-content bg-purple"></div></el-col>
        <el-col :xs="16">
          <div class="grid-content bg-purple-light">
            <el-radio v-model="checked" label="1">先生</el-radio>
            <el-radio v-model="checked" label="2">女士</el-radio>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="8"><div class="grid-content bg-purple"><span>联系电话</span></div></el-col>
        <el-col :xs="14"><div class="grid-content bg-purple-light"><input type="text" placeholder="你的手机号" v-model="yourNumber"></div></el-col>
        <el-col :xs="2"><div class="grid-content bg-purple "><i class="iconfont add" @click="addPhone_bk">&#xe601;</i></div></el-col>
      </el-row>
      <el-row :gutter="10" v-if="addPhone">
        <el-col :xs="8"><div class="grid-content bg-purple"></div></el-col>
        <el-col :xs="16">
          <div class="grid-content bg-purple-light">
            <input type="text" placeholder = "备选电话" v-model="phone_bk">
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="8"><div class="grid-content bg-purple"><span>送餐地址</span></div></el-col>
        <el-col :xs="16"><div class="grid-content bg-purple-light"><input type="text" placeholder="小区/写字楼/学校等" @click="searchAds" v-model="yourAddres"></div></el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="8"><div class="grid-content bg-purple"></div></el-col>
        <el-col :xs="16"><div class="grid-content bg-purple-light"><input type="text" placeholder="详细地址(如门牌号等)" v-model="yourDetailAddres"></div></el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="8"><div class="grid-content bg-purple"><span>标签</span></div></el-col>
        <el-col :xs="16"><div class="grid-content bg-purple-light"><input type="text" placeholder="无/家/学校/公司" v-model="yourTag"></div></el-col>
      </el-row>
    </div>
    <button @click="addAddress">确定</button>
  </section>
</template>

<script>
  import Vue from 'vue'
// 添加地址页
export default {
  name: "addAddress",
  data(){
    return {
      // 存储用户信息
      userInfomation:{},
      //性别选择
      checked:1,
      // 声明变量存储所填name
      yourName:'',
      // 声明变量存储所填电话
      yourNumber:'',
      // 备用电话
      phone_bk:'',
      // 备用电话显隐
      addPhone:false,
      // 声明变量存储所选地址
      yourAddres:'',
      // 声明变量存储所填详细地址
      yourDetailAddres:'',
      // 声明变量存储所填标签
      yourTag:'',
      // 经纬度信息
      geohash:'',
      // 声明对象存储所有信息
      newAddres:[]
    }
  },
  methods:{
    // 搜索地址
    searchAds(){
      this.$router.push({name:'searchAddress'})
    },
    // 备用电话显隐
    addPhone_bk(){
      this.addPhone = true
    },
    // 整理新增地址所填信息,并将信息传到vuex,同时切换路由
    addAddress(){
      // 有空内容,提示用户
      if(this.yourNumber === ''|| this.yourName === ''||this.yourDetailAddres === ''){
        alert('请输入完整信息');
        return
      }
      switch (this.yourTag) {
        case '':
          this.yourTag = '无';
          break;
        case '家':
          this.yourTag = '家';
          break;
        case '学校':
          this.yourTag = '学校';
          break;
        case '公司':
          this.yourTag = '公司';
          break;
      }
      //发起网络请求,把信息添加到服务器地址
      this.$http({
        method:'post',
        url:`https://elm.cangdu.org/v1/users/${this.userInfomation.user_id}/addresses`,
        withCredentials:true,
        data:{
          address: this.yourAddres,
          address_detail: this.yourDetailAddres,
          geohash: this.geohash,
          name: this.yourName,
          phone: this.yourNumber,
          tag: this.yourTag,
          sex: this.checked,
          poi_type:0,
          phone_bk:'',
          tag_type:2
        }
      }).then(res => {
        // 路由切换到chooseAddress页面
        this.$router.push({name:'chooseAddress'});
        console.log('添加地址成功',res.data)
      }).catch((error) => {
        console.log(error);
      });
    }
  },
  created(){
    // 接收子页面传过来的地址参数
    this.yourAddres = this.$route.params.select;
    // 从vuex中接受用户信息,获得用户id,geohash值
    this.userInfomation = this.$store.state.ghc.userInfo;
    this.geohash = this.$store.state.ghc.localInfo.geohash;
    console.log(this.userInfomation,this.geohash);
  }
}
</script>

<style scoped>
.addAddress{
  width: 100%;
  padding: 0;
  background-color: #f5f5f5;
}
.content{
  padding: 0 0.16rem;
  margin-top: 0.1rem;
  background-color: white;
}
.addAddress>button{
  width: 90%;
  height: 0.4rem;
  margin: 0.1rem 5%;
  background-color: limegreen;
  color: #ffffff;
  border: none;
  border-radius: 0.04rem;
  text-align: center;
}
.grid-content{
  min-height: 0.4rem;
  margin: 0.02rem 0;
  line-height: 0.4rem;
}
.bg-purple {
  text-align: left;
}
.bg-purple-light {
  text-align: left;
  color: grey;
  border-bottom: 0.01rem solid #e4e4e4;
}
.grid-content>input{
  outline-style: none;
}
.add{
  color: #008de1;
  font-size: 0.2rem;
}
</style>
