<template>
    <section class="singer">
        <div class="bg" :style="bg"></div>
        <section class="container">
            <section class="tab">
                <mu-tabs :value.sync="cur" class="tab-container" color="transparent" indicator-color="#f5222d" center @change="tabChange">
                    <mu-tab class="tab-item" event="tap">热门歌曲</mu-tab>
                    <mu-tab class="tab-item" event="tap">专辑</mu-tab>
                    <mu-tab class="tab-item" event="tap">歌手信息</mu-tab>
                </mu-tabs>
            </section>
            <section class="content">
                <SongList class="hot" v-show="cur === 0" :list="hot" />
                <Loading v-show="cur === 1 & album.length === 0" />
                <AlbumList class="album" v-show="cur === 1" :list="album" />
                <section class="info" v-show="cur === 2">
                    <p class="info-title">{{artist.name}}简介</p>
                    <p class="info-content">{{artist.briefDesc}}</p>
                    <p class="info-more" v-show="!infoMore" @tap.stop="getMoreInfo">
                        查看更多
                        <Icon type="25" :size="setRem(20)" />
                    </p>
                    <Loading v-show="infoMore && infoList.length === 0" />
                    <div class="info-item" v-for="(info, i) in infoList" :key="i">
                        <p class="info-title">{{info.ti}}</p>
                        <p class="info-content">{{info.txt}}</p>
                    </div>
                </section>
            </section>
        </section>
    </section>
</template>

<script>
/**
 * 歌手详情页，包含热门歌曲，专辑以及歌手信息三部分；
 */
import SongList from '../components/SongList'
import AlbumList from '../components/AlbumList'
import Loading from '../components/Loading'
import {print} from '../util/debug'

export default {
    name: 'Singer',
    components: {
        SongList,
        AlbumList,
        Loading
    },
    data() {
        return {
            cur: 0,
            info: {},
            album: [],
            infoMore: false,
            infoList: []
        }
    },
    computed: {
        id() {
            return this.$route.params.id
        },
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
                'background-image': this.artist.picUrl? `url(${this.getPic(this.artist.picUrl, 400)})`: null
            }
        }
    },
    methods: {
        initPage() {
            this.$store.dispatch('setPage', this.pageInfo)
        },
        tabChange(val) {
            if(val === 1 && this.album.length === 0) {
                this.$req('/artist/album', {
                    id: this.id,
                    limit: 15
                }).then(res => {
                    if(res.data.code === 200) {
                        this.album = res.data.hotAlbums
                    }
                })
            }
        },
        getMoreInfo() {
            this.infoMore = true
            this.$req('/artist/desc', {
                id: this.id
            }).then(res => {
                if(res.data.code === 200) {
                    this.infoList = res.data.introduction
                }
            })
        },
        showTap(e) {
            print(e)
        }
    },
    created() {
        this.initPage()
        this.$req('/artists', {
            id: this.id
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
        margin: rem(10) rem(3);
        padding: 0 rem(2);
        border-left: 2px solid $theme_bg;
    }
    .info-content{
        margin: 0 rem(5);
        color: #666;
        font-size: 12px;
        line-height: 1.5;
        white-space: pre-line;
    }
    .info-more{
        margin: 0;
        padding: rem(10) 0;
        text-align: center;
        color: #aaa;
    }
</style>
