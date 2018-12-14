<template>
    <section class="playlist">
        <div class="bg" :style="bg"></div>
        <section v-if="loading" class="loading">Loading...</section>
        <section v-else class="show">
            <section class="info">
                <section class="cover">
                    <img class="cover-img" :src="info.coverImgUrl" :alt="info.name">
                    <p class="cover-text">{{info.playCount}} 次</p>
                </section>
                <section class="about">
                    <p class="about-title">{{info.name}}</p>
                    <p class="about-author">{{info.creator.nickname}}<Icon type="25" size="12px"/></p>
                </section>
            </section>
            <section class="func">
                <section class="func-group">
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
                    <span class="all-count">（共{{info.trackCount}}首）</span>
                </p>
                <section class="content">
                    <PicList size="40rem" class="list-item" v-for="(item, i) in info.tracks" :key="i" @click.native="play(i)">
                        <span class="list-num" slot="cover">{{i + 1}}</span>
                        <p class="list-title text-more" slot="title">{{item.name + (item.tns? `（${item.tns}）`: '')}}</p>
                        <p class="list-info text-more" slot="info">{{singer(item.ar)}} - {{item.al.name}}</p>
                    </PicList>
                </section>
            </section>
        </section>
    </section>
</template>

<script>
import PicList from '../components/PicList'

export default {
    name: 'Playlist',
    components: {
        PicList
    },
    data() {
        return {
            info: {}
        }
    },
    computed: {
        loading() {
            return !this.info.name
        },
        bg() {
            return {
                'background-image': this.info.coverImgUrl? `url(${this.info.coverImgUrl})`: null
            }
        }
    },
    methods: {
        singer(arr) {
            return arr.map(item => item.name).join(',')
        },
        play(idx) {
            this.$store.commit('changeList', this.info.tracks)
            this.$store.commit('changeCur', idx)
            this.$store.commit('changeBottom', true)
        }
    },
    created() {
        this.$store.commit('changeTitle', '歌单')
        this.$store.commit('changeLeft', 23)
        this.$req('/playlist/detail', {
            id: this.$route.params.id
        }).then(res => {
            if(res.data.code === 200){
                this.info = res.data.playlist
            }
        }).catch(err => {
            throw err
        })
    }
}
</script>

<style scoped>
    .playlist{
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
        filter: brightness(0.8) blur(20px);;
        z-index: -1;
    }
    .loading{
        height: 200rem;
        line-height: 200rem;
        text-align: center;
    }
    .info{
        box-sizing: border-box;
        display: flex;
        flex-flow: row nowrap;
        height: 120rem;
        padding: 10rem;
        color: #fff;
    }
    .cover{
        position: relative;
        width: 100rem;
        height: 100rem;
    }
    .cover-img{
        width: 100%;
        height: 100%;
    }
    .cover-text{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        margin: 0;
        font-size: 12px;
        text-align: right;
        padding: 1rem;
        background-color: rgba(0, 0, 0, 0.3);
    }
    .about{
        flex: 1;
        margin-left: 10rem;
        height: 100%;
    }
    .about-title{
        font-size: 16px;
        margin: 6rem 0;
    }
    .about-author{
        font-size: 12px;
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