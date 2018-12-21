<template>
    <section class="op-list">
        <PicList class="op-item" size="40rem" v-for="(item, i) in op" :key="i">
            <Icon class="op-icon" :type="item.type" size="24rem" slot="cover"/>
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
        op() {
            return [
                {
                    type: 8,
                    content: '下一首播放',
                    event
                },
                {
                    type: 26,
                    content: '评论'
                },
                {
                    type: 24,
                    content: '分享'
                },
                {
                    type: 19,
                    content: `歌手：${this.singer(this.info.ar || [])}`
                },
                {
                    type: 5,
                    content: `专辑：${this.info.al? this.info.al.name: ''}`
                }
            ]
        }
    },
    methods: {
        singer(arr) {
            return arr.map(a => a.name).join(',')
        },
        insertNext() {
            
        }
    }
}
</script>

<style lang="scss" scoped>
    .op-item{
        margin-bottom: 5rem;
    }
    .op-icon{
        color: $theme_bg;
    }
    .op-text{
        margin: 0;
        height: 40rem;
        line-height: 40rem;
    }
</style>