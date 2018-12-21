<template>
    <section class="comment">
        <section class="target" @click="toTarget">
            <img class="cover" :src="cover" :alt="cover">
            <section class="info">
                <p class="title">{{title}}</p>
                <p class="singer">{{singer}}</p>
            </section>
            <Icon class="mark" type="25" size="20rem" />
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
            count: 0
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
            switch(this.type) {
                case 'song':
                    break;
                case 'album':
                    break;
                default:
                    break;
            }
        }
    },
    created() {
        if(this.type) {
            //debugger
            if(this.songInfo.id && this.type === 'song' && this.id == this.songInfo.id){ // 判断是否为当前播放歌曲，避免重新请求数据
                this.getInfo(this.songInfo)
            }else{
                switch(this.type) {
                    case 'song':
                        this.$req('/song/detail', {
                            ids: this.id
                        }).then(res => {
                            if(res.data.code === 200) {
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

<style scoped>
    .comment{
        background-color: #fff;
    }
    .target{
        box-sizing: border-box;
        height: 60rem;
        padding: 5rem;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    }
    .cover{
        width: 50rem;
        height: 50rem;
        border-radius: 5rem;
        margin-right: 5rem;
    }
    .mark{
        color: #999;
    }
    .info{
        flex: 1;
    }
    .title{
        margin: 0;
        padding: 0 5rem;
    }
    .singer{
        margin: 0;
        padding: 0 5rem;
        font-size: 12px;
        color: #36f;
    }
    .tip{
        margin: 0;
        padding: 2rem 5rem;
        background-color: #eee;
        font-size: 12px;
    }
    .comment-container{
        box-sizing: border-box;
        padding: 3rem 0;
    }
    .comment-item{
        margin-bottom: 5rem;
    }
</style>