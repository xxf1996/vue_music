import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const changeState = (prop) => (state, val) => state[prop] = val

export default new Vuex.Store({
    state: {
        // api: 'http://tx.xiexuefeng.cc:3000/music',
        uid: null, // 250099360，网易云音乐账号id
        userInfo: {}, // 当前用户信息
        headLeft: '1', // header的左边图标type
        headRight: '15', // header的右边图标type
        headTitle: '网易云音乐', // header标题
        headBg: null, // header背景色
        showBottom: false, // 是否显示底部小播放器
        curSong: 0, // 当前播放歌曲在播放列表中的索引
        listInfo: [], // 当前播放列表信息 
        playing: false, // 是否正在播放
        playMode: 'loop', // 列表的播放模式，loop为列表循环
        analyser: {}, // Audio api的音频分析器结点
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
        }
    },
    getters: {
        songInfo(state) { // 正在播放的歌曲信息
            return state.listInfo[state.curSong] || {}
        }
    }
})