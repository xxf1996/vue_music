<template>
    <section class="head">
        <section class="head-left">
            <Icon :type="left" @click.native="op(left)"/>
        </section>
        <span class="head-title">{{title}}</span>
        <section class="head-right">
            <Icon :type="right" @click.native="op(right)"/>
        </section>
    </section>
</template>

<script>
export default {
    name: 'Header',
    props: ['left', 'title', 'right'],
    methods: {
        op(type) {
            switch(type) {
                case 23:
                    this.$router.go(-1)
                    break;
                default:
                    break;
            }
        }
    }
}
</script>

<style scoped lang="scss">
    $headHeight: 40rem;
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
