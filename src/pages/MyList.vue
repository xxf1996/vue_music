<template>
    <section class="list">
        <Banner/>
        <FunGroup/>
        <section class="list-one">
            <p class="list-title">创建的歌单</p>
            <section class="list-container">
                <ListBlock v-for="(item, i) in myShowList" size="110rem" :info="item" :key="i"/>
            </section>
        </section>
        <section class="list-one">
            <p class="list-title">推荐歌单</p>
            <section class="list-container">
                <ListBlock v-for="(item, i) in myCommend" size="110rem" :info="item" :key="i"/>
            </section>
        </section>
    </section>
</template>

<script>
import Banner from '../components/Banner'
import FunGroup from '../components/FunGroup'
import ListBlock from '../components/ListBlock'

export default {
    name: 'MyList',
    components: {
        Banner,
        FunGroup,
        ListBlock
    },
    data() {
        return {
            myList: [],
            commend: []
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

<style scoped>
    .list-one{
        box-sizing: border-box;
        padding: 12rem 7.5rem;
        text-align: left;
    }
    .list-title{
        margin: 6rem 0;
        font-size: 16px;
    }
    .list-title::after{
        display: inline-block;
        content: '>';
        padding: 0 6rem;
        color: #aaa;
    }
    .list-container{
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
    }
</style>