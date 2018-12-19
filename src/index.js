import Vue from 'vue'
import axios from 'axios'
import store from './store'
import router from './router'
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

Vue.component(Icon.name, Icon)
Vue.use(Tabs)
Vue.use(Carousel)
Vue.use(TextField)
Vue.use(Button)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')