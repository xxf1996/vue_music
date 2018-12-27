import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function checkInfoList(to, from, next) {
    
}

let router = new Router({
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
                },
                {
                    path: 'myradio',
                    name: 'myradio',
                    component: () => import(/* webpackChunkName: "myradio" */ './pages/MyRadio')
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "login" */ './pages/Login')
        },
        {
            path: '/playlist/:id',
            component: () => import(/* webpackChunkName: "playlist" */ './pages/PlayList')
        },
        {
            path: '/album/:id',
            component: () => import(/* webpackChunkName: "album" */ './pages/Album')
        },
        {
            path: '/full',
            name: 'full',
            component: () => import(/* webpackChunkName: "full" */ './pages/Full')
        },
        {
            path: '/comment/song/:id',
            component: () => import(/* webpackChunkName: "comment" */ './pages/Comment'),
            meta: {
                type: 'song'
            }
        },
        {
            path: '/comment/album/:id',
            component: () => import(/* webpackChunkName: "comment" */ './pages/Comment'),
            meta: {
                type: 'album'
            }
        },
        {
            path: '/comment/list/:id',
            component: () => import(/* webpackChunkName: "comment" */ './pages/Comment'),
            meta: {
                type: 'list'
            }
        },
        {
            path: '/singer/:id',
            component: () => import(/* webpackChunkName: "singer" */ './pages/Singer')
        }
    ]
})

// router.beforeEach((to, from, next) => {
//     console.log(to, from, next)
//     next(vm => {
//         if(vm.$store.state.infoList) {
//             vm.$store.commit('setInfoList', false)
//             return false
//         }
//     })
// })

export default router