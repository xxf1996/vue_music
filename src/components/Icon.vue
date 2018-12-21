<template>
    <svg class="app-icon" aria-hidden="true" :style="svgStyle">
        <use :xlink:href="'#icon-' + type"></use>
    </svg>
</template>

<script>
/**
 * 封装iconfont的图标
 * @prop {Number} type 对应iconfont中的symbol值
 * @prop {String} size 图标的大小，依照font-size的规则
 */
export default{
    name: 'Icon',
    props: ['type', 'size'], // type对应图标的symbol名称
    computed: {
        svgStyle() {
            return {
                fontSize: this.size || '24rem'
            }
        }
    }
}
</script>

<style scoped>
    .app-icon{
        width: 1em;
        height: 1em;
        vertical-align: -.15em;
        fill: currentColor;
    }
</style>
