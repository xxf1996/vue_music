<template>
    <section class="canvas">
        <section class="container">
            <img v-lazy="getPic(cover, 200)" :key="getPic(cover, 200)" alt="cover" :class="['cover', playing? '': 'cover-pause']">
            <canvas id="can"></canvas>
        </section>
        <section class="func">
            <Icon class="func-btn" type="26" :size="setRem(24)" @tap.native="toComment" />
            <Icon class="func-btn" type="27" :size="setRem(24)" @tap.native.stop="toOp" />
        </section>
        <InfoList :show.sync="showOp">
            <p class="op-title text-more" slot="title">歌曲：{{song.name}}</p>
            <SongOp :info="song" slot="content" @hide="hideOp" />
        </InfoList>
    </section>
</template>

<script>
/**
 * 绘制音乐频谱，显示旋转封面
 * @prop {String} cover 歌曲封面地址
 * @prop {String} song 歌曲信息
 */
import InfoList from './InfoList'
import SongOp from './SongOp'

export default {
    name: 'AudioCanvas',
    props: ['cover', 'song'],
    components: {
        InfoList,
        SongOp
    },
    data() {
        return {
            showOp: false
        }
    },
    computed: {
        analyser() {
            return this.$store.state.analyser
        },
        playing() {
            return this.$store.state.playing
        },
        showAudio() {
            return this.$store.state.showAudio
        }
    },
    methods: {
        toComment() {
            this.$router.push(`/comment/song/${this.song.id}`)
        },
        normal(n) { // 归一化值至[5, 60]区间
            return n / 255 * 50 + 5
        },
        hideOp() {
            this.showOp = false
        },
        toOp() {
            this.showOp = true
        },
        drawAudio() {
            let dpr = window.devicePixelRatio // 因为canvas实际上就是一个位图，因此当设备dpr > 1时，会出现模糊
            let rem = parseFloat(document.documentElement.style.fontSize)
            let can = document.getElementById('can')
            let ctx = can.getContext('2d')
            let b = ctx.backingStorePixelRatio ||
            ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio || 1
            // let unit = rem * dpr / b
            // let styleW = Math.round(360 * rem)
            // let w = styleW * dpr
            let unit = rem / 37.5
            let w = 360 * unit
            let [analyser, player] = [this.analyser, this.$player]
            let center = w / 2
            let count = analyser.frequencyBinCount
            let simple = 96 // 频率取样数
            let k = count / simple
            let arr = new Uint8Array(count) // Uint8Array每个元素范围为0~255的整数
            let pi = Math.PI
            let lineW = 3 * unit
            
            can.width = w
            can.height = w
            can.style.width = this.setRem(360)
            can.style.height = this.setRem(360)
            ctx.strokeStyle = "#39f"
            ctx.fillStyle = "#39f"
            analyser.minDecibels = -90
            analyser.maxDecibels = -10

            function line(ang, len) {
                let [sx, sy] = [center + 100 * unit * Math.cos(ang), center + 100 * unit * Math.sin(ang)] // 中心点外的圆弧
                ctx.beginPath()
                ctx.moveTo(sx, sy)
                ctx.lineTo(sx + len * Math.cos(ang), sy + len * Math.sin(ang))
                ctx.stroke()
            }

            function dot() { // 环绕封面一圈的圆点
                for(let i = 0; i < simple; i++){
                    ctx.beginPath()
                    let angle = i / simple * 2 * pi
                    ctx.arc(center + 100 * unit * Math.cos(angle), center + 100 * unit * Math.sin(angle), lineW / 2, 0, lineW / 2 * pi)
                    ctx.closePath()
                    ctx.fill()
                }
            }

            function draw(){
                if(!player.paused){
                    ctx.clearRect(0, 0, w, w)
                    analyser.getByteFrequencyData(arr)
                    ctx.lineCap = "round"
                    ctx.lineWidth = lineW
                    // debugger
                    for(let i = 0; i < simple; i++){
                        let angle = i / simple * 2 * pi
                        let len = arr[parseInt(i * k * 0.6)] / 255 * 45 * unit // 归一化值至[0, 45]区间
                        
                        line(angle, len)
                    }
                }
            }

            let prevTime = new Date().getTime()

            function loop() {
                let curTime = new Date().getTime()
                if(curTime - prevTime > 30){
                    prevTime = curTime
                    draw()
                }
                requestAnimationFrame(loop)
            }

            loop()
        }
    },
    mounted() {
        if(this.showAudio) {
            this.drawAudio()
        }
    }
}
</script>

<style lang="scss" scoped>
    @keyframes rotate{
        0%{
            transform: rotate(0deg);
        }
        50%{
            transform: rotate(180deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
    .canvas{
        position: relative;
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
    }
    .container{
        position: relative;
        flex: 1;
    }
    .func{
        display: flex;
        height: rem(40);
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-around;
    }
    .func-btn{
        color: #fff;
    }
    .cover{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: rem(180);
        height: rem(180);
        border-radius: 50%;
        animation: rotate 32s linear infinite;
    }
    .cover-pause{
        animation-play-state: paused; /* >= IE10 */
    }
    #can{
        position: absolute;
        display: block;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }
    .op-title{
        box-sizing: border-box;
        margin: 0;
        padding: 0 rem(5);
        font-size: 12px;
        line-height: rem(40);
    }
</style>