<template>
    <section class="mask" v-show="show" @click.stop="hideMask">
        <section class="container" @click.stop="()=>{}">
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
export default {
    name: 'InfoList',
    props: ['show'],
    methods: {
        hideMask(e) {
            this.$emit('update:show', false)
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
        }
    }
}
</script>

<style scoped>
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
        border-top-left-radius: 10rem;
        border-top-right-radius: 10rem;
        overflow: hidden;
    }
    .title{
        box-sizing: border-box;
        flex-basis: 40rem;
        border-bottom: 1px solid #ddd;
    }
    .content{
        flex: 1;
        overflow-x: hidden;
        overflow-y: auto;
    }
</style>