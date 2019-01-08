<template>
    <section v-show="show" class="side" @tap.self.stop="hide">
        <v-touch class="container" @swipeleft="hide">
            <section class="info" :style="bg">
                <img v-lazy="getPic(avatar, 60)" :key="getPic(avatar, 60)" alt="user" class="avatar" @tap.stop="toUser">
                <p class="user">
                    {{name}}
                    <span class="level">Lv.{{level}}</span>
                </p>
            </section>
            <section class="setting">
                <section class="setting-tab">
                    <p class="setting-text">显示音乐频谱</p>
                    <div :class="['switch', showAudio? 'switch-yes': '']" @click.stop="toggleAudio">
                        <span class="switch-bar"></span>
                        <span class="switch-circle"></span>
                    </div>
                </section>
                <p class="logout">
                    <mu-button @click.native.stop="logout" class="logout-btn">重新登录</mu-button>
                </p>
            </section>
        </v-touch>
    </section>
</template>

<script>
/**
 * 用户信息及设置侧边栏
 * 侧边栏显示时可以向左滑动收起（swipeleft）
 */
import {print} from '../util/debug'

export default {
    name: 'Sider',
    props: ['show'],
    computed: {
        user() {
            return this.$store.state.userInfo
        },
        avatar() {
            return (this.user.profile || {}).avatarUrl
        },
        bg() {
            let url = (this.user.profile || {}).backgroundUrl
            return {
                'background-image': url? `url(${this.getPic(url, 360)})`: null
            }
        },
        name() {
            return (this.user.profile || {}).nickname
        },
        level() {
            return this.user.level
        },
        showAudio() {
            return this.$store.state.showAudio
        }
    },
    methods: {
        hide() {
            this.$emit('update:show', false) // v-touch组件不支持.stop和.prevent
        },
        toUser() {
            this.hide()
            this.$router.push(`/user/${this.user.profile.userId}`)
        },
        toggleAudio() {
            this.$store.commit('changeAudio', !this.showAudio)
        },
        logout() {
            localStorage.removeItem('X_uid')
            this.$store.commit('changeUser', null)
            this.hide()
            this.$router.push('/login')
        }
    },
    watch: {
        show(nVal) {
            this.$store.commit('changeClear', nVal)
        }
    }
}
</script>

<style lang="scss" scoped>
    .side{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        overflow-x: hidden;
        overflow-y: auto;
        z-index: 1000;
    }
    .container{
        display: inline-block;
        width: rem(320);
        min-height: 100%;
        background-color: #fff;
    }
    .info{
        position: relative;
        height: rem(200);
        background-size: cover;
    }
    .info::before{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.2);
    }
    .avatar{
        position: absolute;
        left: rem(10);
        top: 50%;
        width: rem(60);
        height: rem(60);
        border-radius: 50%;
        transform: translate(0, -50%);
    }
    .user{
        box-sizing: border-box;
        position: absolute;
        bottom: 0;
        width: 100%;
        margin: 0;
        padding: rem(10) rem(5);
        font-size: 16px;
        color: #fff;
    }
    .level{
        display: inline-block;
        font-size: 12px;
        height: 16px;
        line-height: 16px;
        border: 1px solid #fff;
        border-radius: 8px;
        padding: 0 4px;
    }
    .setting-tab{
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding: rem(12) rem(5);
        border-bottom: 1px solid #ddd;
        color: #333;
    }
    .setting-text{
        flex: 1;
        margin: 0;
    }
    .switch{
        position: relative;
        height: rem(16);
        width: rem(32);
        margin-right: rem(16);
        &>.switch-bar{
            position: absolute;
            left: 0;
            top: 0;
            height: rem(16);
            width: rem(32);
            border-radius: rem(8);
            background-color: #aaa;
        }
        &>.switch-circle{
            position: absolute;
            left: 0;
            top: 50%;
            transform: translate(-50%, -50%);
            width: rem(20);
            height: rem(20);
            border-radius: 50%;
            background-color: #fff;
            box-shadow: 0 2px 2px 0 #999;
            transition: all 0.2s ease-out;
        }
    }
    .switch-yes{
        &>.switch-bar{
            background-color: rgba($theme_bg, 0.6);
        }
        &>.switch-circle{
            left: 100%;
            background-color: $theme_bg;
        }
    }
    .logout{
        text-align: center;
    }
    .logout-btn{
        background-color: $theme_bg;
        color: $theme_text;
    }
</style>