<template>
    <div class="cmt-container">
        <h3>评论子组件</h3>
        <hr>
        <textarea maxlength="120" placeholder="请输入内容（最多120字）" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发布评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name}}&nbsp;&nbsp;发布时间：{{ item.add_time | dataFormat}}
                </div>
                <div class="cmt-body">
                    {{ item.content === 'undefined' ? '此用户很懒' : item.content }}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    import { Toast } from "mint-ui"
    export default {
        name: "comments",
        data(){
            return{
                pageIndex:1, //，默认展示第一行数据
                comments: []  ,//所有评论数据
                msg:""
            };
        },
        created() {
            this.getComments()
        },
        methods:{
            getComments(){
                this.$http
                    .get("api/getcomments/" + this.id + "?pageindex=" +this.pageIndex)
                    .then(result =>{
                        //console.log(result)
                        if(result.body.status === 0){
                            //this.comments = result.body.message;
                            //每当获取新数据，应在老数据后添加
                            this.comments = this.comments.concat(result.body.message)
                        }else{
                            Toast("获取评论失败！");
                    }
                })
            },
            getMore(){
                this.pageIndex++;
                this.getComments();
            },
            postComment(){
                if(this.msg.trim().length === 0){
                    return Toast("评论内容不能为空！")
                }
                this.$http
                    .post("api/postcomment/" + this.$route.params.id,{
                        content:this.msg.trim()
                    })
                    .then(function (result) {
                        if(result.body.status === 0){
                            var cmt = {
                                user_naem:"匿名用户",
                                add_time:Date.now(),
                                content:this.msg.trim()
                            }
                            this.comments.unshift(cmt);
                            this.msg = ""
                        }
                    })
            }
        },
        props: ["id"]
    }
</script>

<style lang="scss" scoped>
.cmt-container{
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list{
        .cmt-item{
            font-size: 13px;
            .cmt-title{
                line-height: 30px;
                background-color: #ccc;
            }
            .cmt-body{
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
}
</style>