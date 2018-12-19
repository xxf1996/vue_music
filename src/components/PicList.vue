<template>
    <section class="item" :style="{height: itemStyle.height}">
        <section class="cover" :style="itemStyle">
            <slot name="cover"></slot>
        </section>
        <section class="text">
            <slot name="title"></slot>
            <slot name="info"></slot>
        </section>
        <section class="after">
            <slot name="after"></slot>
        </section>
    </section>
</template>

<script>
let defaultSize = '40rem'

export default {
    name: 'PicList',
    props: ['size'],
    computed: {
        itemStyle() {
            return {
                width: this.size || this.defaultSize,
                height: this.size || this.defaultSize
            }
        }
    }
}
</script>

<style scoped>
    .item{
        box-sizing: border-box;
        display: flex;
        flex-flow: row nowrap;
    }
    .cover{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 6rem;
    }
    .text{
        box-sizing: border-box;
        flex: 1;
        height: 100%;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
    }
    .after{
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>