import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        api: 'http://tx.xiexuefeng.cc:3000/music',
        headLeft: '1',
        headRight: '15',
        headTitle: '网易云音乐'
    },
    mutations: {

    }
})