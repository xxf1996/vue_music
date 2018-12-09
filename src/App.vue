<template>
    <section id="app" :style="full">
        <Header :title="headTitle" :left="left" :right="right" />
        <section class="main">
            <router-view></router-view>
        </section>
    </section>
</template>

<script>
import Header from './components/Header'

export default {
    name: 'App',
    data() {
        return {
            full: {
                height: 0
            }
        }
    },
    computed: {
        left() {
            return this.$store.state.headLeft
        },
        right() {
            return this.$store.state.headRight
        },
        headTitle() {
            return this.$store.state.headTitle
        }
    },
    components: {
        Header
    },
    methods: {
        rem(size = 375) {
            document.documentElement.style.fontSize = document.documentElement.clientWidth / size + 'px'
        }
    },
    created() {
        this.full.height = window.innerHeight + 'px'
        this.rem()
        window.addEventListener('resize', this.rem)
    }
}
</script>

<style>
    body{
        margin: 0;
        padding: 0;
        font-size: 14px;
    }
    #app{
        display: flex;
        flex-flow: column nowrap;
    }
    .main{
        flex: 1;
        overflow-x: hidden;
        overflow-y: auto;
    }
</style>
