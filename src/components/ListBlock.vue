<template>
    <section class="block" :style="blockSize" @click="showPlaylist(info.id)">
        <section class="cover-container" :style="cover">
            <img class="cover-img" :src="info.coverImgUrl" :alt="info.name">
            <p class="cover-count">
                <Icon type="22" size="16px" />
                {{count}}
            </p>
        </section>
        <p class="block-title">{{info.name}}</p>
    </section>
</template>

<script>
import Num from '../util/num'
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
        },
        count() {
            return Num.short(this.info.playCount)
        }
    },
    methods: {
        showPlaylist(id) {
            this.$router.push(`/playlist/${id}`)
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
    .cover-img{
        width: 100%;
        height: 100%;
    }
    .cover-count{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        margin: 0;
        font-size: 12px;
        text-align: right;
        padding: 1rem;
        background-color: rgba(0, 0, 0, 0.3);
        color: #fff;
    }
    .block-title{
        margin: 5rem 0;
        line-height: 1.414;
    }
</style>