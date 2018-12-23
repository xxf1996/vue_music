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
/**
 * 首页
 */
export default {
    name: 'Index',
    data() {
        return {
            curTab: 0,
            tab: ['mylist', 'myradio']
        }
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo
        },
        pageInfo() {
            return {
                left: 1,
                right: 15,
                title: (this.userInfo.profile || {}).nickname
            }
        }
    },
    methods: {
        changeTab(val) {
            this.$router.push({name: this.tab[val]})
        },
        initPage() {
            this.$store.dispatch('setPage', this.pageInfo)
        }
    },
    created() {
        this.changeTab(this.curTab)
        if(this.userInfo.nickname){
            this.initPage()
        }
    },
    activated() { // keep-alive组件激活时运行
        this.initPage()
    },
    watch: {
        userInfo(val){
            this.initPage()
        }
    }
}
</script>

<style lang="scss" scoped>
    .index-tab{
        height: rem(40);
    }
    .tab-item{
        font-size: 14px;
    }
</style>