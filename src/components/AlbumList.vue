<template>
    <section class="album-list">
        <PicList class="list-item" :size="setRem(50)" v-for="(item, i) in list" :key="i" @touchstart.native.stop="toAlbum(item.id)">
            <img v-lazy="getPic(item.picUrl, 60)" :key="getPic(item.picUrl, 60)" alt="cover" class="album-cover" slot="cover">
            <p class="album-title text-more" slot="title">{{item.name}}</p>
            <p class="album-info" slot="info">
                <span class="album-date">{{date(item.publishTime)}}</span>
                <span class="album-size">歌曲{{item.size}}</span>
            </p>
        </PicList>
    </section>
</template>

<script>
/**
 * 专辑列表，左边为封面，右边为标题或信息
 * @prop {Array} list 专辑信息数组
 */
import PicList from './PicList'
import dayjs from 'dayjs'

export default {
    name: 'AlbumList',
    props: ['list'],
    components: {
        PicList
    },
    methods: {
        date(t) {
            return dayjs(t).format('YYYY.M.D')
        },
        toAlbum(id) {
            this.$router.push(`/album/${id}`)
        }
    }
}
</script>

<style lang="scss" scoped>
    .list-item{
        margin-bottom: rem(5);
    }
    .album-cover{
        width: 90%;
        height: 90%;
        border-radius: rem(5);
    }
    .album-title{
        margin: 0;
        height: rem(30);
        line-height: rem(30);
    }
    .album-info{
        margin: 0;
        height: rem(20);
        line-height: rem(20);
        font-size: 12px;
        color: #aaa;
    }
</style>
