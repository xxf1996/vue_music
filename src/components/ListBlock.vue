<template>
    <section class="block" :style="blockSize">
        <section class="cover-container" :style="cover">
            <img class="cover-img" :src="info.coverImgUrl" :alt="info.name">
            <div class="cover-shadow"></div>
            <span class="cover-count">{{info.playCount}} 次</span>
        </section>
        <p class="block-title">{{info.name}}</p>
    </section>
</template>

<script>
let defaultSize = '110rem'
export default {
    name: 'ListBlock',
    props: ['size', 'info'],
    computed: {
        cover() {
            return {
                width: this.size || defaultSize,
                height: this.size || defaultSize
            }
        },
        blockSize() {
            return {
                width: this.size || defaultSize
            }
        }
    }
}
</script>

<style scoped>
    .block{
        margin: 6rem 0;
        font-size: 12px;
    }
    .cover-container{
        position: relative;
        border-radius: 5rem;
        overflow: hidden;
    }
    .cover-shadow{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 20rem;
        background-color: rgba(0, 0, 0, 0.3);
    }
    .cover-img{
        width: 100%;
        height: 100%;
    }
    .cover-count{
        position: absolute;
        right: 0;
        top: 0;
        padding: 3rem;
        color: #fff;
    }
    .block-title{
        margin: 5rem 0;
        line-height: 1.414;
    }
</style>