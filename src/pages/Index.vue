<template>
    <section class="index">
        <section class="index-tab">
            <mu-tabs :value.sync="curTab" style="height: 100%;" color="#f5222d" indicator-color="#fff" center>
                <mu-tab class="tab-item" v-for="(tab, i) in tabs" :key="i" :to="tab.path" tag="li" event="tap">
                    {{tab.name}}
                </mu-tab>
            </mu-tabs>
        </section>
        <keep-alive include="MyList, MyRadio">
            <router-view class="index-container"></router-view>
        </keep-alive>
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
            tabs: [
            {
                path: 'mylist',
                name: '歌单'
            },
            {
                path: 'myradio',
                name: '电台'
            }
            ]
        }
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo
        },
        nickname() {
            return (this.userInfo.profile || {}).nickname
        },
        pageInfo() {
            return {
                left: 19,
                right: 15,
                title: this.isVisitor?'游客模式': this.nickname
            }
        },
        isVisitor() {
            return this.$store.state.isVisitor
        }
    },
    methods: {
        initPage() {
            this.$store.dispatch('setPage', this.pageInfo)
        }
    },
    created() {
        if(this.nickname || this.$store.state.isVisitor){
            this.$router.replace({name: 'mylist'})
            this.initPage()
        }
    },
    activated() { // keep-alive组件激活时运行
        if(this.nickname || this.$store.state.isVisitor){
            this.$router.replace({name: 'mylist'})
            this.initPage()
        }
    },
    watch: {
        userInfo(val){
            this.$router.replace({name: 'mylist'})
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
        list-style-type: none;
    }
</style>