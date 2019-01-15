<template>
    <section class="loading">
        <p class="text">拼命加载中</p>
    </section>
</template>

<script>
/**
 * 加载中效果……
 */
export default {
    name: 'Loading'
}
</script>

<style lang="scss" scoped>
    @keyframes loading{
        0%{
            content: '.';
        }
        50%{
            content: '..';
        }
        100%{
            content: '...';
        }
    }
    .text{
        margin: 0;
        line-height: rem(100);
        text-align: center;
        color: #333;
        &::after{
            content: '';
            animation: loading 1s linear infinite;
        }
    }
</style>
