import VueRouter from 'vue-router'

import HomeContainer from "./components/tabbar/HomeContainer.vue";
import MemberContainer from "./components/tabbar/MemberContainer.vue";
import SearchContainer from "./components/tabbar/SearchContainer.vue";
import ShoppingCartContainer from "./components/tabbar/ShoppingCartContainer.vue";
import NewsList from "./components/news/NewsList.vue";
import NewsInfo from "./components/news/NewsInfo.vue";
import PhotoList from "./components/photos/PhotoList.vue";
import PhotoInfo from "./components/photos/PhotoInfo.vue";
import GoodsList from "./components/goods/GoodsList.vue";
import GoodsInfo from "./components/goods/GoodsInfo.vue";
import GoodsComment from "./components/goods/GoodsComment.vue";
import GoodsDesc from "./components/goods/GoodsDesc.vue";
// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    {path:'/',redirect:'/home'},
    {path:'/home',component:HomeContainer},
    {path:'/member',component:MemberContainer},
    {path:'/search',component:SearchContainer},
    {path:'/shoppingCart',component:ShoppingCartContainer},
    {path:'/home/newsList',component:NewsList},
    {path:'/home/newsInfo/:id',component:NewsInfo},
    {path:'/home/photolist',component:PhotoList},
    {path:'/home/photoinfo/:id',component:PhotoInfo},
    {path:'/home/goodslist',component:GoodsList},
    {path:'/home/goodsinfo/:id',component:GoodsInfo,name:'goodsinfo'},
    {path:'/home/goodscomment/:id',component:GoodsComment,name:'goodscomment'},
    {path:'/home/goodsdesc/:id',component:GoodsDesc,name:'goodsdesc'}
  ],
  linkActiveClass:'mui-active'
})

// 把路由对象暴露出去
export default router