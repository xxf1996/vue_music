<template>
    <section class="fun">
        <section class="fun-item" v-for="(item, i) in list" :key="i">
            <div class="fun-container">
                <Icon class="fun-icon" :type="item.type"/>
            </div>
            <p class="fun-title">{{item.name}}</p>
        </section>
    </section>
</template>

<script>
/**
 * 首页图标功能区域
 */
export default {
    name: 'FunGroup',
    data() {
        return {
            list: [
                {
                    type: 6,
                    name: '私人FM'
                },
                {
                    type: 5,
                    name: '每日推荐'
                },
                {
                    type: 0,
                    name: '歌单'
                },
                {
                    type: 7,
                    name: '排行榜'
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
    .fun{
        box-sizing: border-box;
        padding: 12rem 8rem;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        border-bottom: 1px solid #ddd;
    }
    .fun-item{
        width: 70rem;
    }
    .fun-container{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40rem;
        height: 40rem;
        margin: 10rem auto;
        border-radius: 50%;
        background-color: $theme_bg;
        box-shadow: 0 0 5rem lighten($theme_bg, 15%);
    }
    .fun-icon{
        color: $theme_text;
    }
    .fun-title{
        margin: 0;
        font-size: 12px;
        text-align: center;
    }
</style>
