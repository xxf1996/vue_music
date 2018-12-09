import Vue from 'vue'
import axios from 'axios'
import store from './store'
import router from './router'
import App from './App'
import 'muse-ui/lib/styles/base.less'
// import {AppBar} from 'muse-ui'
import Icon from './components/Icon'

Vue.prototype.$axios = axios
Vue.component(Icon.name, Icon)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')