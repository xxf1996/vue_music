<template>
    <section class="list">
        <Banner/>
        <FunGroup/>
        <section class="list-one">
            <p class="list-title" @click="showMore(myList, '创建的歌单')">创建的歌单 <Icon type="25" :size="setRem(16)"/></p>
            <section class="list-container">
                <ListBlock v-for="(item, i) in myShowList" :size="setRem(110)" :info="item" :key="i"/>
            </section>
        </section>
        <section class="list-one">
            <p class="list-title" @click="showMore(commend, '推荐歌单')">推荐歌单 <Icon type="25" :size="setRem(16)"/></p>
            <section class="list-container">
                <ListBlock v-for="(item, i) in myCommend" :size="setRem(110)" :info="item" :key="i"/>
            </section>
        </section>
        <InfoList class="list-more" :show.sync="more">
            <p class="more-tip" slot="title">{{moreTitle}}</p>
            <section class="more-content" slot="content">
                <PicList class="more-item" v-for="(list, k) in moreList" :size="setRem(40)" :key="k" @click.native="toDetail(list.id)">
                    <img class="more-cover" :src="list.coverImgUrl" :alt="list.name" slot="cover">
                    <p class="more-title" slot="title">{{list.name}}</p>
                    <p class="more-info" slot="info">{{list.trackCount}} 首</p>
                </PicList>
            </section>
        </InfoList>
    </section>
</template>

<script>
import Banner from '../components/Banner'
import FunGroup from '../components/FunGroup'
import ListBlock from '../components/ListBlock'
import InfoList from '../components/InfoList'
import PicList from '../components/PicList'

/**
 * 首页内的歌单列表部分
 */
export default {
    name: 'MyList',
    components: {
        Banner,
        FunGroup,
        ListBlock,
        InfoList,
        PicList
    },
    data() {
        return {
            myList: [], // 当前用户创建的歌单列表
            commend: [], // 推荐的歌单列表
            more: false,
            moreTitle: 'more',
            moreList: []
        }
    },
    computed: {
        myShowList() {
            return this.myList.length > 6 ? this.myList.slice(0, 6) : this.myList
        },
        myCommend() {
            return this.commend.length > 6 ? this.commend.slice(0, 6) : this.commend
        }
    },
    methods: {
        showMore(info, title){
            this.moreList = info
            this.moreTitle = title
            this.more = true
        },
        toDetail(id) {
            this.$router.push(`/playlist/${id}`)
        }
    },
    created() {
        this.$req('/user/playlist', {
            uid: this.$store.state.uid
        }).then(res => {
            if(res.data.code === 200){
                this.myList = res.data.playlist
            }
        }).catch(err => {
            throw err
        })

        this.$req('/personalized').then(res => {
            if(res.data.code === 200){
                let result = res.data.result
                this.commend = JSON.parse(JSON.stringify(result).replace(/picUrl/g, 'coverImgUrl'))
            }
        }).catch(err => {
            throw err
        })
    }
}
</script>

<style lang="scss" scoped>
    .list-one{
        box-sizing: border-box;
        padding: rem(12) rem(7.5);
        text-align: left;
    }
    .list-title{
        margin: rem(6) 0;
        font-size: 16px;
    }
    .list-container{
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
    }
    .more-tip{
        margin: 0;
        text-indent: 1em;
        line-height: rem(40);
    }
    .more-content{
        box-sizing: border-box;
        padding: rem(5);
    }
    .more-item{
        margin-bottom: rem(6);
    }
    .more-cover{
        width: 100%;
        height: 100%;
        border-radius: rem(5);
    }
    .more-title{
        box-sizing: border-box;
        margin: 0;
        height: rem(24);
        line-height: rem(24);
    }
    .more-info{
        box-sizing: border-box;
        margin: 0;
        font-size: 12px;
        color: #aaa;
        height: rem(16);
        line-height: rem(16);
    }
</style>