<template>
    <section class="list">
        <Banner/>
        <FunGroup/>
    </section>
</template>

<script>
import Banner from '../components/Banner'
import FunGroup from '../components/FunGroup'

export default {
    name: 'MyList',
    components: {
        Banner,
        FunGroup
    }
}
</script>