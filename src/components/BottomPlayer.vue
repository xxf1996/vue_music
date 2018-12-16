<template>
    <section class="player" @click="toFull">
        <img class="cover" :src="album.picUrl" :alt="album.name">
        <section class="text">
            <p class="title hide-more">{{song.name}}</p>
            <p class="info hide-more">{{singer()}}</p>
        </section>
        <Icon v-show="playing" class="icon" type="12" size="24rem" @click.native.stop="pause" />
        <Icon v-show="!playing" class="icon" type="8" size="24rem" @click.native.stop="play(null)" />

        <Icon class="icon" type="1" size="24rem" @click.native.stop="showList" />

        <InfoList class="list" :show.sync="showPlaylist">
            <p class="list-title" slot="title">
                <Icon type="14" size="24rem" />
                当前播放
            </p>
            <section class="list-content" slot="content">
                <p class="item" v-for="(item, i) in list" :key="i" @click="play(i)">
                    <span :class="['item-name', i === curSong? 'item-cur': '']">{{item.name}}</span> - 
                    <span class="item-singer">{{singer(item.ar)}}</span>
                </p>
            </section>
        </InfoList>
    </section>
</template>

<script>
/**
 * 底部播放器组件
 * @prop {Object} song - 当前播放歌曲信息
 * @prop {Array} list - 当前播放歌曲列表
 */
import InfoList from './InfoList'

export default {
    name: 'BottomPlayer',
    props: ['song', 'list'], 
    data() {
        return {
            showPlaylist: false
        }
    },
    computed: {
        album() { // 歌曲专辑信息
            return this.song.al || {}
        },
        playing() {
            return this.$store.state.playing
        },
        curSong() {
            return this.$store.state.curSong
        }
    },
    components: {
        InfoList
    },
    methods: {
        singer(arr = this.song.ar || []) { // 歌手信息（数组）
            // 默认值防止没有数据时报错
            return arr.map(item => item.name).join(',')
        },
        showList() {
            this.showPlaylist = true
        },
        pause() {
            this.$player.pause()
        },
        play(idx = null) {
            if(idx === null) {
                this.$player.play()
            }else {
                this.$store.commit('changeCur', idx)
                this.showPlaylist = false
            }
        },
        toFull() {
            this.$router.push({name: 'full'})
        }
    }
}
</script>

<style lang="scss" scoped>
    .player{
        box-sizing: border-box;
        display: flex;
        height: 40rem;
        flex-flow: row nowrap;
        align-items: center;
        border-top: 1px solid #ddd;
        background-color: #fff;
        overflow: hidden;
    }
    .cover{
        width: 30rem;
        height: 30rem;
        margin: 5rem;
        border-radius: 3rem;
    }
    .text{
        flex: 1;
        height: 100%;
        overflow: hidden;
    }
    .title{
        margin: 0;
        font-size: 12px;
        line-height: 20rem;
    }
    .info{
        margin: 0;
        font-size: 11px;
        color: #aaa;
        line-height: 20rem;
    }
    .icon{
        margin: 0 6rem;
    }
    .hide-more{ /* 超出一行的部分用省略号替换 */
        overflow: hidden;
        white-space: nowrap;
        text-overflow: clip;
    }
    .list-title{
        margin: 0;
        line-height: 40rem;
        text-indent: 1em;
    }
    .list-content{
        box-sizing: border-box;
        padding: 0 8rem;
        overflow: hidden;
    }
    .item{
        box-sizing: border-box;
        margin: 0;
        height: 40rem;
        line-height: 40rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: clip;
        border-bottom: 1px solid #ddd;
    }
    .item-name{
        font-size: 16px;
    }
    .item-cur{
        color: $theme_bg;
    }
    .item-singer{
        font-size: 12px;
        color: #aaa;
    }
</style>