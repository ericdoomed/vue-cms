<template>
    <div>
        <comments :id="$route.params.id"></comments>
    </div>
</template>

<script>
    import comments from "../subcomponents/comments.vue";
    export default {
        name: "GoodsComment",
        components:{
            comments
        }
    }
</script>

<style lang="scss" scoped>

</style>