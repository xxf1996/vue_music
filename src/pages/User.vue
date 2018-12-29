<template>
    <section class="user">
        <div class="bg" :style="bg"></div>
        <section class="info">
            <img :src="getPic(profile.avatarUrl, 80)" alt="user" class="user-avatar">
            <section class="info-container">
                <p class="user-name">{{profile.nickname}}</p>
                <p class="user-num">
                    <span class="num">关注{{profile.follows}}</span>
                    <span class="num">粉丝{{profile.followeds}}</span>
                </p>
                <p class="user-level">
                    <span class="level">Lv.{{user.level}}</span>
                </p>
            </section>
        </section>
        <section class="container">
            <p class="title">关于</p>
            <p class="info-type">个人信息</p>
            <section class="info-content">
                <p class="info-text">性别：{{gender}}</p>
                <p class="info-text">年龄：{{age}}</p>
            </section>
            <p class="info-type">个人介绍</p>
            <p class="info-text">{{profile.signature}}</p>
            <p class="info-type">歌单（{{list.length}}）</p>
            <Loading v-show="!listRequested" />
            <PlayItem class="user-playlist" :list="list" />
        </section>
    </section>
</template>

<script>
import PlayItem from '../components/PlayItem'
import Loading from '../components/Loading'
import dayjs from 'dayjs'

export default {
    name: 'User',
    components: {
        PlayItem,
        Loading
    },
    data() {
        return {
            user: {},
            list: [],
            listRequested: false
        }
    },
    computed: {
        id() {
            return this.$route.params.id
        },
        profile() {
            return this.user.profile || {}
        },
        bg() {
            let pic = this.profile.backgroundUrl
            return {
                'background-image': pic? `url(${this.getPic(pic, 400)})`: null
            }
        },
        gender() {
            return this.profile.gender === 1? '男': '女'
        },
        age() {
            let birth = dayjs(this.profile.birthday || 0)
            return Math.ceil(dayjs().diff(birth, 'year', true))
        },
        pageInfo() {
            return {
                left: '23',
                right: '15',
                title: this.profile.nickname || '用户'
            }
        }
    },
    methods: {
        initPage() {
            this.$store.dispatch('setPage', this.pageInfo)
        }
    },
    created() {
        this.initPage()
        this.$req('/user/detail', {
            uid: this.id
        }).then(res => {
            if(res.data.code === 200) {
                this.user = res.data
            }
        }).catch(err => {
            throw err
        })

        this.$req('/user/playlist', {
            uid: this.id
        }).then(res => {
            if(res.data.code === 200) {
                this.list = res.data.playlist
                this.listRequested = true
            }
        }).catch(err => {
            throw err
        })
    },
    watch: {
        pageInfo(val) {
            this.initPage()
        }
    }
}
</script>

<style lang="scss" scoped>
    .user{
        position: relative;
    }
    .bg{
        height: rem(240);
        background-size: cover;
        background-color: #333;
        z-index: -1;
    }
    .info{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: rem(220);
        background-color: rgba(0, 0, 0, 0.15);
    }
    .user-avatar{
        position: absolute;
        top: 0;
        bottom: 0;
        left: rem(10);
        width: rem(60);
        height: rem(60);
        margin: auto 0;
        border-radius: 50%;
    }
    .info-container{
        box-sizing: border-box;
        position: absolute;
        left: 0;
        bottom: rem(5);
        width: 100%;
        padding-left: rem(10);
        &>p{
            margin: 0;
        }
    }
    .user-name{
        color: #fff;
        font-size: 16px;
        line-height: rem(28);
    }
    .user-num{
        line-height: rem(20);
        color: #efefef;
    }
    .num{
        padding: 0 rem(5);
    }
    .level{
        font-size: 12px;
        line-height: rem(16);
        padding: 0 rem(8);
        background-color: rgba(255, 255, 255, 0.6);
        border-radius: rem(8);
    }
    .container{
        margin-top: rem(-20);
        padding: 0 rem(5);
        border-top-left-radius: rem(10);
        border-top-right-radius: rem(10);
        overflow: hidden;
        background-color: #fff;
    }
    .title{
        margin: 0;
        line-height: rem(40);
        text-align: center;
        border-bottom: 1px solid #ddd;
    }
    .info-type{
        margin: rem(8) 0;
        padding: 0 rem(3);
        border-left: 2px solid $theme_bg;
    }
    .info-content{
        margin-bottom: rem(10);
    }
    .info-text{
        margin: 0;
        color: #999;
        line-height: 1.5;
    }
</style>
