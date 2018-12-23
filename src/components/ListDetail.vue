<template>
    <section class="detail">
        <div class="bg" :style="bg"></div>
        <section v-if="loading" class="loading">Loading...</section>
        <section v-else class="show">
            <section class="info-container">
                <slot name="info"></slot>
            </section>
            <section class="func">
                <section class="func-group" @click="toComment">
                    <Icon type="26" :size="setRem(20)" />
                    <p class="func-text">评论</p>
                </section>
                <section class="func-group">
                    <Icon type="24" :size="setRem(20)" />
                    <p class="func-text">分享</p>
                </section>
            </section>
            <section class="container">
                <p class="all" @click="play(0)">
                    <section class="all-play">
                        <Icon type="8" :size="setRem(20)" />
                    </section>
                    播放全部
                    <span class="all-count">（共{{list.length}}首）</span>
                </p>
                <section class="content">
                    <PicList :size="setRem(40)" class="list-item" v-for="(item, i) in list" :key="i" @click.native="play(i)">
                        <span class="list-num" slot="cover">{{i + 1}}</span>
                        <p class="list-title text-more" slot="title">
                            {{item.name + (item.tns? `（${item.tns}）`: '')}}
                        </p>
                        <p class="list-info text-more" slot="info">{{singer(item.ar)}} - {{item.al.name}}</p>
                        <Icon slot="after" type="27" :size="setRem(24)" @click.native.stop="toOp(item)" />
                    </PicList>
                </section>
            </section>
        </section>
        <InfoList :show.sync="showOp">
            <p class="op-title text-more" slot="title">歌曲：{{songName}}</p>
            <SongOp :info="songInfo" slot="content" @hide="hideOp" />
        </InfoList>
    </section>
</template>

<script>
import PicList from './PicList'
import InfoList from './InfoList'
import SongOp from './SongOp'

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
        PicList,
        SongOp,
        InfoList
    },
    data() {
        return {
            showOp: false,
            songName: '',
            songInfo: {}
        }
    },
    computed: {
        loading() {
            return !this.list.length
        },
        bg() {
            return {
                'background-image': this.cover? `url(${this.cover})`: null
            }
        }
    },
    methods: {
        play(idx) {
            this.$store.commit('changeList', this.list)
            this.$store.commit('changeCur', idx)
            this.$store.commit('changeBottom', true)
        },
        toComment() {
            this.$router.push(this.comment)
        },
        singer(arr) {
            return arr.map(item => item.name).join(',')
        },
        toOp(info) {
            this.songName = info.name
            this.songInfo = info
            this.showOp = true
        },
        hideOp() {
            this.showOp = false
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
    .list-item{
        margin-bottom: rem(6);
    }
    .list-num{
        font-size: 16px;
        color: #aaa;
    }
    .list-title{
        margin: 0;
        height: rem(20);
        line-height: rem(20);
    }
    .list-info{
        margin: 0;
        height: rem(20);
        line-height: rem(20);
        font-size: 12px;
        color: #aaa;
    }
    .text-more{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .op-title{
        box-sizing: border-box;
        margin: 0;
        padding: 0 rem(5);
        font-size: 12px;
        line-height: rem(40);
    }
</style>