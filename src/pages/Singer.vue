<template>
    <section class="singer">
        <div class="bg" :style="bg"></div>
        <section class="container">
            <section class="tab">
                <mu-tabs :value.sync="cur" class="tab-container" color="transparent" indicator-color="#f5222d" center>
                    <mu-tab class="tab-item">热门歌曲</mu-tab>
                    <mu-tab class="tab-item">专辑</mu-tab>
                    <mu-tab class="tab-item">歌手信息</mu-tab>
                </mu-tabs>
            </section>
            <section class="content">
                <SongList class="hot" v-show="cur === 0" :list="hot" />
                <section class="album" v-show="cur === 1">
                    album
                </section>
                <section class="info" v-show="cur === 2">
                    <p class="info-title">{{artist.name}}简介</p>
                    <p class="info-singer">{{artist.briefDesc}}</p>
                    <p class="info-title">相似歌手</p>
                </section>
            </section>
        </section>
    </section>
</template>

<script>
import SongList from '../components/SongList'

export default {
    name: 'Singer',
    components: {
        SongList
    },
    data() {
        return {
            cur: 0,
            info: {},
            album: []
        }
    },
    computed: {
        hot() {
            return this.info.hotSongs || []
        },
        artist() {
            return this.info.artist || {}
        },
        pageInfo() {
            return {
                left: 23,
                right: 15,
                title: this.artist.name
            }
        },
        bg() {
            return {
                'background-image': this.artist.picUrl? `url(${this.artist.picUrl})`: null
            }
        }
    },
    methods: {
        initPage() {
            this.$store.dispatch('setPage', this.pageInfo)
        }
    },
    created() {
        this.initPage()
        this.$req('/artists', {
            id: this.$route.params.id
        }).then(res => {
            if(res.data.code === 200) {
                this.info = res.data
            }
        })
    },
    watch: {
        pageInfo(val) {
            this.initPage()
        }
    }
}
</script>

<style lang="scss" scoped>
    .singer{
        position: relative;
    }
    .bg{
        height: rem(240);
        background-size: cover;
        z-index: -1;
    }
    .container{
        margin-top: rem(-20);
        border-top-left-radius: rem(10);
        border-top-right-radius: rem(10);
        overflow: hidden;
        background-color: #fff;
    }
    .tab{
        height: rem(40);
        border-bottom: 1px solid #ddd;
    }
    .tab-container{
        height: 100%;
    }
    .tab-item{
        color: #333;
    }
    .info-title{
        margin: rem(10) rem(5);
    }
    .info-singer{
        margin: 0 rem(5);
        color: #666;
        line-height: 1.5;
    }
</style>
