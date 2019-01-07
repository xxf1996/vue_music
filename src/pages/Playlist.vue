<template>
    <section class="playlist">
        <ListDetail :list="list" :cover="cover" :comment="`/comment/list/${info.id}`">
            <section class="info" slot="info">
                <section class="cover">
                    <img class="cover-img" v-lazy="getPic(info.coverImgUrl)" :key="getPic(info.coverImgUrl)" :alt="info.name">
                    <p class="cover-text">
                        <Icon type="22" size="16px" />
                        {{count}}
                    </p>
                </section>
                <section class="about">
                    <p class="about-title">{{info.name}}</p>
                    <p class="about-author" @touchstart.stop="toUser">
                        <img class="about-avatar" v-lazy="getPic(creator.avatarUrl, 20)" :key="getPic(creator.avatarUrl, 20)" alt="author">
                        {{nickname}}
                        <Icon type="25" size="12px"/>
                    </p>
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
        creator() {
            return this.info.creator || {}
        },
        nickname() {
            return this.creator.nickname
        },
        user() {
            return this.creator.userId
        }
    },
    methods: {
        singer(arr) {
            return arr.map(item => item.name).join(',')
        },
        initPage() {
            this.$store.dispatch('setPage', {
                left: '23',
                right: '15',
                title: '歌单'
            })
        },
        toUser() {
            this.$router.push(`/user/${this.user}`)
        }
    },
    created() {
        this.initPage()
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

<style lang="scss" scoped>
    .playlist{
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
    .cover-text{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        margin: 0;
        font-size: 12px;
        text-align: right;
        padding: rem(1);
        background-color: rgba(0, 0, 0, 0.3);
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
    .about-author{
        margin: 0;
        font-size: 12px;
        line-height: rem(25);
    }
    .about-avatar{
        width: rem(20);
        height: rem(20);
        border-radius: 50%;
        margin-right: rem(5);
        vertical-align: middle;
    }
</style>