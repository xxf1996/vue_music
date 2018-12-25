<template>
    <section class="album">
        <ListDetail :list="list" :cover="cover" :comment="`/comment/album/${info.id}`">
            <section class="info" slot="info">
                <section class="cover">
                    <img class="cover-img" :src="cover" :alt="info.name">
                </section>
                <section class="about">
                    <p class="about-title">{{info.name}}</p>
                    <p class="about-author">歌手：{{nickname}}<Icon type="25" size="12px"/></p>
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
        cover() {
            return this.info.picUrl
        },
        nickname() {
            return (this.info.artist || {}).name
        },
        publish() {
            return dayjs(this.info.publishTime || 0).format('YYYY.M.D')
        }
    },
    methods: {
        singer(arr) {
            return arr.map(item => item.name).join(',')
        }
    },
    created() {
        this.$store.commit('changeTitle', '歌单')
        this.$store.commit('changeLeft', 23)
        this.$req('/album', {
            id: this.$route.params.id
        }).then(res => {
            if(res.data.code === 200){
                this.info = res.data.album
                this.list = res.data.songs
            }
        }).catch(err => {
            throw err
        })
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