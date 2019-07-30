<template>
    <!--问题：不知道什么时候能拿到 max 值-->
    <!--可以使用watch 监听父组件-->
    <div class="goodsinfo-container">

        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>

        <!--商品轮播区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <Swiper :lunbotuList="lunbotu" :isfull="false"></Swiper>
                </div>
            </div>
        </div>

        <!--商品购买区域-->
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsinfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{ goodsinfo.sell_price }}</span>
                    </p>
                    <p>购买数量：<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>

        <!--商品参数区域-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ goodsinfo.goods_no }}</p>
                    <p>库存情况：{{ goodsinfo.stock_quantity }}</p>
                    <p>上架时间：{{ goodsinfo.add_time | dataFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
                <!--分析： 加入购物车 1.按钮属于 goodsinfo ，数字属于 numberbox  2.父子组件嵌套，无法直接获取-->
                <!--3.（事件调用机制）-->
            </div>
        </div>

    </div>
</template>

<script>
    import Swiper from "../subcomponents/Swiper.vue";
    import numbox from "../subcomponents/goodsinfo-numbox.vue"
    export default {
        name: "GoodsInfo",
        data(){
            return{
                id: this.$route.params.id,
                lunbotu:[],
                goodsinfo:{},//商品信息
                ballFlag:false, //小球显示隐藏
                selectedCount:1
            };
        },
        created(){
          this.getLunbotu();
          this.getGoodsInfo();
        },
        methods:{
            getLunbotu() {
                this.$http.get("api/getthumimages/" + this.id).then(result => {
                    if(result.body.status === 0){
                        result.body.message.forEach(item => {
                            item.img = item.src;
                        })
                        this.lunbotu = result.body.message;
                    }
                });
            },
            getGoodsInfo(){
                this.$http.get('api/goods/getinfo/' + this.id).then(result => {
                    if(result.body.status === 0){
                        this.goodsinfo = result.body.message[0];
                        //console.log("数量：" + this.goodsinfo.stock_quantity);
                    }
                })
            },
            goDesc(id){
                // 点击使用编程式导航跳转到 图文介绍页面
                this.$router.push({ name: "goodsdesc", params: { id }});   //name里面填path 可以吗？
            },
            goComment(id){
                //点击跳转到 评论页
                this.$router.push({ name: "goodscomment", params: { id }});
            },
            addToShopCar(){
                this.ballFlag = !this.ballFlag;
                //拼接购物车商品
                var goodsinfo = {
                    id: this.id,
                    count: this.selectedCount,
                    price: this.goodsinfo.sell_price,
                    selected: true
                };
                //调用 store 中的 mutations 来将商品加入购物车
                this.$store.commit("addToCar",goodsinfo);
            },
            beforeEnter(el){
                el.style.transform = "translate(0,0)";
            },
            enter(el,done){
                el.offsetWidth;

                //小球动画分析：1。位置写死，局限于固定分辨率 2.换设备或滚动会出错 3.因此不能固定横纵坐标
                //4.结论 先得到 徽标 的横纵坐标，再得到小球 坐标 ；求差 就是位移距离
                //5.如何获取徽标、小球坐标？ domObject.getBoundingClientRect()

                //获取小球位置
                const ballPosition = this.$refs.ball.getBoundingClientRect();
                //获取徽标位置
                const badgePosition = document.getElementById("badge").getBoundingClientRect();

                const xDist = badgePosition.left - ballPosition.left;
                const yDist = badgePosition.top - ballPosition.top;

                el.style.transform = `translate(${xDist}px,${yDist}px)`;
                el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
                done();
            },
            afterEnter(el){
                this.ballFlag  = !this.ballFlag;
            },
            getSelectedCount(count){
                this.selectedCount = count;
                console.log('父组件拿到的数量值为：' + this.selectedCount)
            }
        },
        components:{
            Swiper,
            numbox
        }
    }
</script>

<style lang="scss" scoped>
.goodsinfo-container{
    background-color: #eee;
    overflow: hidden;

    .now_price{
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
    .mui-card-footer{
        display: block;
        button{
            margin: 15px 0;
        }
    }
    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        top: 410px;
        left: 146px;
    }
}
</style>