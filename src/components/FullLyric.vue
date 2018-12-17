<template>
    <section class="lyric">
        <section id="lrc">
            <p v-for="(item, i) in lrc" :key="i" :class="['line', i === cur? 'line-cur': '']">
                {{item.content === ''? '\n': item.content}}
            </p>
        </section>
    </section>
</template>

<script>
export default {
    name: 'FullLyric',
    props: ['lrc', 'cur'],
    data() {
        return {
            container: null
        }
    },
    methods: {
        toCurLine() {
            this.container.style.marginTop = -this.container.querySelector('.line-cur').offsetTop + 'px'
        }
    },
    mounted() {
        this.container = document.getElementById('lrc')
        this.toCurLine()
    },
    updated() { // prop值改变时触发子组件更新，而watch无法监听到
        this.toCurLine()
    },
    watch: {
        cur() {
            this.toCurLine()
        }
    }
}
</script>

<style scoped>
    .lyric{
        position: relative;
        box-sizing: border-box;
        height: 100%;
        padding: 0 12rem;
        overflow-x: hidden;
        overflow-y: auto;
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
        padding: 8rem 5rem;
        text-align: center;
        color: #ddd;
    }
    .line-cur{
        font-size: 16px;
        color: #fff;
    }
</style>