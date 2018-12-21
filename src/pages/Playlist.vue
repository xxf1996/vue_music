<template>
    <section class="playlist">
        <ListDetail :list="list" :cover="cover">
            <section class="info" slot="info">
                <section class="cover">
                    <img class="cover-img" :src="info.coverImgUrl" :alt="info.name">
                    <p class="cover-text">
                        <Icon type="22" size="16px" />
                        {{count}}
                    </p>
                </section>
                <section class="about">
                    <p class="about-title">{{info.name}}</p>
                    <p class="about-author">{{nickname}}<Icon type="25" size="12px"/></p>
                </section>
            </section>
        </ListDetail>
    </section>
</template>

<script>
import ListDetail from '../components/ListDetail'
import Num from '../util/num'

/**
 * 歌单详情页，根据路由id动态获取内容
 */
export default {
    name: 'Playlist',
    components: {
        ListDetail
    },
    data() {
        return {
            info: {}
        }
    },
    computed: {
        cover() {
            return this.info.coverImgUrl
        },
        count() {
            return Num.short(this.info.playCount || 0)
        },
        list() {
            return this.info.tracks || []
        },
        nickname() {
            return (this.info.creator || {}).nickname
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
</style>