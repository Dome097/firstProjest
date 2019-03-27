<template>
  <section class="container-fluid service">
    <div class="row contact" v-if="isIf">
      <div class="col-xs-6 left">
        <router-link :to="{}">
          <i class="iconfont">&#xe65a;</i>
          <p>在线客服</p>
        </router-link>
      </div>
      <div class="col-xs-6 right">
        <a @click="call">
          <i class="iconfont">&#xe615;</i>
          <p>在线客服</p>
        </a>
      </div>
      <mt-popup
        v-model="popupVisible1"
        popup-transition="popup-fade">
        <div class="call">
          <a href="tel:10105757">呼叫</a>
          <a href="###">复制</a>
          <a @click="addPerson">添加到手机通讯录</a>
        </div>
      </mt-popup>
      <mt-popup
        v-model="popupVisible2"
        popup-transition="popup-fade">
        <div class="addPerson">
          <a href="###">创建新的联系人</a>
          <a href="###">添加到现有联系人</a>
        </div>
      </mt-popup>
      <div class="questionTitle">
        <p>热门问题</p>
        <div @click="isIf = false">
          <router-link :to="{name:'questionDetail',query:{title:'超级会员权益说明'}}">
            <p>超级会员权益说明</p>
            <i class="iconfont">&#xe634;</i>
          </router-link>
        </div>
        <div @click="isIf = false">
          <router-link :to="{name:'questionDetail',query:{title:'签到规则'}}">
            <p>签到规则</p>
            <i class="iconfont">&#xe634;</i>
          </router-link>
        </div>
        <div @click="isIf = false">
          <router-link :to="{name:'questionDetail',query:{title:'用户等级说明'}}">
            <p>用户等级说明</p>
            <i class="iconfont">&#xe634;</i>
          </router-link>
        </div>
        <div @click="isIf = false">
          <router-link :to="{name:'questionDetail',query:{title:'积分问题'}}">
            <p>积分问题</p>
            <i class="iconfont">&#xe634;</i>
          </router-link>
        </div>
        <div @click="isIf = false">
          <router-link :to="{name:'questionDetail',query:{title:'教我拍大片'}}">
            <p>教我拍大片</p>
            <i class="iconfont">&#xe634;</i>
          </router-link>
        </div>
        <div @click="isIf = false">
          <router-link :to="{name:'questionDetail',query:{title:'支付问题'}}">
            <p>支付问题</p>
            <i class="iconfont">&#xe634;</i>
          </router-link>
        </div>
        <div @click="isIf = false">
          <router-link :to="{name:'questionDetail',query:{title:'其它问题'}}">
            <p>其它问题</p>
            <i class="iconfont">&#xe634;</i>
          </router-link>
        </div>
        <div @click="isIf = false">
          <router-link :to="{name:'questionDetail',query:{title:'准时达问题'}}">
            <p>准时达问题</p>
            <i class="iconfont">&#xe634;</i>
          </router-link>
        </div>
        <div @click="isIf = false">
          <router-link :to="{name:'questionDetail',query:{title:'会员说明'}}">
            <p>会员说明</p>
            <i class="iconfont">&#xe634;</i>
          </router-link>
        </div>
        <div @click="isIf = false">
          <router-link :to="{name:'questionDetail',query:{title:'会员问题'}}">
            <p>会员问题</p>
            <i class="iconfont">&#xe634;</i>
          </router-link>
        </div>
        <div @click="isIf = false">
          <router-link :to="{name:'questionDetail',query:{title:'红包问题'}}">
            <p>红包问题</p>
            <i class="iconfont">&#xe634;</i>
          </router-link>
        </div>
        <div @click="isIf = false">
          <router-link :to="{name:'questionDetail',query:{title:'活动细则'}}">
            <p>活动细则</p>
            <i class="iconfont">&#xe634;</i>
          </router-link>
        </div>
        <div @click="isIf = false">
          <router-link :to="{name:'questionDetail',query:{title:'补签规则'}}">
            <p>补签规则</p>
            <i class="iconfont">&#xe634;</i>
          </router-link>
        </div>
        <div @click="isIf = false">
          <router-link :to="{name:'questionDetail',query:{title:'优惠说明'}}">
            <p>优惠说明</p>
            <i class="iconfont">&#xe634;</i>
          </router-link>
        </div>
        <div @click="isIf = false">
          <router-link :to="{name:'questionDetail',query:{title:'免责声明'}}">
            <p>免责声明</p>
            <i class="iconfont">&#xe634;</i>
          </router-link>
        </div>
        <div @click="isIf = false">
          <router-link :to="{name:'questionDetail',query:{title:'代金券说明'}}">
            <p>代金券说明</p>
            <i class="iconfont">&#xe634;</i>
          </router-link>
        </div>
        <div @click="isIf = false">
          <router-link :to="{name:'questionDetail',query:{title:'商务合作'}}">
            <p>商务合作</p>
            <i class="iconfont">&#xe634;</i>
          </router-link>
        </div>
        <div @click="isIf = false">
          <router-link :to="{name:'questionDetail',query:{title:'余额问题'}}">
            <p>余额问题</p>
            <i class="iconfont">&#xe634;</i>
          </router-link>
        </div>
        <div @click="isIf = false">
          <router-link :to="{name:'questionDetail',query:{title:'超赞商家'}}">
            <p>超赞商家</p>
            <i class="iconfont">&#xe634;</i>
          </router-link>
        </div>
        <div @click="isIf = false">
          <router-link :to="{name:'questionDetail',query:{title:'匿名购买'}}">
            <p>匿名购买</p>
            <i class="iconfont">&#xe634;</i>
          </router-link>
        </div>
        <div @click="isIf = false">
          <router-link :to="{name:'questionDetail',query:{title:'活动问题'}}">
            <p>活动问题</p>
            <i class="iconfont">&#xe634;</i>
          </router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </section>
