import Vue from 'vue'
import axios from 'axios'
import store from './store'
import router from './router'
import VueTouch from 'vue-touch' // 移动端touch事件
// import eruda from 'eruda'
import App from './App'
import 'muse-ui/lib/styles/base.less'
import {Tabs, Carousel, TextField, Button} from 'muse-ui'
import Icon from './components/Icon'

// eruda.init() // 初始化控制面板

Vue.prototype.$axios = axios
Vue.prototype.$req = (api, data = {}) => axios.get(`http://tx.xiexuefeng.cc:3000/music${api}`, {
    params: data
})
Vue.prototype.$player = document.getElementById('player') // audio元素
Vue.prototype.setRem = n => n / 37.5 + 'rem' // 将px值转为rem值

Vue.component(Icon.name, Icon)
Vue.use(Tabs)
Vue.use(Carousel)
Vue.use(TextField)
Vue.use(Button)
Vue.use(VueTouch, 'v-touch')

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')