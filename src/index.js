import Vue from 'vue'
import axios from 'axios'
import store from './store'
import router from './router'
import App from './App'
import 'muse-ui/lib/styles/base.less'
import {Tabs, Carousel} from 'muse-ui'
import Icon from './components/Icon'

Vue.prototype.$axios = axios
Vue.prototype.$req = (api, data = {}) => axios.get(`http://tx.xiexuefeng.cc:3000/music${api}`, {
    params: data
})
Vue.component(Icon.name, Icon)
Vue.use(Tabs)
Vue.use(Carousel)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')