</template>

<script>
// 服务中心
// 引入Vue,引入Popup模块
import Vue from 'vue'
import { Popup } from 'mint-ui';
// 将Popup模块,转化成组件
Vue.component(Popup.name, Popup);
export default {
  name: "service",
  data(){
    return{
      //声明变量存储状态
      popupVisible1:false,
      popupVisible2:false,
      // 声明变量存储显隐状态
      isIf:true
    }
  },
  methods:{
    call(){
      // 在需求弹框的标签中绑定点击事件触发,修改状态
      this.popupVisible1 = true
    },
    addPerson(){
      this.popupVisible1 = false;
      this.popupVisible2 = true
    }
  },
  mounted(){

  }
}
</script>

<style scoped>
  /*坑点:要修改弹框样式需要到<mt-popup></mt-popup>渲染到view层的div中的定义的class="mint-popup"*/
.mint-popup{
  width: 3rem;
  height: 1.8rem;
  border-radius: 0.1rem;
}
  .service{
    background-color: white;
  }
.contact .mint-popup+.mint-popup{
  height: 1.2rem;
}
.call>a{
  color: black;
  display: block;
  text-decoration: none;
  margin: 0;
  width: 3rem;
  height: 0.6rem;
  padding-left: 0.2rem;
  line-height: 0.6rem;
  border-bottom: 0.01rem solid #e4e4e4;
}
.call>a:nth-child(3){
  border-bottom: none;
}
  .addPerson>a{
    color: black;
    display: block;
    text-decoration: none;
    margin: 0;
    width: 3rem;
    height: 0.6rem;
    padding-left: 0.2rem;
    line-height: 0.6rem;
    border-bottom: 0.01rem solid #e4e4e4;
  }
.addPerson>a+a{
  border-bottom: none;
}
.left,.right{
    height: 1rem;
    text-align: center;
    line-height: 0.26rem;
    display: inline-block;
    padding: 0.3rem 0;
    border-bottom: 0.01rem solid #e4e4e4;
}
.left{
  border-right: 0.01rem solid #e4e4e4;
}
.left>a,.right>a{
  text-decoration: none;
  color: black;
}
  .left>a>i{
    font-size: x-large;
    color: orange;
  }
  .right>a>i{
    font-size: x-large;
    color: limegreen;
  }
.questionTitle>p{
  font-size: 0.16rem;
  float: left;
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  border-bottom: 0.01rem solid #e4e4e4;
  padding-left:0.16rem ;
}
.questionTitle p{
  margin: 0;
}
.questionTitle>div>a{
  height: 0.4rem;
  line-height: 0.4rem;
  text-decoration: none;
  color: dimgrey;
  display: block;
  clear: both;
  border-bottom: 0.01rem solid #e4e4e4;
  padding:0 0.16rem ;
}
  .questionTitle>div>a>p,i{
    display: inline-block;
  }
  .questionTitle>div>a>p{
    float: left;
  }
  .questionTitle>div>a>i{
    float: right;
  }
</style>
