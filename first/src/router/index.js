import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
// 城市
import City from '../page/city/city'
// 余额
import Balance from '../page/balance/balance'
// 我的余额
import mybalance from '../page/balance/children/mybalance'
// 余额说明
import BalanceDetail from '../page/balance/children/detail'
// 红包页
import Benefit from '../page/benefit/benefit'
// 推荐有奖
import BenefitCommend from '../page/benefit/children/commend'
// 代金券说明
import BenefitCoupon from '../page/benefit/children/coupon'
// 兑换红包
import BenefitExchange from '../page/benefit/children/exchange'
// 红包说明
import BenefitHbDescription from '../page/benefit/children/hbDescription'
// 历史红包
import BenefitHbHistory from '../page/benefit/children/hbHistory'
// 确认订单页
import confirmOrder from '../page/confirmOrder/confirmOrder'
// 选择地址页
import chooseAddress from '../page/confirmOrder/children/chooseAddress'
// 选择发票页
import invoice from '../page/confirmOrder/children/invoice'
// 付款页
import payment from '../page/confirmOrder/children/payment'
// 订单备注页
import remark from '../page/confirmOrder/children/remark'
// 用户验证页
import userValidation from '../page/confirmOrder/children/useValidation'
// 添加地址页
import addAddress from '../page/confirmOrder/children/children/addAddress'
// 搜索地址页
import searchAddress from '../page/confirmOrder/children/children/children/searchAddress'
// 下载App
import download from '../page/download/downLoad'
// 发现页
import find from '../page/find/find'
// 食品筛选排序页
import food from '../page/food/food'
// 忘记密码,修改密码页
import forget from '../page/forget/forget'
// 首页
import home from '../page/home/home'
// 登录注册页
import login from '../page/login/login'
// 商铺列表页
import msite from '../page/msite/msite'
// 订单列表页
import order from '../page/order/order'
// 订单详情页
import orderDetail from '../page/order/children/orderDetail'
// 积分页
import points from '../page/points/points'
// 我的积分
import mypoints from '../page/points/children/mypoints'
// 积分说明
import pointsDetail from '../page/points/children/detail'
// 个人中心
import profile from '../page/profile/profile'
// 我的
import mind from '../page/profile/children/mind'
// 账户信息
import info from '../page/profile/children/info'
// 重置用户名
import setusername from '../page/profile/children/setusername'
// 地址
import address from '../page/profile/children/children/address'
// 新增地址
import add from '../page/profile/children/children/children/add'
// 搜索地址
import addDetail from '../page/profile/children/children/children/children/addDetail'
// 搜索页
import search from '../page/search/search'
// 服务中心
import service from '../page/service/service'
// 问题详情
import questionDetail from '../page/service/children/questionDetail'
// 商铺筛选页
import shop from '../page/shop/shop'
// 商铺信息页
import foodDetail from '../page/shop/children/foodDetail'
// 单个商铺信息页
import shopDetail from '../page/shop/children/shopDetail'
// 商品认证信息页
import shopSafe from '../page/shop/children/children/shopSafe'
// 会员卡办理页
import vipcard from '../page/vipcard/vipcard'
// 购买记录
import invoiceRecord from '../page/vipcard/children/invoiceRecord'
// 使用卡号购买
import useCart from '../page/vipcard/children/useCart'
// 会员说明
import vipDescription from '../page/vipcard/children/vipDescription'
Vue.use(VueAxios, axios)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      // 城市
      path: '/city',
      component: City,
      name: 'city'
    },
    { // 余额 一级路由
      path: '/balance',
      redirect:'/balance/mybalance',
      component: Balance,
      name: 'balance',
      children: [ // 二级路由
        // 我的余额
        {
          path:'mybalance',
          component:mybalance,
          name:'mybalance'
        },
        // 余额说明
        {
          path: 'detail',
          component: BalanceDetail,
          name: 'BalanceDetail'
        }
      ]
    },
    { // 红包页 一级路由
      path: '/benefit',
      component: Benefit,
      name: 'benefit',
      children: [ // 二级路由
        {
          // 推荐有奖
          path: 'commend',
          component: BenefitCommend,
          name: 'commend'
        },
        {
          // 代金券说明
          path: 'coupon',
          component: BenefitCoupon,
          name: 'coupon'
        },
        {
          // 兑换红包
          path: 'exchange',
          component: BenefitExchange,
          name: 'exchange'
        },
        {
          // 红包说明
          path: 'hbDescription',
          component: BenefitHbDescription,
          name: 'hbDescription'
        },
        {
          // 历史红包
          path: 'hbHistory',
          component: BenefitHbHistory,
          name: 'hbHistory'
        }
      ]
    },
    { // 确认订单页 一级路由
      path: '/confirmOrder',
      component: confirmOrder,
      name: 'confirmOrder',
      children: [ // 二级路由
        {
          // 选择地址页
          path: 'chooseAddress',
          component:chooseAddress,
          name: 'chooseAddress'
        },
        {
          // 选择地址页
          path: 'chooseAddress',
          component: chooseAddress,
          name: 'chooseAddress'
        },
        {
          // 选择发票页
          path: 'invoice',
          component: invoice,
          name: 'invoice'
        },
        {
          // 付款页
          path: 'payment',
          component: payment,
          name: 'payment'
        },
        {
          // 订单备注页
          path: 'remark',
          component: remark,
          name: 'remark'
        },
        {
          // 用户验证页
          path: 'userValidation',
          component: userValidation,
          name: 'userValidation'
        },
        {
          // 添加地址页
          path: 'addAddress',
          component: addAddress,
          name: 'addAddress',
          children: [ // 三级路由
            {
              // 搜索地址页
              path: 'searchAddress',
              component: searchAddress,
              name: 'searchAddress'
            }
          ]
        }
      ]
    },
    { // 下载App 一级路由
      path: '/download',
      component: download,
      name: 'download'
    },
    { // 发现页 一级路由
      path: '/find',
      component: find,
      name: 'find'
    },
    { // 食品筛选排序页 一级路由
      path: '/food',
      component: food,
      name: 'food'
    },
    { // 忘记密码,修改密码 一级路由
      path: '/forget',
      component: forget,
      name: 'forget'
    },
    { // 首页 一级路由
      path: '/home',
      component: home,
      name: 'home'
    },
    { // 登录注册页 一级路由
      path: '/login',
      component: login,
      name: 'login'
    },
    { // 商品列表页 一级路由
      path: '/msite',
      component: msite,
      name: 'msite'
    },
    { // 订单列表页 一级路由
      path: '/order',
      component: order,
      name: 'order',
      children: [ // 二级路由
        { // 订单详情页
          path: 'orderDetail',
          component: orderDetail,
          name: 'orderDetail'
        }
      ]
    },
    { // 积分页 一级路由
      path: '/points',
      redirect:'/points/mypoints',
      component: points,
      name: 'points',
      children: [ // 二级路由
        {
          // 我的积分
          path: 'mypoints',
          component: mypoints,
          name: 'mypoints'
        },
        { // 积分说明
          path: 'pointsDetail',
          component: pointsDetail,
          name: 'pointsDetail'
        }
      ]
    },
    { // 个人中心 一级路由
      path: '/profile',
      component: profile,
      redirect:'/profile/mind',
      name: 'profile',
      children: [ // 二级路由
        {
          // 我的
          path: 'mind',
          component: mind,
          name: 'mind'
        },
        { // 账户信息
          path: 'info',
          component: info,
          name: 'info'
        },
        { // 重置用户名
          path: 'setusername',
          component: setusername,
          name: 'setusername'
        },
        { // 地址
          path: 'address',
          component: address,
          name: 'address',
          children: [ // 三级路由
            { // 新增地址
              path: 'add',
              component: add,
              name: 'add',
              children: [ // 四级路由
                { // 搜索地址
                  path: 'addDetail'
                }
              ]
            }
          ]
        }
      ]
    },
    { // 搜索页 // 一级路由
      path: '/search',
      component: search,
      name: 'search'
    },
    { // 服务中心 一级路由
      path: '/service',
      component: service,
      name: 'service',
      children: [ // 二级路由
        { // 问题详情
          path: 'questionDetail',
          component: questionDetail,
          name: 'questionDetail'
        }
      ]
    },
    { // 商品筛选页 一级路由
      path: '/shop',
      component: shop,
      name: 'shop',
      children: [ // 二级路由
        { // 商铺信息页
          path: 'foodDetail',
          component: foodDetail,
          name: 'foodDetail'
        },
        { // 单个商铺信息页
          path: 'shopDetail',
          component: shopDetail,
          name: 'shopDetail',
          children: [ // 三级路由
            { // 商铺认证信息页
              path: 'shopSafe',
              component: shopSafe,
              name: 'shopSafe'
            }
          ]
        }
      ]
    },
    { // 会员卡办理 一级路由
      path: '/vipcard',
      component: vipcard,
      name: 'vipcard',
      children: [ // 二级路由
        { // 购买记录
          path: 'invoiceRecord',
          component: invoiceRecord,
          name: 'invoiceRecord'
        },
        { // 使用卡号购买
          path: 'useCart',
          component: useCart,
          name: 'useCart'
        },
        { // 会员说明
          path: 'vipDescription',
          component: vipDescription,
          name: 'vipDescription'
        }
      ]
    }
  ]
})
