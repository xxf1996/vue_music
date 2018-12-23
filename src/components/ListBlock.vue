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

/**
 * 首页歌单或专辑等块状图片区域，点击后可进入详情页
 * @prop {String} size 块状区域大小
 * @prop {Object} info 歌单信息
 */
export default {
    name: 'ListBlock',
    props: ['size', 'info'],
    data() {
        return {
            defaultSize: this.setRem(110)
        }
    },
    computed: {
        cover() {
            return {
                width: this.size || this.defaultSize,
                height: this.size || this.defaultSize
            }
        },
        blockSize() {
            return {
                width: this.size || this.defaultSize
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

<style lang="scss" scoped>
    .block{
        margin: rem(6) 0;
        font-size: 12px;
    }
    .cover-container{
        position: relative;
        border-radius: rem(5);
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
        padding: rem(1);
        background-color: rgba(0, 0, 0, 0.3);
        color: #fff;
    }
    .block-title{
        margin: rem(5) 0;
        line-height: 1.414;
    }
</style>