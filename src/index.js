import Vue from 'vue'
import axios from 'axios'
import store from './store'
import router from './router'
import VueTouch from 'vue-touch' // 移动端touch事件
import VueLazyload from 'vue-lazyload'
import App from './App'
import 'muse-ui/lib/styles/base.less'
import {Tabs, Carousel, TextField, Button, Radio} from 'muse-ui'
import Icon from './components/Icon'
import {defaultPic} from './util/pic'

const url = 'http://localhost:3000' // 使用时用实际api接口地址进行替换
const dpr = window.devicePixelRatio || 1

Vue.prototype.$axios = axios
Vue.prototype.$req = (api, data = {}) => axios.get(url + api, {
    params: data
})
Vue.prototype.$player = document.getElementById('player') // audio元素
Vue.prototype.setRem = n => n / 37.5 + 'rem' // 将px值转为rem值
// 给图片添加参数，默认图片地址返回原图
Vue.prototype.getPic = (src, size = 120, q = 75) => `${src}?param=${size * dpr}y${size * dpr}&quality=${q}`

Vue.component(Icon.name, Icon)
Vue.use(Tabs)
Vue.use(Carousel)
Vue.use(TextField)
Vue.use(Button)
Vue.use(Radio)
Vue.use(VueTouch, 'v-touch')
Vue.use(VueLazyload, {
    preload: 1.3,
    loading: defaultPic,
    error: defaultPic
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')