import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // api: 'http://tx.xiexuefeng.cc:3000/music',
        uid: null, // 250099360
        userInfo: {},
        headLeft: '1', // header的左边图标type
        headRight: '15', // header的右边图标type
        headTitle: '网易云音乐' // header标题
    },
    mutations: {
        changeUser(state, id){
            state.uid = id
        },
        changeInfo(state, info){
            state.userInfo = info
        },
        changeTitle(state, title){
            state.headTitle = title
        }
    }
})