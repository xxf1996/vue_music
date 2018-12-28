<template>
    <section v-show="show" class="side" @click.self.stop="hide">
        <v-touch class="container" @swipeleft="hide">
            <section class="info" :style="bg">
                <img :src="getPic(avatar, 60)" alt="user" class="avatar">
                <p class="user">
                    {{name}}
                    <span class="level">Lv.{{level}}</span>
                </p>
            </section>
            <section class="setting">
                暂无
            </section>
        </v-touch>
    </section>
</template>

<script>
/**
 * 用户信息及设置侧边栏
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
        }
    },
    methods: {
        hide() {
            this.$emit('update:show', false) // v-touch组件不支持.stop和.prevent
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
</style>