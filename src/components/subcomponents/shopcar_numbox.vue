<template>
    <div class="mui-numbox" data-numbox-min='1' style="height: 25px;">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numbox"
        readonly/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>

    <!--子组件什么时候传值给父组件-->
</template>

<script>
    import mui from "../../lib/mui/js/mui.min.js"
    export default {
        //初始化数组选择框，否则开始+1无效
        mounted() {
            mui(".mui-numbox").numbox();
            //console.log(this.max);
        },
        methods:{
            countChanged(){
                //每当数量改变，同步到购物车 store
                this.$store.commit("updateGoodsInfo",{
                    id: this.goodsid,
                    count: this.$refs.numbox.value
                })
            }
        },
        props:["initcount","goodsid"]
    }
</script>

<style lang="scss" scoped>

</style>