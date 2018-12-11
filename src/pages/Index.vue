<template>
    <section class="index">
        <section class="index-tab">
            <mu-tabs :value.sync="curTab" style="height: 100%;" color="#f5222d" indicator-color="#fff" center>
                <mu-tab class="tab-item">歌单</mu-tab>
                <mu-tab class="tab-item">电台</mu-tab>
            </mu-tabs>
        </section>
        <router-view class="index-container"></router-view>
    </section>
</template>

<script>
export default {
    name: 'Index',
    data() {
        return {
            curTab: 0,
            tab: ['mylist', 'myradio']
        }
    },
    methods: {
        changeTab(val) {
            this.$router.push({name: this.tab[val]})
        }
    },
    created() {
        this.changeTab(this.curTab)
        this.$store.commit('changeTitle', this.$store.state.userInfo.nickname)
    }
}
</script>

<style scoped>
    .index{
        text-align: center;
    }
    .index-tab{
        height: 40rem;
    }
    .tab-item{
        font-size: 14px;
    }
</style>