<template>
    <section class="banner">
        <div class="banner-bg"></div>
        <mu-carousel class="banner-container" hide-indicators>
            <mu-carousel-item v-for="(item, i) in info" :key="i">
                <img class="banner-img" v-lazy="item.imageUrl" :key="item.imageUrl" alt="banner">
                <span class="banner-type" :style="{backgroundColor: item.titleColor}">{{item.typeTitle}}</span>
            </mu-carousel-item>
        </mu-carousel>
    </section>
</template>

<script>
/**
 * 首页banner轮播
 */
export default {
    name: 'Banner',
    data() {
        return {
            info: []
        }
    },
    created() {
        this.$req('/banner').then(res => {
            if(res.data.code === 200){
                this.info = res.data.banners
            }
        }).catch(err => {
            throw err
        })
    }
}
</script>

<style scoped lang="scss">
    .banner{
        position: relative;
        padding: rem(6) 0;
    }
    .banner-bg{
        position: absolute;
        left: 0;
        top: 0;
        height: 80%;
        width: 100%;
        background-color: $theme_bg;
    }
    .banner-container{
        width: rem(360);
        height: rem(133.3);
        margin:0 auto;
    }
    .banner-img{
        width: 100%;
        border-radius: rem(5);
    }
    .banner-type{
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 12px;
        padding: rem(3) rem(5);
        color: #fff;
        border-radius: rem(5);
    }
</style>