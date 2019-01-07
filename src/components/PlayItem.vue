<template>
    <section class="playlist">
        <PicList class="list-item" v-for="(item, k) in list" :size="setRem(50)" :key="k" @touchstart.native.stop="toDetail(item.id)">
            <img class="list-cover" v-lazy="getPic(item.coverImgUrl, 60)" :key="getPic(item.coverImgUrl, 60)" :alt="list.name" slot="cover">
            <p class="list-title" slot="title">{{item.name}}</p>
            <p class="list-info" slot="info">{{item.trackCount}} 首</p>
        </PicList>
    </section>
</template>

<script>
/**
 * 歌单列表；左边封面图，右边歌单信息；
 * @prop {Array} list 歌单信息数组
 */
import PicList from './PicList'

export default {
    name: 'PlayItem',
    props: ['list'],
    components: {
        PicList
    },
    methods: {
        toDetail(id) {
            this.$router.push(`/playlist/${id}`)
        }
    }
}
</script>

<style lang="scss" scoped>
    .list-item{
        margin-bottom: rem(6);
    }
    .list-cover{
        width: 100%;
        height: 100%;
        border-radius: rem(5);
    }
    .list-title{
        box-sizing: border-box;
        margin: 0;
        height: rem(30);
        line-height: rem(30);
    }
    .list-info{
        box-sizing: border-box;
        margin: 0;
        font-size: 12px;
        color: #aaa;
        height: rem(20);
        line-height: rem(20);
    }
</style>
