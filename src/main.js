console.log('OK')

import Vue from 'vue'

import VueRouter from "vue-router"
Vue.use(VueRouter)

import moment from 'moment'
//定义全局过滤器 cnpm i moment -S
Vue.filter('dataFormat',function (dataStr,pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})

import VueResource from 'vue-resource'
Vue.use(VueResource)
//设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

import { Header,Swipe,SwipeItem,Button } from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name,Swipe)
Vue.component(SwipeItem.name,SwipeItem)
Vue.component(Button.name,Button)

import router from './router.js'
import app from './App.vue'

var vm = new Vue({
    el:'#app',
    render: c => c(app),
    router
})