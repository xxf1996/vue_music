<template>
    <section class="detail">
        <div class="bg" :style="bg"></div>
        <section v-if="loading" class="loading">Loading...</section>
        <section v-else class="show">
            <section class="info-container">
                <slot name="info"></slot>
            </section>
            <section class="func">
                <section class="func-group" @tap="toComment">
                    <Icon type="26" :size="setRem(20)" />
                    <p class="func-text">评论</p>
                </section>
                <section class="func-group">
                    <Icon type="24" :size="setRem(20)" />
                    <p class="func-text">分享</p>
                </section>
            </section>
            <section class="container">
                <p class="all" @tap="play(0)">
                    <section class="all-play">
                        <Icon type="8" :size="setRem(20)" />
                    </section>
                    播放全部
                    <span class="all-count">（共{{list.length}}首）</span>
                </p>
                <SongList class="content" :list="list" />
            </section>
        </section>
    </section>
</template>

<script>
import SongList from './SongList'

/**
 * 歌单或专辑的详情页（头部信息 + 歌曲列表）
 * @prop {Array} list 歌曲列表
 * @prop {String} cover 封面图片地址
 * @prop {String} comment 对应评论的路由
 * @slot info 头部信息内容区域
 */
export default {
    name: 'ListDetail',
    props: ['list', 'cover', 'comment'],
    components: {
        SongList
    },
    data() {
        return {
            showOp: false,
            songInfo: {}
        }
    },
    computed: {
        loading() {
            return !this.list.length
        },
        bg() {
            return {
                'background-image': this.cover? `url(${this.getPic(this.cover, 400)})`: null
            }
        }
    },
    methods: {
        toComment() {
            this.$router.push(this.comment)
        }
    }
}
</script>

<style lang="scss" scoped>
    .detail{
        position: relative;
    }
    .bg{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: rem(200);
        overflow: hidden;
        background-size: cover;
        filter: brightness(0.8) blur(20px);
        z-index: -1;
    }
    .loading{
        height: rem(200);
        line-height: rem(200);
        text-align: center;
    }
    .func{
        display: flex;
        margin: rem(6) 0;
        flex-flow: row nowrap;
        justify-content: space-around;
        color: #fff;
    }
    .func-text{
        font-size: 12px;
        color: #ddd;
        margin: rem(5) 0;
    }
    .container{
        background-color: #fff;
        border-top-left-radius: rem(10);
        border-top-right-radius: rem(10);
        overflow: hidden;
    }
    .all{
        box-sizing: border-box;
        height: rem(40);
        line-height: rem(40);
        margin: 0;
        border-bottom: 1px solid #ddd;
    }
    .all-play{
        display: inline-flex;
        width: rem(40);
        height: rem(40);
        justify-content: center;
        align-items: center;
    }
    .all-count{
        color: #aaa;
    }
</style>