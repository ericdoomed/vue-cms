

import Vue from 'vue'

import VueRouter from "vue-router"
Vue.use(VueRouter)

import Vuex from 'vuex'
Vue.use(Vuex)

//每次进入网站  读取localstorage 的购物车内容
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
    state: { // this.$store.state.***
        car: car  //购物车，存一些商品对象{ id、count,价格，selected}
    },
    mutations: { //this.$store.commit('方法名称','按需传递唯一参数')
        addToCar(state,goodsinfo){
            //分析：1.购物车已有商品，更新   2.没有， push

            //假设新添加
            var flag = false

            state.car.some(item => {
                if(item.id == goodsinfo.id){
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            })
            if(!flag){
                state.car.push(goodsinfo)
            }

            //更新之后把car数组，存储到 本地 localstorage 中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsInfo(state,goodsinfo){
            // 修改购物车中商品数量
            state.car.some(item => {
                if(item.id == goodsinfo.id){
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            //修改完商品数量后保存本地
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        removeFromCar(state,id){
            //根据Id 从store 中购物车删除
            state.car.some((item,i) => {
                if(item.id == id){
                    state.car.splice(i,1)
                    console.log('ok')
                    return true;
                }
            })
            //删除完毕 商品数据后保存本地
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsSelected(state,info){
            state.car.some(item =>{
                if(item.id == info.id){
                    item.selected = info.selected
                }
            })
            //修改完商品状态后保存本地
            localStorage.setItem('car',JSON.stringify(state.car))
        }
    },
    getters: { //this.$store.getters.***
        //相当于计算属性，或者filters
        getAllCount(state){
            var c = 0;
            state.car.forEach(item =>{
                c += item.count
            })
            return c
        },
        getGoodsCount(state){
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o
        },
        getGoodsSelected(state){
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndMount(state){
            var o ={
                count:0,  //勾选数量
                amount:0  //勾选总价
            }
            state.car.forEach(item =>{
                if(item.selected){
                    o.count += item.count
                    o.amount += item.price * item.count
                }
            })
            return o
        }
    }
})

import moment from 'moment'
//定义全局过滤器 cnpm i moment -S
Vue.filter('dataFormat',function (dataStr,pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})

import VueResource from 'vue-resource'
Vue.use(VueResource)
//设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
//全局设置 post 时候表单数据格式组织形式
Vue.http.options.emulateJSON = true

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import  './lib/css/global.css'

/*import { Header,Swipe,SwipeItem,Button,Lazyload } from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name,Swipe)
Vue.component(SwipeItem.name,SwipeItem)
Vue.component(Button.name,Button)
Vue.use(Lazyload)*/
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

//图片预览
import VuePreview from 'vue-preview'
// defalut install
Vue.use(VuePreview)

import router from './router.js'
import app from './App.vue'

var vm = new Vue({
    el:'#app',
    render: c => c(app),
    router,
    store
})