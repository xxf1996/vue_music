<template>
    <section class="comment">
        <section class="target" @tap="toTarget">
            <img class="cover" v-lazy="getPic(cover, 60)" :key="getPic(cover, 60)" :alt="cover">
            <section class="info">
                <p class="title">{{title}}</p>
                <p class="singer">{{singer}}</p>
            </section>
            <Icon class="mark" type="25" :size="setRem(20)" />
        </section>
        <section class="hot" v-if="haveHot">
            <p class="tip">精彩评论</p>
            <section class="comment-container">
                <CommentItem class="comment-item" v-for="(item, i) in hot" :key="i" :info="item"/>
            </section>
        </section>
        <section class="normal">
            <p class="tip">最新评论（{{count}}）</p>
            <section class="comment-container">
                <CommentItem class="comment-item" v-for="(item, i) in comments" :key="i" :info="item"/>
            </section>
        </section>
    </section>
</template>

<script>
import CommentItem from '../components/CommentItem'

/**
 * 评论页，根据路由中meta.type的不同，顶部信息的呈现和交互方式略有不同
 */
export default {
    name: 'comment',
    components: {
        CommentItem
    },
    data() {
        return {
            hot: [],
            comments: [],
            cover: null,
            title: '',
            singer: '',
            count: 0,
            info: {}
        }
    },
    computed: {
        type() {
            return this.$route.meta.type
        },
        id() {
            return this.$route.params.id
        },
        songInfo() {
            return this.$store.getters.songInfo
        },
        haveHot() {
            return !!this.hot.length
        }
    },
    methods: {
        getInfo(data) {
            this.cover = data.al.picUrl
            this.title = data.name
            this.singer = data.ar.map(a => a.name).join(',')
        },
        toTarget() {
            let path = ''

            switch(this.type) {
                case 'song': // 单曲
                    if(this.id != this.songInfo.id) { // 加入至播放列表，并播放进入全屏播放器
                        this.$store.dispatch('playNext', this.info)
                        this.$store.dispatch('toggleSong', 1)
                    }
                    path = '/full'
                    break;
                case 'album': // 专辑
                    path = `/album/${this.id}`
                    break;
                case 'list': // 歌单
                    path = `/playlist/${this.id}`
                    break;
                default:
                    break;
            }
            this.$router.push(path)
        },
        initPage() {
            this.$store.dispatch('setPage', {
                left: '23',
                right: '24',
                title: '评论'
            })
        }
    },
    created() {
        if(this.type) {
            //debugger
            this.initPage()
            if(this.songInfo.id && this.type === 'song' && this.id == this.songInfo.id){ // 判断是否为当前播放歌曲，避免重新请求数据
                this.getInfo(this.songInfo)
            }else{
                switch(this.type) {
                    case 'song':
                        this.$req('/song/detail', {
                            ids: this.id
                        }).then(res => {
                            if(res.data.code === 200) {
                                this.info = res.data.songs[0]
                                this.getInfo(res.data.songs[0])
                            }
                        }) 
                        break;
                    case 'list':
                        this.$req('/playlist/detail', {
                            id: this.id
                        }).then(res => {
                            if(res.data.code === 200) {
                                let info = res.data.playlist
                                this.cover = info.coverImgUrl
                                this.title = info.name
                                this.singer = info.creator.nickname
                            }
                        })
                        break;
                    case 'album':
                        this.$req('/album', {
                            id: this.id
                        }).then(res => {
                            if(res.data.code === 200) {
                                let info = res.data.album
                                this.cover = info.picUrl
                                this.title = info.name
                                this.singer = info.artist.name
                            }
                        })
                    default:
                        break;
                }
            }

            let url = {
                song: '/comment/music',
                album: '/comment/album',
                list: '/comment/playlist'
            }

            this.$req(url[this.type], {
                id: this.id
            }).then(res => {
                if(res.data.code === 200) {
                    this.hot = res.data.hotComments
                    this.comments = res.data.comments
                    this.count = res.data.total
                }
            })
        }else{
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
    .comment{
        background-color: #fff;
    }
    .target{
        box-sizing: border-box;
        height: rem(60);
        padding: rem(5);
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    }
    .cover{
        width: rem(50);
        height: rem(50);
        border-radius: rem(5);
        margin-right: rem(5);
    }
    .mark{
        color: #999;
    }
    .info{
        flex: 1;
    }
    .title{
        margin: 0;
        padding: 0 rem(5);
    }
    .singer{
        margin: 0;
        padding: 0 rem(5);
        font-size: 12px;
        color: #36f;
    }
    .tip{
        margin: 0;
        padding: rem(2) rem(5);
        background-color: #eee;
        font-size: 12px;
    }
    .comment-container{
        box-sizing: border-box;
        padding: rem(3) 0;
    }
    .comment-item{
        margin-bottom: rem(5);
    }
</style>