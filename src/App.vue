<template>
    <section id="app" :style="full">
        <Header :title="headTitle" :left="left" :right="right" />
        <section class="main">
            <keep-alive include="Index">
                <router-view></router-view>
            </keep-alive>
        </section>
        <BottomPlayer v-show="showBottom" :song="song" :list="list" />
    </section>
</template>

<script>
import Header from './components/Header'
import BottomPlayer from './components/BottomPlayer'

export default {
    name: 'App',
    data() {
        return {
            full: {
                height: 0
            }
        }
    },
    computed: {
        left() {
            return this.$store.state.headLeft
        },
        right() {
            return this.$store.state.headRight
        },
        headTitle() {
            return this.$store.state.headTitle
        },
        song() {
            return this.$store.getters.songInfo
        },
        list() {
            return this.$store.state.listInfo
        },
        showBottom() {
            return this.$store.state.showBottom
        },
        curSong() {
            return this.$store.state.curSong
        }
    },
    components: {
        Header,
        BottomPlayer
    },
    methods: {
        rem(size = 375) {
            document.documentElement.style.fontSize = document.documentElement.clientWidth / size + 'px'
        }
    },
    created() {
        // rem适配设置
        this.full.height = window.innerHeight + 'px'
        this.rem()
        window.addEventListener('resize', this.rem)
        // 判断之前是否『登录』过
        if(this.$store.state.uid === null){
            let uid = sessionStorage.getItem('X_uid')
            if(uid){
                this.$store.commit('changeUser', uid)
                this.$req('/user/detail', {
                    uid
                }).then(res => {
                    if(res.data.code === 200){
                        this.$store.commit('changeInfo', res.data.profile)
                    }
                }).catch(err => {
                    throw err
                })
            }else{
                this.$router.push({name: 'login'})
            }
        }
        this.$player.addEventListener('playing', () => {
            this.$store.commit('changePlaying', true)
        })
        this.$player.addEventListener('pause', () => {
            this.$store.commit('changePlaying', false)
        })
        this.$player.addEventListener('ended', () => { // audio播放结束事件
            let next = this.curSong
            let len = this.list.length

            switch(this.$store.state.playMode) { // 自动播放模式
                case 'loop':
                    next = (next + 1) % len
                    break;
                default:
                    break;
            }

            if(next !== this.curSong){
                this.$store.commit('changeCur', next)
            }
        })

        let AudioContext = window.AudioContext || window.webkitAudioContext
        let ctx = new AudioContext()
        let source = ctx.createMediaElementSource(this.$player)
        let analyser = ctx.createAnalyser()
        source.connect(analyser)
        analyser.connect(ctx.destination)
        this.$store.commit('changeAnalyser', analyser)
    },
    watch: {
        song(val, old) { // 监听歌曲信息的变化，一旦变化立即请求歌曲的url进行切换
            this.$req('/song/url', { // 请求歌曲url
                id: val.id,
                br: '128000' // 码率，128K
            }).then(res => {
                if(res.data.code === 200) {
                    this.$player.src = res.data.data[0].url
                    this.$player.play()
                }
            }).catch(err => {
                throw err
            })

            this.$req('/lyric', { // 请求歌词信息（包括普通歌词，翻译歌词以及卡拉ok歌词）
                id: val.id
            }).then(res => {
                if(res.data.code === 200) {
                    this.$store.commit('changeLyric', res.data.lrc.lyric)
                }
            })
        }
    }
}
</script>

<style>
    body{
        margin: 0;
        padding: 0;
        font-size: 14px;
    }
    #app{
        display: flex;
        flex-flow: column nowrap;
    }
    .main{
        flex: 1;
        overflow-x: hidden;
        overflow-y: auto;
    }
    #player{
        display: none;
    }
</style>
