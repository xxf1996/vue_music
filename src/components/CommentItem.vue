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
                    <Icon type="28" :size="setRem(16)" />
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

/**
 * 一条单独的评论（包括回复对象）
 * @prop {Object} info 评论信息
 */
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

<style lang="scss" scoped>
    .item{
        display: flex;
        flex-flow: row nowrap;
    }
    .cover-img{
        width: rem(30);
        height: rem(30);
        border-radius: 50%;
        margin: 0 rem(5);
    }
    .info{
        flex: 1;
        border-bottom: 1px solid #ddd;
    }
    .user{
        box-sizing: border-box;
        height: rem(30);
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    }
    .user-info{
        flex: 1;
    }
    .name{
        margin: 0;
        line-height: rem(18);
        font-size: 11px;
    }
    .date{
        margin: 0;
        line-height: rem(12);
        font-size: 10px;
        color: #aaa;
    }
    .user-like{
        display: inline-block;
        font-size: 12px;
        padding: 0 rem(5);
        color: #aaa;
    }
    .content{
        margin: 0;
        padding: rem(8) 0;
        font-size: 13px;
    }
    .reply{
        box-sizing: border-box;
        margin: rem(5) rem(5) rem(5) 0;
        padding: rem(5);
        background-color: #fcfcfc;
        color: #aaa;
        font-size: 13px;
        border: 1px solid #eee;
        border-radius: rem(3);
    }
    .at{
        color: #36f;
    }
</style>