<template>
    <section class="head" :style="bg">
        <section class="head-left">
            <Icon :type="left" @click.native="op(left)"/>
        </section>
        <span class="head-title text-more">{{title}}</span>
        <section class="head-right">
            <Icon :type="right" @click.native="op(right)"/>
        </section>
        <Sider :show.sync="showSide" />
    </section>
</template>

<script>
import Sider from './Sider'
/**
 * 头部区域；
 * $store中的headBg可以设置背景颜色；
 * @prop {Number} left 左边图标的type值
 * @prop {Number} right 右边图标type值
 * @prop {String} title 标题内容
 */
export default {
    name: 'Header',
    props: ['left', 'title', 'right'],
    components: {
        Sider
    },
    data() {
        return {
            showSide: false
        }
    },
    methods: {
        op(type) { // 图标点击时的操作
            switch(Number(type)) {
                case 23: // 返回
                    this.$router.go(-1)
                    break;
                case 19: // 侧边栏（个人信息 + 设置项）
                    this.showSide = true
                    break;
                default:
                    break;
            }
        }
    },
    computed: {
        bg() {
            return {
                'background-color': this.$store.state.headBg
            }
        }
    }
}
</script>

<style scoped lang="scss">
    $headHeight: rem(40);
    .head{
        flex-basis: $headHeight;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        color: $theme_text;
        background-color: $theme_bg;
        box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
    }
    .head-left, .head-right{
        text-align: center;
        flex-basis: $headHeight;
    }
    .head-title{
        flex: 1;
        display: inline-block;
        text-align: center;
        font-size: 18px;
    }
</style>
