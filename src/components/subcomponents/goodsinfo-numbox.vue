<template>
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
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
            console.log(this.max);
        },
        methods:{
            countChanged(){
                //console.log(this.$refs.numbox.value)
                this.$emit("getcount",parseInt(this.$refs.numbox.value));
            }
        },
        props: ["max"],
        watch:{
            max: function (newVal,oldVal) {
                //console.log(`"222" + ${newVal} : ${oldVal}`);
                mui(".mui-numbox")
                    .numbox()
                    .setOption('max',newVal);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>