import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const changeState = (prop) => (state, val) => state[prop] = val

export default new Vuex.Store({
    state: {
        uid: null, // 250099360，网易云音乐账号id
        isVisitor: false, // 是否为游客模式
        userInfo: {}, // 当前用户信息
        headLeft: '4', // header的左边图标type
        headRight: '15', // header的右边图标type
        headTitle: '网易云音乐', // header标题
        headBg: null, // header背景色
        showBottom: false, // 是否显示底部小播放器
        curSong: 0, // 当前播放歌曲在播放列表中的索引
        listInfo: [], // 当前播放列表信息 
        playing: false, // 是否正在播放
        playMode: 'loop', // 列表的播放模式，loop为列表循环
        analyser: {}, // Audio api的音频分析器结点
        lyric: '', // 普通歌词文本
        infoList: false, // InfoList组件的显示与否
        showAudio: false, // 是否显示音乐频谱
        clearTransform: false, // 消除better-scroll对容器设置的transform属性（对容器内fixed布局有影响）
    },
    mutations: {
        changeUser(state, id) {
            state.uid = id
        },
        changeInfo(state, info) {
            state.userInfo = info
        },
        changeTitle(state, title) {
            state.headTitle = title
        },
        changeLeft(state, n) {
            state.headLeft = n
        },
        changeRight(state, n) {
            state.headRight = n
        },
        changeList(state, list) {
            state.listInfo = list
        },
        changeCur(state, n) {
            state.curSong = n
        },
        changeBottom(state, flag) {
            state.showBottom = flag
        },
        changePlaying(state, flag) {
            state.playing = flag
        },
        changeAnalyser(state, val) {
            state.analyser = val
        },
        changeBg(state, val) {
            state.headBg = val
        },
        changeLyric(state, val) {
            state.lyric = val
        },
        setInfoList(state, val) {
            state.infoList = val
        },
        changeAudio(state, val) {
            state.showAudio = val
        },
        changeClear(state, val) {
            state.clearTransform = val
        },
        changeVisitor(state, val) {
            state.isVisitor = val
        }
    },
    getters: {
        songInfo(state) { // 正在播放的歌曲信息
            return state.listInfo[state.curSong] || {}
        },
        listKey(state) { // 歌曲列表的id组成的set
            return new Set(state.listInfo.map(item => item.id))
        },
        transfromStyle(state) {
            return {
                'transform': state.clearTransform? 'none': 'translate(0px, 0px) scale(1) translateZ(0px)'
            }
        }
    },
    actions: {
        playNext(ctx, info) { // 将该歌曲设置为下一首播放
            let key = ctx.getters.listKey
            let {listInfo, curSong} = ctx.state

            if(key.has(info.id)) { // 加入的歌曲是否已存在与当前播放列表中

            }else{
                let arr = []
                if(listInfo.length === 0) { // 没有播放列表时
                    arr.push(info)
                    ctx.commit('changeBottom', true)
                }else{
                    if(curSong === listInfo.length - 1) {
                        arr = [...listInfo, info]
                    }else{
                        arr = [...listInfo.slice(0, curSong + 1), info, ...listInfo.slice(curSong + 1)]
                    }
                }
                ctx.commit('changeList', arr)
            }
        },
        /**
         * 切换当前播放列表中的歌曲，上一曲或下一曲
         * @param {$store} ctx vuex的store对象 
         * @param {Number} d  切换的变化量（索引）
         */
        toggleSong(ctx, d) {
            let cur = ctx.state.curSong
            let next = cur
            let len = ctx.state.listInfo.length

            switch(ctx.state.playMode) { // 播放模式
                case 'loop': // 列表循环
                    next = (len + cur + d) % len
                    break;
                default:
                    break;
            }

            if(next !== cur) {
                ctx.commit('changeCur', next)
            }
        },
        setPage(ctx, info) {
            let {left = 23, right = 15, title = ''} = info
            ctx.commit('changeLeft', left)
            ctx.commit('changeRight', right)
            ctx.commit('changeTitle', title)
        }
    }
})