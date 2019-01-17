<template>
    <section id="app" :style="full">
        <Header :title="headTitle" :left="left" :right="right" />
        <section class="main" ref="main">
            <section class="main-scroll" :style="transfromStyle">
                <keep-alive include="Index">
                    <router-view class="content"></router-view>
                </keep-alive>
            </section>
        </section>
        <BottomPlayer v-show="showBottom" :song="song" :list="list" />
    </section>
</template>

<script>
import Header from './components/Header'
import BottomPlayer from './components/BottomPlayer'
import BScroll from 'better-scroll'
import {initTap} from './util/tap'

export default {
    name: 'App',
    data() {
        return {
            full: {
                height: 0
            },
            scroller: {}
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
        },
        transfromStyle() {
            return this.$store.getters.transfromStyle
        }
    },
    components: {
        Header,
        BottomPlayer
    },
    methods: {
        rem(num = 10) { // num代表将屏幕宽度分为多少份rem
            document.documentElement.style.fontSize = document.documentElement.clientWidth / num + 'px'
        }
    },
    created() {
        // rem适配设置
        this.full.height = window.innerHeight + 'px'
        this.rem()
        window.addEventListener('resize', () => {
            this.full.height = window.innerHeight + 'px'
            this.rem()
        })

        if(this.$store.state.isVisitor) { // 判断是否为游客模式
            
        }else if(this.$store.state.uid === null){ // 判断之前是否『登录』过
            let uid = localStorage.getItem('X_uid')
            if(uid){
                this.$store.commit('changeUser', uid)
                this.$req('/user/detail', {
                    uid
                }).then(res => {
                    if(res.data.code === 200){
                        this.$store.commit('changeInfo', res.data)
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
            this.$store.dispatch('toggleSong', 1) // 自动播放下一曲
        })

        let AudioContext = window.AudioContext || window.webkitAudioContext
        let ctx = new AudioContext()
        let source = ctx.createMediaElementSource(this.$player)
        let analyser = ctx.createAnalyser()
        source.connect(analyser)
        analyser.connect(ctx.destination)
        this.$store.commit('changeAnalyser', analyser)
    },
    mounted() {
        initTap()
        setTimeout(() => {
            new BScroll(this.$refs.main, {
                // tap: true,
                bounce: {
                    top: false
                }
            })
        }, 25)
    },
    watch: {
        song(val, old) { // 监听歌曲信息的变化，一旦变化立即请求歌曲的url进行切换
            if(val.id !== old.id) {
                this.$req('/song/url', { // 请求歌曲url
                    id: val.id,
                    br: '128000' // 码率，128K
                }).then(res => {
                    if(res.data.code === 200) {
                        this.$player.src = res.data.data[0].url
                        setTimeout(() => {
                            this.$player.play()
                        }, 500)
                    }
                }).catch(err => {
                    throw err
                })

                this.$req('/lyric', { // 请求歌词信息（包括普通歌词，翻译歌词以及卡拉ok歌词）
                    id: val.id
                }).then(res => {
                    if(res.data.code === 200) {
                        if(res.data.nolyric){
                            this.$store.commit('changeLyric', false)
                        }else{
                            this.$store.commit('changeLyric', res.data.lrc.lyric)
                        }
                    }
                })
            }
        }
    }
}
</script>

<style>
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
