<template>
    <section class="index">
        <section class="index-tab">
            <mu-tabs :value.sync="curTab" style="height: 100%;" color="#f5222d" indicator-color="#fff" center>
                <mu-tab class="tab-item" v-for="(tab, i) in tabs" :key="i" :to="tab.path" tag="li">
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
                left: 1,
                right: 15,
                title: this.nickname
            }
        }
    },
    methods: {
        initPage() {
            this.$store.dispatch('setPage', this.pageInfo)
        }
    },
    created() {
        if(this.nickname){
            this.$router.replace({name: 'mylist'})
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
        list-style-type: none;
    }
</style>