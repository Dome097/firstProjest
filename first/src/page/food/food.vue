<template>
  <section>
    <!--下拉整体容器-->
    <div class="dome-food">
      <!--头部-->
      <div class="dome-top">
        <!--头左部-->
        <div @click="">
          <span>{{this.$store.state.dome.cate[0][this.$store.state.dome.cate[2]][this.$store.state.dome.cate[1]].title}}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <!--头中部-->
        <div>
          <span>{{'排序'}}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <!--头右部-->
        <div>
          <span>{{'筛选'}}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
      </div>
      <!--下拉内容-->
      <div class="dome-spinner">
        <!--分类排序-->
        <div class="dome-classify" v-if="false">
          <!--分类左-->
          <div class="dome-classifyLeft">
            <!--循环每行-->
            <div v-for="(item, index) in classify" class="dome-classifyLeft-line" :class="{domeClassifyFocus:focus===index}" @click="focus = index">
              <!--分类图片-->
              <img class="dome-classifyLeft-img" :src="item.image_url.slice(-4).endsWith('png')===true?http+item.image_url+'.png':http+item.image_url+'.jpeg'" alt="">
              <!--商家图标-->
              <i class="iconfont dome-merchant" v-if="index === 7">&#xe69e;</i>
              <!--名称-->
              <span>{{item.name}}</span>
              <!--箭头-->
              <i class="dome-arrows iconfont right">&#xe634;</i>
              <!--数量包-->
              <div class="dome-classifyLeft-quantity-bag right">
                <!--数量-->
                <span class="dome-classifyLeft-quantity">
                  {{item.count}}
                </span>
              </div>
            </div>
          </div>
          <!--分类右-->
          <div class="dome-classify-right">
            <!--右侧循环每行-->
            <div class="dome-classify-right-line right" v-for="(item, index) in downClassifyArr[focus]" v-if="index">
              <!--左侧容器-->
              <span class="dome-classify-right-line-span left">{{item.name}}</span>
              <!--右侧容器-->
              <span class="dome-classify-right-line-span right">{{item.count}}</span>
            </div>
          </div>
        </div>
        <!--排序方式-->
        <div class="dome-sort" v-if="true">
          <!--图片-->
          <!--方式-->
        </div>
        <!--筛选-->
        <div class="dome-screen" v-if="false">
          <!--筛选上部容器-->
          <div class="dome-screen-top"></div>
          <!--筛选下部按钮容器-->
          <div class="dome-screen-below">
            <!--按钮容器左-->
            <div class="dome-screen-but-left">
              <button class="btn btn-default">清空</button>
            </div>
            <!--按钮容器右-->
            <div class="dome-screen-but-right">
              <button class="btn btn-success">确定</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <shoplist></shoplist>
  </section>
</template>

<script>
// 食品筛选排序页
import Shoplist from "../../components/common/shoplist";
export default {
  name: "food",
  data () {
    return {
      // 分类数据
      classify: [],
      // 再次分类
      downClassifyArr:[],
      // 图片处理
      http:'https://fuss10.elemecdn.com/',
      // 选中处理
      focus: '',
      // 控制分类右侧显示
      downClassify:''
    }
  },
  components: {Shoplist},
  methods: {},
  computed:{
  },
  mounted () {
    // console.log(this.$store.state.dome.cate)
    // console.log(this.$store.state.dome.cate[0][0][this.$store.state.dome.cate[1]].title)
  },
  created () {
    // 请求所有商铺分类列表
    this.$http({
      method: 'get',
      url:'https://elm.cangdu.org/shopping/v2/restaurant/category'
    }).then((res)=> {
      this.classify = res.data
      for (let i of res.data) {
        this.downClassifyArr.push(i.sub_categories)
      }
      console.log('this.downClassifyArr',this.downClassifyArr)
      this.downClassify = 2
    })
  }
}
</script>

<style scoped>
/*下拉整体容器*/
.dome-food {
  position: fixed;
  width: 100%;
  z-index: 2;
}
/*头部容器*/
.dome-top {
  display: flex;
  width: 100%;
  padding-top: 0.2rem;
  background-color: white;
  border-bottom: #e4e4e4 solid 0.01rem;
  z-index: 3;
}
.dome-top>div {
  width:30%;
  text-align: center;
  margin: 0 auto 0.1rem ;
  z-index: 4;
}
.dome-top>div:nth-child(-n+2) {
  border-right: #e4e4e4 solid 0.01rem;
}
/*下拉列表*/
.dome-spinner {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(22,22,22,0.1)
}
/*分类容器*/
.dome-classify {
  position: absolute;
  width: 100%;
  height: 4.5rem;
  display: flex;
  z-index: 4;
}
/*分类左侧*/
.dome-classifyLeft {
  width: 50%;
  background-color: #eeeeee;
  height: 100%;
}
/*循环每行*/
.dome-classifyLeft-line {
  line-height: 0.5rem;
  text-indent: 0.2rem;
}
/*箭头*/
.dome-arrows {
  text-indent: 0.05rem
}
/*后台缺失的*/
.dome-merchant {
  font-size: 0.16rem;
  color: #90B4FC;
}
/*左侧图片*/
.dome-classifyLeft-img {
  width: 0.16rem;
}
/*分类总数外部容器*/
.dome-classifyLeft-quantity-bag {
  height: 0.5rem;
  text-align: center;
}
/*分类总数*/
.dome-classifyLeft-quantity {
  background-color: #d9d9d9;
  border-radius: 0.16rem;
  line-height: 0.16rem;
  text-indent: 0;
}
/*分类右侧*/
.dome-classify-right {
  width: 50%;
  background-color: white;
  height: 100%;
}
/*分类右侧每行*/
.dome-classify-right-line {
  width:95%;
  height: 0.5rem;
  border-bottom: #f5f5f5 solid 0.01rem;
}
/*分类右侧每行span*/
.dome-classify-right-line-span {
  height: 0.5rem;
  line-height: 0.5rem;
  margin-right: 0.1rem;
}
/*分类选中效果*/
.domeClassifyFocus {
  background-color: white;
}
/*排序容器*/
.dome-sort {
  position: absolute;
  width: 100%;
  height: 3rem;
  background-color: #e29857;
  z-index: 4;
}
/*筛选容器*/
.dome-screen {
  position: absolute;
  width: 100%;
  height: 2.5rem;
  background-color: #a4a4a4;
  z-index: 4;
}
/*筛选上部容器*/
.dome-screen-top {
  width: 100%;
  height: 2rem;
  background-color: #90B4FC;
}
/*筛选下部按钮容器*/
.dome-screen-below {
  width: 100%;
  height: 0.5rem;
  background-color: #98fcdf;
  display: flex;
}
/*按钮容器左*/
.dome-screen-but-left{
  width: 50%;
  height: 0.5rem;
  background-color: #f5f5f5;
  line-height: 0.5rem;
  text-align: center;
}
/*按钮容器右*/
.dome-screen-but-right {
  width: 50%;
  height: 0.5rem;
  background-color: #f5f5f5;
  line-height: 0.5rem;
  text-align: center;
}
/*按钮*/
.dome-screen-below button {
  width: 90%;
}
</style>
