<template>
    <section class="op-list">
        <PicList class="op-item" :size="setRem(40)" v-for="(item, i) in op" :key="i" @tap.stop.native="item.event" v-show="item.show">
            <Icon class="op-icon" :type="item.type" :size="setRem(24)" slot="cover"/>
            <p class="op-text" slot="title">{{item.content}}</p>
        </PicList>
    </section>
</template>

<script>
import PicList from './PicList'
/**
 * 歌曲相关操作（弹出的选项）
 */
export default {
    name: 'SongOp',
    components: {
        PicList
    },
    props: ['info'],
    computed: {
        songInfo() {
            return this.$store.getters.songInfo
        },
        op() {
            let ctx = this
            return [
                {
                    type: 8,
                    content: '下一首播放',
                    event: ctx.insertNext,
                    show: this.songInfo.id !== this.info.id
                },
                {
                    type: 26,
                    content: '评论',
                    event: ctx.toComment,
                    show: true
                },
                {
                    type: 24,
                    content: '分享',
                    event: ctx.toComment,
                    show: true
                },
                {
                    type: 19,
                    content: `歌手：${this.singer(this.info.ar || [])}`,
                    event: ctx.toSinger,
                    show: true
                },
                {
                    type: 5,
                    content: `专辑：${this.info.al? this.info.al.name: ''}`,
                    event: ctx.toAlbum,
                    show: true
                }
            ]
        }
    },
    methods: {
        singer(arr) {
            return arr.map(a => a.name).join(',')
        },
        insertNext() {
            this.$store.dispatch('playNext', this.info)
            this.$emit('hide')
        },
        toComment() {
            this.$router.push(`/comment/song/${this.info.id}`)
        },
        toSinger() {
            this.$router.push(`/singer/${this.info.ar[0].id}`)
        },
        toAlbum() {
            this.$router.push(`/album/${this.info.al.id}`)
        }
    }
}
</script>

<style lang="scss" scoped>
    .op-item{
        margin-bottom: rem(5);
    }
    .op-icon{
        color: $theme_bg;
    }
    .op-text{
        margin: 0;
        height: rem(40);
        line-height: rem(40);
    }
</style>