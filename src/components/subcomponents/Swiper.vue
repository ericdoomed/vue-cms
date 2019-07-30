<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunbotuList" :key="item.img">
                <img :src="item.img" alt="" :class="{full:isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>

    <!--分析 ： 商品评论的轮播图应该为高度100% 宽度自适应-->
</template>

<script>
    export default {
        name: "Swiper",
        props:["lunbotuList","isfull"]
    }
</script>

<style lang="scss" scoped>
    .mint-swipe{
        height: 200px;
        .mint-swipe-item{
            text-align: center;
            img{
                //width: 100%;
                height: 100%;
            }
        }
    }
    .full{
        width: 100%;
    }
</style>