<template>
  <div  class="shopDetailBox">
   <!--左侧部分,左列表点击调用-->
    <aside ref="l_list">
      <ul>
        <li ref="l_item" :class="{'act':index === actli}"
            @click="change(index)">
          <p></p>
        </li>
      </ul>
    </aside>
    <!--右侧部分-->
    <section class="r_list" ref="r_list">
      <div>
        <!--在需要跳转到的区块上添加ref属性用于标识-->
        <div>
          <p class="title">热销榜</p>
          <ul>
            <li class="list">
              <div class="list_name flex">
                <p><img src="" alt=""></p>
                <div>
                  <p class="name"></p>
                  <p class="repeat_name"></p>
                  <p class="sale">月售份   好评率12%</p>
                  <p class="mark">123</p>
                  <p class="price">¥35</p>
                  <div class="add"></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import Better from 'better-scroll'
// 单个商铺信息页
export default {
  name: "shopDetail",
  data(){
    return {
      actli:0,
      scrollY: 0,
      arr: [0],
      flag:true,
      obj:null,
      show:false
    }
  },
  computed:{
   goods () {
       return this.$store.state.msg.goods
    }
  },
  // watch:{
  //   show(){
  //     if(this.show){
  //       setTimeout(()=>{
  //         new Better(this.$refs.detail,{
  //           click:true
  //         })
  //       })
  //     }
  //   }
  // },
  // methods:{
  //   change(index){
  //     this.flag = false
  //     this.actli = index
  //     this.rgt.scrollToElement(this.$refs.shopDetail[index],100,0,0)
  //     setTimeout(()=>{
  //       this.flag = true
  //     },100)
  //   },
  //   getDetails(it){
  //     this.show = !this.show
  //     this.obj = it
  //   }
  // },
  // mounted(){
  //
  // }
}
</script>

