<template>
    <section class="search">
        <div class="option">
            <mu-radio class="option-item" v-model="type" :value="1" label="单曲"></mu-radio>
            <mu-radio class="option-item" v-model="type" :value="10" label="专辑"></mu-radio>
            <mu-radio class="option-item" v-model="type" :value="100" label="歌手"></mu-radio>
            <mu-radio class="option-item" v-model="type" :value="1000" label="歌单"></mu-radio>
        </div>
        <div class="sear">
            <mu-text-field class="saerch-input" v-model="content" placeholder="请输入搜索内容……" full-width @keyup.enter="getResult"></mu-text-field>
        </div>
        <section class="tip">
            <Loading v-show="ing"/>
            <p class="tip-text" v-show="!ing">{{results.length?`『${content}』的搜索结果`: '没有找到合适的结果'}}</p>
        </section>
        <SongList class="content" :list="results" />
    </section>
</template>

<script>
import SongList from '../components/SongList'
import Loading from '../components/Loading'

export default {
    name: 'Search',
    components: {
        SongList,
        Loading
    },
    data() {
        return {
            pageInfo: {
                left: 23,
                right: 24,
                title: '搜索页'
            },
            results: [],
            type: 1,
            content: '',
            ing: false
        }
    },
    methods: {
        initPage() {
            this.$store.dispatch('setPage', this.pageInfo)
        },
        getResult() {
            this.ing = true
            this.$req('/search', {
                type: this.type,
                keywords: this.content,
                limit: 30
            }).then(res => {
                this.ing = false
                if(res.data.code === 200) {
                    this.results = res.data.result.songs
                }
            }).catch(err => {
                throw err
            })
        }
    },
    created() {
        this.initPage()
    }
}
</script>

<style lang="scss" scoped>
    .option{
        margin-top: rem(32);
        text-align: center;
    }
    .option-item{
        margin: 0 rem(6);
    }
    .sear{
        box-sizing: border-box;
        padding: rem(10);
    }
    .tip{
        margin: rem(10) 0;
    }
    .tip-text{
        margin: 0;
        text-align: center;
    }
    .content{
        margin-top: rem(10);
    }
</style>
