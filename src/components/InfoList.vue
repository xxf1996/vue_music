<template>
    <section class="mask" v-show="show" @tap.stop="hideMask" @touchstart.stop="" @touchmove.stop="" @touchend.stop="">
        <section class="container" @tap.stop="()=>{}">
            <section class="title">
                <slot name="title"></slot>
            </section>
            <section class="content">
                <slot name="content"></slot>
            </section>
        </section>
    </section>    
</template>

<script>
/**
 * 底部浮层，会覆盖所有内容；有一层mask，底部有列表容器；
 * @prop {Boolean} show 是否显示该浮层（可以与父组件同步更新）
 * @slot title 底部标题区域
 * @slot content 底部列表区域
 */
import {print} from '../util/debug'

export default {
    name: 'InfoList',
    props: ['show'],
    methods: {
        hideMask(e) {
            this.$emit('update:show', false)
            // print(e)
            e.preventDefault()
        }
    },
    watch: {
        show(nVal, oVal) {
            if(nVal) { // show为true时，监听返回键，触发返回键即隐藏该弹出层
                window.addEventListener('popstate', this.hideMask)
            }else{
                window.removeEventListener('popstate', this.hideMask)
            }
            this.$store.commit('changeClear', nVal)
            this.$store.commit('setInfoList', nVal)
            this.$emit('update:show', nVal)
        }
    }
}
</script>

<style lang="scss" scoped>
    .mask{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
    }
    .container{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 60%;
        display: flex;
        flex-flow: column nowrap;
        background-color: #fff;
        border-top-left-radius: rem(10);
        border-top-right-radius: rem(10);
        overflow: hidden;
    }
    .title{
        box-sizing: border-box;
        flex-basis: rem(40);
        border-bottom: 1px solid #ddd;
    }
    .content{
        flex: 1;
        overflow-x: hidden;
        overflow-y: auto;
    }
</style>