<template>
    <section class="songlist">
        <PicList :size="setRem(50)" class="list-item" v-for="(item, i) in list" :key="i" @tap.native="play(i)">
            <span class="list-num" slot="cover">{{i + 1}}</span>
            <p class="list-title text-more" slot="title">
                {{item.name + (item.tns? `（${item.tns}）`: '')}}
            </p>
            <p class="list-info text-more" slot="info">{{singer(item.ar)}} - {{item.al.name}}</p>
            <Icon slot="after" type="27" :size="setRem(24)" @tap.native.stop="toOp(item)" />
        </PicList>
        <InfoList :show.sync="showOp">
            <p class="op-title text-more" slot="title">歌曲：{{songName}}</p>
            <SongOp :info="songInfo" slot="content" @hide="hideOp" />
        </InfoList>
    </section>
</template>

<script>
/**
 * 文字形式的歌曲列表，列表项前带有序号，后带有歌曲操作；
 * @prop {Array} list 歌曲信息数组，数组元素为歌曲信息（对象）
 */
import PicList from './PicList'
import InfoList from './InfoList'
import SongOp from './SongOp'

export default {
    name: 'SongList',
    props: ['list'],
    components: {
        PicList,
        InfoList,
        SongOp
    },
    data() {
        return {
            showOp: false,
            songInfo: {},
            songName: ''
        }
    },
    methods: {
        play(idx) {
            this.$store.commit('changeList', this.list)
            this.$store.commit('changeCur', idx)
            this.$store.commit('changeBottom', true)
        },
        singer(arr) {
            return arr.map(item => item.name).join(',')
        },
        toOp(info) {
            this.songName = info.name
            this.songInfo = info
            this.showOp = true
        },
        hideOp() {
            this.showOp = false
        }
    }
}
</script>

<style lang="scss" scoped>
    .list-item{
        margin-bottom: rem(6);
    }
    .list-num{
        font-size: 16px;
        color: #aaa;
    }
    .list-title{
        margin: 0;
        height: rem(30);
        line-height: rem(30);
    }
    .list-info{
        margin: 0;
        height: rem(20);
        line-height: rem(20);
        font-size: 12px;
        color: #aaa;
    }
    .op-title{
        box-sizing: border-box;
        margin: 0;
        padding: 0 rem(5);
        font-size: 12px;
        line-height: rem(40);
    }
</style>