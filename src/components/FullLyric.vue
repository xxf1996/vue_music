<template>
    <section class="lyric">
        <p class="no" v-if="noLyric">该歌曲没有歌词</p>
        <section id="lrc" v-else>
            <p v-for="(item, i) in lrc" :key="i" :class="['line', i === cur? 'line-cur': '']">
                {{item.content === ''? '\n': item.content}}
            </p>
        </section>
    </section>
</template>

<script>
/**
 * 全屏滚动歌词
 * @prop {Array} lrc 歌词信息数组，数组元素为每行歌词（对象）
 * @prop {Number} cur 当前播放进度对应哪一句歌词的索引
 */
export default {
    name: 'FullLyric',
    props: ['lrc', 'cur'],
    data() {
        return {
            container: null
        }
    },
    computed: {
        noLyric() {
            return !this.lrc.length
        }
    },
    methods: {
        toCurLine() {
            this.container.style.marginTop = -this.container.querySelector('.line-cur').offsetTop + 'px'
        }
    },
    mounted() {
        this.container = document.getElementById('lrc')
        if(!this.noLyric){
            this.toCurLine()
        }
    },
    updated() { // prop值改变时触发子组件更新，而watch无法监听到
        if(!this.container){ // v-if切换时可能之前#lrc没有渲染！
            this.container = document.getElementById('lrc')
        }
        this.toCurLine()
    },
    watch: {
        cur() {
            if(!this.container){ // v-if切换时可能之前#lrc没有渲染！
                this.container = document.getElementById('lrc')
            }
            this.toCurLine()
        }
    }
}
</script>

<style lang="scss" scoped>
    .lyric{
        position: relative;
        box-sizing: border-box;
        height: 100%;
        padding: 0 rem(12);
        overflow-x: hidden;
        overflow-y: auto;
    }
    .no{
        position: absolute;
        top: 50%;
        left: 0;
        margin: 0;
        width: 100%;
        text-align: center;
        color: #fff;
    }
    #lrc{
        position: absolute;
        width: 100%;
        top: 50%;
        left: 0;
        transition: margin-top 0.3s ease-in-out;
    }
    .line{
        margin: 0;
        padding: rem(8) rem(5);
        text-align: center;
        color: #ddd;
    }
    .line-cur{
        font-size: 16px;
        color: #fff;
    }
</style>