<style scoped>
  .shopDetailBox{
    width: 100%;
  }
  aside{
    width: 20%;
  }
  aside>ul>li{
    height: 0.2rem;
    display: table;
    background-color: #E3E3E3;
    padding:0.02rem ;
    box-sizing: border-box;
  }

  /*
    ul{
     p{
         display: table-cell;
        font:200 0.24rem/0.28rem '';
 19        vertical-align: middle;
 20        border-bottom: 1px solid rgba(7,17,27,.1);
 21      }
 22    }
 23    .act{
 24      background-color: deepskyblue;
 25    }
 26
 27}
 28.r_list{
 29    position: fixed;
 30    left: 1.6rem;
 31    right: 0;
 32    top: 3.48rem;
 33    bottom: 1.04rem;
 34    overflow: hidden;
 35    .title{
 36      border-left: 3px solid #d9dde1;
 37      height: 0.52rem;
 38      font: 0.24rem/0.52rem '';
 39      color: rgb(147,153,159);
 40      background-color:#f3f5f7;
 41      padding-left: 0.28rem;
 42    }
 43    .flex{
 44      display: flex;
 45      justify-content: center;
 46      align-items: center;
 47    }
 48    .list{
 49      padding: 0.36rem 0.36rem 0 0.36rem;
 50      img{
 51        width: 1.28rem;
 52        border-radius: 0.04rem;
 53      }
 54      .list_item{
 55        justify-content: flex-start;
 56        border-bottom: 1px solid rgba(7,17,27,0.1);
 57        padding-bottom: 0.36rem;
 58        position: relative;
 59        &>div{
 60          margin-left: 0.2rem;
 61          .name{
 62            font: 0.28rem/0.28rem '';
 63            color: rgb(7,17,27);
 64            margin-bottom: 0.16rem;
 65          }
 66          .des,.sale{
 67            font: 0.2rem/0.2rem '';
 68            color: rgb(147,153,159);
 69            margin-bottom: 0.16rem;
 70          }
 71          .sale{
 72            margin-bottom: 0;
 73            span{
 74              margin-left: 0.24rem;
 75            }
 76          }
 77          .price{
 78            font:700 0.2rem/0.48rem '';
 79            color: red;
 80          }
 81          .add{
 82            position: absolute;
 83            right: 0;
 84            bottom: 0.28rem;
 85          }
 86        }
 87      }
 88      .last{
 89        border-bottom: none;
 90      }
 91    }
 92  }
 93  .detail{
 94    background-color: white;
 95    position: fixed;
 96    z-index: 299;
 97    left: 0;
 98    right: 0;
 99    top:0;
100    bottom: 1.04rem;
101    overflow: hidden;
102    .bg{
103      img{
104        height: 7.5rem;
105      }
106    }
107    .tit{
108      &>div{
109        &:nth-of-type(1){
110          padding: 0.36rem;
111          p{
112            &:nth-of-type(1){
113              font: 700 0.28rem/0.28rem '';
114              margin-bottom: 0.16rem;
115            }
116            &:nth-of-type(2){
117              font: 0.2rem '';
118              color: rgb(147,153,159);
119              margin-bottom: 0.36rem;
120            }
121            &:nth-of-type(3){
122              font:700 0.28rem/0.48rem '';
123              color: rgb(240,20,20);
124            }
125          }
126        }
127        &:nth-of-type(2){
128          float: right;
129          margin-right: 0.36rem;
130          margin-top: -0.9rem;
131          font: 0.2rem/0.48rem '';
132          color: white;
133          background-color: rgb(0,160,220);
134          border-radius: 0.24rem;
135          width: 1.48rem;
136          height: 0.48rem;
137          text-align: center;
138        }
139      }
140    }
141    .b_line{
142      height: 0.36rem;
143      background-color: #f3f5f7;
144      border-bottom: 1px solid rgba(0,0,0,0.1);
145      border-top: 1px solid rgba(0,0,0,0.1);
146    }
147    .intr{
148      padding: 0.36rem;
149      p{
150        &:nth-of-type(1){
151          font: 0.28rem '';
152          margin-bottom: 0.12rem;
153        }
154        &:nth-of-type(2){
155          font:200 0.24rem/0.48rem '';
156          color: rgba(77,85,93);
157          min-height: 1rem;
158        }
159      }
160    }
161    .flex{
162      display: flex;
163      justify-content: flex-start;
164      align-items: center;
165    }
166    .esit{
167      &>div{
168        &:nth-of-type(1){
169          padding: 0.36rem 0.36rem 0 0.36rem;
170          &>p{
171            font: 0.28rem '';
172            &:nth-of-type(1){
173              margin-bottom: 0.36rem;
174            }
175          }
176          .count {
177            padding:0 0 0.36rem 0;
178            border-bottom:1px solid rgba(7, 17, 27, 0.1) ;
179            p {
180              text-align: center;
181              font: 0.24rem/0.48rem '';
182              padding: 0.12rem;
183              border-radius: 0.02rem;
184              margin-right: 0.12rem;
185              &:nth-of-type(1) {
186                background-color: #00A0DC;
187              }
188              &:nth-of-type(2) {
189                background-color: #CCECF8;
190              }
191              &:nth-of-type(3) {
192                background-color: #E9EBEC;
193              }
194            }
195            .choosen{
196              transform: scale(1.1);
197            }
198          }
199        }
200        &:nth-of-type(2){
201          font-size: 0;
202          padding: 0.24rem 0.36rem;
203          border-bottom:1px solid rgba(7, 17, 27, 0.1) ;
204          i{
205            color: rgb(147,153,159);
206            font-size: 0.48rem;
207            margin-right: 0.08rem;
208          }
209          span{
210            font: 0.24rem '';
211            color: rgb(147,153,159);
212          }
213        }
214      }
215      &>ul{
216        li{
217          padding: 0 0.36rem;
218          &>div{
219            padding: 0.32rem 0;
220            border-bottom:1px solid rgba(7, 17, 27, 0.1) ;
221            &>div{
222              span{
223                font: 0.2rem/0.24rem '';
224                color: rgb(147,153,159);
225                &:nth-of-type(2){
226                  margin-left: 55%;
227                  margin-right: 0.12rem;
228                }
229              }
230              em{
231                font-size: 0;
232                img {
233                  width: 0.48rem;
234                  border-radius: 50%;
235                }
236              }
237            }
238            p{
239              &:nth-of-type(1){
240                font: 0.24rem/0.32rem '';
241              }
242            }
243          }
244        }
245      }
246    }
247  }
*/
</style>
