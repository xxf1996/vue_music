<template>
    <section class="canvas">
        <img :src="cover" alt="cover" :class="['cover', playing? '': 'cover-pause']">
    </section>
</template>

<script>
export default {
    name: 'AudioCanvas',
    props: ['cover'],
    computed: {
        analyser() {
            return this.$store.state.analyser
        },
        playing() {
            return this.$store.state.playing
        }
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
    }
    .cover{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 200rem;
        height: 200rem;
        border-radius: 50%;
        animation: rotate 15s linear infinite;
    }
    .cover-pause{
        animation-play-state: paused; /* >= IE10 */
    }
</style>