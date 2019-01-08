<template>
    <section class="login">
        <mu-text-field v-model="uid" label="用户id" help-text="网易云音乐账户ID" @change="check" label-float full-width></mu-text-field>
        <p class="login-btn">
            <mu-button class="login-enter" :disabled="empty" @click.native="enter">确认</mu-button>
        </p>
    </section>
</template>

<script>
/**
 * 『伪』登录页，利用网易云uid进行信息获取，算不上真正的登录；
 */
export default {
    name: 'Login',
    data() {
        return {
            uid: null
        }
    },
    computed: {
        empty() {
            return this.uid === null || this.uid === ''
        }
    },
    methods: {
        check(val) {
            if(/[\D]/g.test(val)){
                this.uid = null
            }
        },
        enter() {
            this.$req('/user/detail', {
                uid: this.uid
            }).then(res => {
                if(res.data.code === 200){
                    localStorage.setItem('X_uid', this.uid)
                    this.$store.commit('changeUser', this.uid)
                    this.$store.commit('changeInfo', res.data)
                    this.$router.push({name: 'index'})
                }
            }).catch(err => {
                throw err
            })
        }
    },
    mounted() {
        this.$store.commit('changeClear', true)
    },
    beforeRouteLeave(to, from, next) {
        this.$store.commit('changeClear', false)
        next()
    }
}
</script>

<style lang="scss" scoped>
    .login{
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: rem(240);
    }
    .login-btn{
        margin: rem(12) 0;
        text-align: center;
    }
    .login-enter{
        background-color: $theme_bg;
        color: $theme_text;
    }
    .disabled{
        background-color: #eee;
        color: #333;
    }
</style>
