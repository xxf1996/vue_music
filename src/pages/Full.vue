<template>
    <section class="full" :style="fullH">
        <div class="full-bg" :style="bg"></div>
        <section class="full-main" @tap="toggleCover">
            <AudioCanvas v-show="showCover" :cover="cover" :song="info" />
            <FullLyric v-show="!showCover" :isShow="!showCover" :lrc="lrcData" :cur="curLine" />
        </section>
        <section class="full-btn">
            <section class="process">
                <span class="time-cur">{{curTime}}</span>
                <section id="bar" @tap="timePoint" ref="bar">
                    <div class="bar-bg"></div>
                    <div class="bar-cur" :style="{width: process}"></div>
                    <div class="bar-tip" :style="{left: process}"></div>
                </section>
                <span class="time-total">{{totalTime}}</span>
            </section>
            <section class="control">
                <Icon type="14" :size="setRem(32)" />
                <Icon type="11" :size="setRem(48)" @tap.native="toggleSong(-1)" />
                <Icon v-show="playing" type="12" :size="setRem(48)" @tap.native="pause" />
                <Icon v-show="!playing" type="8" :size="setRem(48)" @tap.native="play(null)" />
                <Icon type="9" :size="setRem(48)" @tap.native="toggleSong(1)" />
                <Icon type="1" :size="setRem(32)" @tap.native="showList"/>
            </section>
        </section>
        <InfoList class="list" :show.sync="showPlaylist">
            <p class="list-title" slot="title">
                <Icon type="14" :size="setRem(24)" />
                当前播放
            </p>
            <section class="list-content" slot="content">
                <p class="item" v-for="(item, i) in list" :key="i" @tap="play(i)">
                    <span :class="['item-name', i === curSong? 'item-cur': '']">{{item.name}}</span> - 
                    <span class="item-singer">{{singer(item.ar)}}</span>
                </p>
            </section>
        </InfoList>
    </section>
</template>

<script>
import AudioCanvas from '../components/AudioCanvas'
import FullLyric from '../components/FullLyric'
import InfoList from '../components/InfoList'
import {print} from '../util/debug'

/**
 * 全屏播放器页面，包含可视化频谱和歌词两部分。
 */
