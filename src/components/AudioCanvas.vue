<template>
    <section class="canvas">
        <section class="container">
            <img :src="cover" alt="cover" :class="['cover', playing? '': 'cover-pause']">
            <canvas id="can"></canvas>
        </section>
        <section class="func">
            <Icon class="func-btn" type="26" size="24rem" @click.native="toComment" />
            <Icon class="func-btn" type="27" size="24rem" />
        </section>
    </section>
</template>

<script>
/**
 * 绘制音乐频谱，显示旋转封面
 * @prop {String} cover 歌曲封面地址
 * @prop {String} song 歌曲id
 */
export default {
    name: 'AudioCanvas',
    props: ['cover', 'song'],
    computed: {
        analyser() {
            return this.$store.state.analyser
        },
        playing() {
            return this.$store.state.playing
        }
    },
    methods: {
        toComment() {
            this.$router.push(`/comment/song/${this.song}`)
        }
    },
    mounted() {
        let rem = parseFloat(document.documentElement.style.fontSize)
        let w = rem * 360
        let can = document.getElementById('can')
        let ctx = can.getContext('2d')
        let [analyser, player] = [this.analyser, this.$player]
        let center = w / 2
        let arr = new Uint8Array(analyser.frequencyBinCount)
        let pi = Math.PI
        
        can.width = w
        can.height = w
        ctx.strokeStyle = "#39f"
        ctx.fillStyle = "#39f"

        function draw(){
            ctx.clearRect(0, 0, w, w)
            if(player.paused){
                for(let i = 0; i < 64; i++){
                    ctx.beginPath()
                    let angle = i / 32 * pi
                    ctx.arc(center + 100 * rem * Math.cos(angle), center + 100 * rem * Math.sin(angle), 2, 0, 2 * pi)
                    ctx.closePath()
                    ctx.fill()
                }
            }else{
                analyser.getByteFrequencyData(arr)
                ctx.lineCap = "round"
                ctx.lineWidth = 4
                for(let i = 0; i < 64; i++){
                    let angle = i / 32 * pi
                    let [sx, sy] = [center + 100 * rem * Math.cos(angle), center + 100 * rem * Math.sin(angle)]
                    let len = arr[i * 16] / 3
                    ctx.beginPath()
                    ctx.moveTo(sx, sy)
                    ctx.lineTo(sx + len * Math.cos(angle), sy + len * Math.sin(angle))
                    ctx.stroke()
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
}
</script>

<style scoped>
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
        height: 40rem;
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
        width: 180rem;
        height: 180rem;
        border-radius: 50%;
        animation: rotate 15s linear infinite;
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
</style>