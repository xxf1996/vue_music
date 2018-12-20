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
                    <Icon type="26" size="20rem" />
                    <p class="func-text">评论</p>
                </section>
                <section class="func-group">
                    <Icon type="24" size="20rem" />
                    <p class="func-text">分享</p>
                </section>
            </section>
            <section class="container">
                <p class="all" @click="play(0)">
                    <section class="all-play">
                        <Icon type="8" size="20rem" />
                    </section>
                    播放全部
                    <span class="all-count">（共{{list.length}}首）</span>
                </p>
                <section class="content">
                    <PicList size="40rem" class="list-item" v-for="(item, i) in list" :key="i" @click.native="play(i)">
                        <span class="list-num" slot="cover">{{i + 1}}</span>
                        <p class="list-title text-more" slot="title">
                            {{item.name + (item.tns? `（${item.tns}）`: '')}}
                        </p>
                        <p class="list-info text-more" slot="info">{{singer(item.ar)}} - {{item.al.name}}</p>
                        <Icon slot="after" type="27" size="24rem" />
                    </PicList>
                </section>
            </section>
        </section>
    </section>
</template>

<script>
import PicList from './PicList'

export default {
    name: 'ListDetail',
    props: ['list', 'cover'],
    components: {
        PicList
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
            this.$router.push(`/comment/list/${this.info.id}`)
        },
        singer(arr) {
            return arr.map(item => item.name).join(',')
        }
    }
}
</script>

<style scoped>
    .detail{
        position: relative;
    }
    .bg{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 200rem;
        overflow: hidden;
        background-size: cover;
        filter: brightness(0.8) blur(20px);
        z-index: -1;
    }
    .loading{
        height: 200rem;
        line-height: 200rem;
        text-align: center;
    }
    .func{
        display: flex;
        margin: 6rem 0;
        flex-flow: row nowrap;
        justify-content: space-around;
        color: #fff;
    }
    .func-text{
        font-size: 12px;
        color: #ddd;
        margin: 5rem 0;
    }
    .container{
        background-color: #fff;
        border-top-left-radius: 10rem;
        border-top-right-radius: 10rem;
        overflow: hidden;
    }
    .all{
        box-sizing: border-box;
        height: 40rem;
        line-height: 40rem;
        margin: 0;
        border-bottom: 1px solid #ddd;
    }
    .all-play{
        display: inline-flex;
        width: 40rem;
        height: 40rem;
        justify-content: center;
        align-items: center;
    }
    .all-count{
        color: #aaa;
    }
    .list-item{
        margin-bottom: 6rem;
    }
    .list-num{
        font-size: 16px;
        color: #aaa;
    }
    .list-title{
        margin: 0;
        height: 20rem;
        line-height: 20rem;
    }
    .list-info{
        margin: 0;
        height: 20rem;
        line-height: 20rem;
        font-size: 12px;
        color: #aaa;
    }
    .text-more{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
</style>