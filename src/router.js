import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import(/* webpackChunkName: "index" */ './pages/Index'),
            children: [
                {
                    path: 'mylist',
                    name: 'mylist',
                    component: () => import(/* webpackChunkName: "mylist" */ './pages/MyList')
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "login" */ './pages/Login')
        }
    ]
})