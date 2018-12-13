<template>
    <svg class="app-icon" aria-hidden="true" :style="svgStyle">
        <use :xlink:href="'#icon-' + type"></use>
    </svg>
</template>

<script>
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
