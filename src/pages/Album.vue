<template>
    <section class="album">
        <ListDetail :list="list" :cover="cover" :comment="`/comment/album/${info.id}`">
            <section class="info" slot="info">
                <section class="cover">
                    <img class="cover-img" :src="getPic(cover)" :alt="info.name">
                </section>
                <section class="about">
                    <p class="about-title">{{info.name}}</p>
                    <p class="about-author" @click.stop="toSinger">歌手：{{nickname}}<Icon type="25" size="12px"/></p>
                    <p class="about-date">发行时间：{{publish}}</p>
                </section>
            </section>
        </ListDetail>
    </section>
</template>

<script>
import ListDetail from '../components/ListDetail'
import Num from '../util/num'
import dayjs from 'dayjs'

/**
 * 专辑详情页，根据路由id动态获取内容
 */
export default {
    name: 'Playlist',
    components: {
        ListDetail
    },
    data() {
        return {
            info: {},
            list: []
        }
    },
    computed: {
        id() {
            return this.$route.params.id
        },
        cover() {
            return this.info.picUrl
        },
        nickname() {
            return (this.info.artist || {}).name
        },
        publish() {
            return dayjs(this.info.publishTime || 0).format('YYYY.M.D')
        },
        pageInfo() {
            return {
                left: '23',
                right: '15',
                title: `专辑：${this.info.name}`
            }
        }
    },
    methods: {
        singer(arr) {
            return arr.map(item => item.name).join(',')
        },
        initPage() {
            this.$store.dispatch('setPage', this.pageInfo)
        },
        toSinger() {
            this.$router.push(`/singer/${this.info.artist.id}`)
        }
    },
    created() {
        this.initPage()
        this.$req('/album', {
            id: this.id
        }).then(res => {
            if(res.data.code === 200){
                this.info = res.data.album
                this.list = res.data.songs
            }
        }).catch(err => {
            throw err
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
    .album{
        position: relative;
    }
    .info{
        box-sizing: border-box;
        display: flex;
        flex-flow: row nowrap;
        height: rem(120);
        padding: rem(10);
        color: #fff;
    }
    .cover{
        position: relative;
        width: rem(100);
        height: rem(100);
    }
    .cover-img{
        width: 100%;
        height: 100%;
    }
    .about{
        flex: 1;
        margin-left: rem(10);
        height: 100%;
    }
    .about-title{
        font-size: 16px;
        margin: rem(6) 0;
    }
    .about-author, .about-date{
        font-size: 12px;
        margin: rem(3) 0;
        color: #eee;
    }
</style>