<template>
    <svg class="app-icon" aria-hidden="true">
        <use :xlink:href="'#icon-' + type"></use>
    </svg>
</template>

<script>
export default{
    name: 'Icon',
    props: ['type'] // type对应图标的symbol名称
}
</script>

<style scoped>
    .app-icon{
        font-size: 24rem;
        width: 1em;
        height: 1em;
        vertical-align: -.15em;
        fill: currentColor;
    }
</style>
