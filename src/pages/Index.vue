<template>
    <section class="index">
        <section class="index-tab">
            <mu-tabs :value.sync="curTab" style="height: 100%;" color="#f5222d" indicator-color="#fff" center>
                <mu-tab class="tab-item">推荐</mu-tab>
                <mu-tab class="tab-item">电台</mu-tab>
            </mu-tabs>
        </section>
        <Banner/>
        <FunGroup/>
    </section>
</template>

<script>
import Banner from '../components/Banner'
import FunGroup from '../components/FunGroup'

export default {
    name: 'Index',
    components: {
        Banner,
        FunGroup
    },
    data() {
        return {
            curTab: 0
        }
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