<template>
    <section class="banner">
        <div class="banner-bg"></div>
        <mu-carousel class="banner-container" hide-indicators>
            <mu-carousel-item v-for="(item, i) in info" :key="i">
                <img class="banner-img" :src="item.imageUrl" alt="banner">
                <span class="banner-type" :style="{backgroundColor: item.titleColor}">{{item.typeTitle}}</span>
            </mu-carousel-item>
        </mu-carousel>
    </section>
</template>

<script>
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
        padding: 6rem 0;
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
        width: 360rem;
        height: 133.3rem;
        margin:0 auto;
    }
    .banner-img{
        width: 100%;
        border-radius: 5rem;
    }
    .banner-type{
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 12px;
        padding: 3rem 5rem;
        color: #fff;
        border-radius: 5rem;
    }
</style>