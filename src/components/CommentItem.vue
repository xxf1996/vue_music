<template>
    <section class="item">
        <section class="cover">
            <img class="cover-img" :src="info.user.avatarUrl" :alt="info.user.nickname">
        </section>
        <section class="info">
            <section class="user">
                <div class="user-info">
                    <p class="name">{{info.user.nickname}}</p>
                    <p class="date">{{postDate}}</p>
                </div>
                <div class="user-like">
                    {{info.likedCount}}
                    <Icon type="28" size="16rem" />
                </div>
            </section>
            <p class="content">{{info.content}}</p>
            <p class="reply" v-if="isReply">
                <span class="at">@{{reply[0].user.nickname}}：</span>
                {{reply[0].content}}
            </p>
        </section>
    </section>
</template>

<script>
import Num from '../util/num'

export default {
    name: 'CommentItem',
    props: ['info'],
    computed: {
        postDate() {
            return Num.date(this.info.time)
        },
        reply() {
            return this.info.beReplied
        },
        isReply() {
            return !!this.reply.length
        }
    }
}
</script>

<style scoped>
    .item{
        display: flex;
        flex-flow: row nowrap;
    }
    .cover-img{
        width: 30rem;
        height: 30rem;
        border-radius: 50%;
        margin: 0 5rem;
    }
    .info{
        flex: 1;
        border-bottom: 1px solid #ddd;
    }
    .user{
        box-sizing: border-box;
        height: 30rem;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    }
    .user-info{
        flex: 1;
    }
    .name{
        margin: 0;
        line-height: 18rem;
        font-size: 11px;
    }
    .date{
        margin: 0;
        line-height: 12rem;
        font-size: 10px;
        color: #aaa;
    }
    .user-like{
        display: inline-block;
        font-size: 12px;
        padding: 0 5rem;
        color: #aaa;
    }
    .content{
        margin: 0;
        padding: 8rem 0;
        font-size: 13px;
    }
    .reply{
        box-sizing: border-box;
        margin: 5rem 5rem 5rem 0;
        padding: 5rem;
        background-color: #fcfcfc;
        color: #aaa;
        font-size: 13px;
        border: 1px solid #eee;
        border-radius: 3rem;
    }
    .at{
        color: #36f;
    }
</style>