export default {
    name: 'Full',
    data() {
        return {
            curTime: '00:00',
            totalTime: '--:--',
            process: 0,
            showCover: true,
            showPlaylist: false,
            barLeft: 0,
            barWidth: 0,
            lrcData: [],
            curLine: 0,
            fullH: {
                height: '100%'
            }
        }
    },
    components: {
        AudioCanvas,
        InfoList,
        FullLyric
    },
    computed: {
        playing() {
            return this.$store.state.playing
        },
        info() { // 当前播放歌曲的信息
            return this.$store.getters.songInfo
        },
        cover() { // 专辑封面地址
            return (this.info.al || {}).picUrl
        },
        bg() { // 全屏背景图样式
            return {
                'background-image': this.cover? `url(${this.getPic(this.cover, 200)})`: null
            }
        },
        list() {
            return this.$store.state.listInfo
        },
        curSong() {
            return this.$store.state.curSong
        },
        playMode() {
            return this.$store.state.playMode
        },
        lyric() {
            return this.$store.state.lyric
        },
        noLyric() {
            return this.lyric === false // 没有歌词的情况
        },
        clearTransform() {
            return this.$store.state.clearTransform
        }
    },
    methods: {
        singer(arr = this.info.ar || []) { // 歌手信息（数组）
            // 默认值防止没有数据时报错
            return arr.map(item => item.name).join(',')
        },
        showList() {
            this.showPlaylist = true
        },
        toggleCover() {
            this.showCover = !this.showCover
        },
        formatTime(t){ // 根据时间（单位s）来格式化显示时间（mm：ss）
            t = Math.round(t)
            let minutes = Math.floor(t / 60)
            let seconds = t % 60
            if(minutes < 10){
                minutes = '0' + minutes
            }
            if(seconds < 10){
                seconds = '0' + seconds
            }

            return minutes + ':' + seconds
        },
        play(idx = null) {
            if(idx === null) {
                this.$player.play()
            }else {
                this.$store.commit('changeCur', idx)
                this.showPlaylist = false
            }
        },
        pause() {
            this.$player.pause()
        },
        toggleSong(d) {
            this.$store.dispatch('toggleSong', d)
        },
        timePoint(e) { // 歌曲进度条跳转（注意touch事件的属性）
            print(e)
            this.$player.currentTime = this.$player.duration * (e.touches[0].clientX - this.barLeft) / this.barWidth
        },
        parseLyric(){ // 解析lyric歌词，每行歌词信息包括时间轴和内容
            if(this.noLyric || this.lyric == ''){
                this.lrcData = []
            }else{
                let arr = this.lyric.split('\n') // 将歌词按行分割，一行对应一句歌词，但可能存在多个时间点
                let data = []
                for(let line of arr){
                    if(/\]\[/.test(line)){ // 是否存在多个时间点
                        let res = line.match(/\[(.+)\]([^\[\]]*)/)
                        let t = res[1].split('][') // 时间点列表

                        for(let item of t) {
                            let point = item.split(':') // 分，秒分离
                            let info = {
                                time: parseInt(point[0]) * 60 + Number(point[1]),
                                content: res[2]
                            }
                            data.push(info)
                        }
                    }else{
                        let res = line.match(/\[([\d]+)\:([\d]+\.[\d]+)\](.*)/)
                        if(res){
                            let info = {
                                time: parseInt(res[1]) * 60 + Number(res[2]),
                                content: res[3]
                            }
                            data.push(info)
                        }
                    }
                }
                this.lrcData = data
            }
        },
        findCurLyric(t){ // 根据歌曲当前播放进度来查找当前对应显示哪一行歌词
            if(this.lrcData.length){
                let data = this.lrcData
                let len = data.length
                let [left, right] = [0, len - 1]
                let idx = 0
                while(left < right){ // 二分法查找（有序列表，按时间轴顺序进行）
                    let mid = Math.floor((left + right) / 2)
                    if(data[mid].time < t){
                        if(mid === len - 1){
                            idx = mid
                            break
                        }else{
                            if(data[mid + 1].time < t){
                                left = mid + 1
                            }else{
                                idx = mid
                                break
                            }
                        }
                    }else{
                        if(mid === 0){
                            idx = 0
                            break
                        }else{
                            right = mid
                        }
                    }
                }
                if(data[len - 1].time < t) idx = len - 1
                this.curLine = idx
            }
        },
        initPage() { // 设置页面标题等信息
            this.$store.commit('changeClear', true)
            this.$store.dispatch('setPage', {
                left: '23',
                right: '24',
                title: this.info.name
            })
        }
    },
    created() {
        if(this.info.id){ // 当前是否有歌曲在播放
            this.parseLyric()
            this.initPage()
            this.$store.commit('changeBottom', false) // 全屏播放时隐藏底部播放器
            this.$store.commit('changeBg', 'transparent') // 全屏播放时页面标题背景透明
            this.totalTime = this.formatTime(this.$player.duration)
            
            this.$player.addEventListener('timeupdate', e => { // audio的时间更新事件
                let cur = this.$player.currentTime 
                this.curTime = this.formatTime(cur)
                this.process = cur / this.$player.duration * 100 + '%'
                if(!this.noLyric){
                    this.findCurLyric(cur)
                }
            })
            this.$player.addEventListener('durationchange', e => { // audio的音源切换事件
                this.totalTime = this.formatTime(this.$player.duration)
            })
        }else{
            this.$router.go(-1)
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.fullH.height = this.setRem(this.$parent.$refs.main.clientHeight) // 由于多了一层未知高度的滚动容器的包裹，100%不起作用，需要手动获取高度
            // print(this.$parent.$refs.main)
        })
        this.barWidth = this.$refs.bar.clientWidth
        this.barLeft = this.$refs.bar.offsetLeft
    },
    beforeRouteLeave(to, from, next) {
        if(this.info.id){
            this.$store.commit('changeBottom', true)
        }
        this.$store.commit('changeClear', false)
        this.$store.commit('changeBg', null)
        next()
    },
    watch: {
        lyric(nVal, oVal) {
            this.parseLyric()
        },
        info(val) { // 歌曲变化时重新设置标题
            this.initPage()
        },
        clearTransform(val) {
            this.$store.commit('changeClear', true)
        }
    }
}
</script>

<style lang="scss" scoped>
    .full{
        display: flex;
        flex-flow: column nowrap;
    }
    .full-bg{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-color: #000;
        filter: brightness(0.75) blur(20px);
        overflow: hidden;
        z-index: -1;
    }
    .full-main{
        flex: 1;
    }
    .full-btn{
        height: rem(100);
    }
    .process{
        box-sizing: border-box;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        height: rem(30);
        font-size: 11px;
    }
    .time-cur{
        display: inline-block;
        width: rem(40);
        text-align: right;
        color: #f6f6f6;
    }
    .time-total{
        display: inline-block;
        width: rem(40);
        color: #ccc;
    }
    #bar{
        position: relative;
        flex: 1;
        height: rem(10);
        margin: 0 rem(10);
    }
    .bar-bg{
        position: absolute;
        top: 0;
        bottom: 0;
        height: rem(3);
        width: 100%;
        margin: auto;
        border-radius: rem(1.5);
        background-color: #ccc;
    }
    .bar-cur{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        height: rem(3);
        margin: auto;
        border-radius: rem(1.5);
        background-color: $theme_bg;
    }
    .bar-tip{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: rem(10);
        height: rem(10);
        margin: auto auto auto rem(-5);
        border-radius: 50%;
        background-color: #fff;
    }
    .control{
        box-sizing: border-box;
        height: rem(70);
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        align-items: center;
        color: #fff;
    }
    .list-title{
        margin: 0;
        line-height: rem(40);
        text-indent: 1em;
    }
    .list-content{
        box-sizing: border-box;
        padding: 0 rem(8);
        overflow: hidden;
    }
    .item{
        box-sizing: border-box;
        margin: 0;
        height: rem(40);
        line-height: rem(40);
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