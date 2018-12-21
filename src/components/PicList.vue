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

/**
 * 简要歌曲信息的列表项，左中右分布，中间呈现主题信息；
 * @prop {String} size 列表项的高度
 * @slot cover 左边内容区域（一般放封面或序号等）
 * @slot after 右边内容区域（一般放图标）
 * @slot title 中间区域的上部区域（一般放歌曲的标题）
 * @slot info 中间区域的下部区域（一般放歌曲的补充信息，如歌手，专辑等）
 */
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