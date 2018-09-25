<template>
  <div id="login">
    <div class="form">
      <h1>我是登陆页面</h1>
      <div class="name input_div">
        <input placeholder='请输入用户名' v-model="username">
      </div>
      <div class="psw input_div">
        <input type='password' placeholder='请输入密码' v-model="psw">
      </div>
      <div class='submit' @click="submit">登陆</div>
      <div class="router">
        <Row>
          <i-col span="8" style="text-align: left">
            <a>记住密码</a>
          </i-col>
          <i-col span="8">
            <router-link to="/register">注册</router-link>
          </i-col>
          <i-col span="8" style="text-align: right">
            <a>忘记密码</a>
          </i-col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
  // import md5 from '@/assets/js/md5'
  import {mapGetters} from 'vuex'

  export default {
    name: 'home',
    data () {
      return {
        logining: false,
        username: '',
        psw : ''
      }
    },
    computed : {
      ...mapGetters(['public/user'])
    },
    methods: {
      async submit () {
        if (!this.logining) {
          this.logining = true
          let res = await this.login({username : this.username, psw : this.psw})
          let obj = res.data || {}
          if (obj.code === 1) {
            this.logining = false
            // this.$store.dispatch('public/getRouteMap')
            this.$router.push('/manager')
          }
        }
        setTimeout(() => {
            this.logining = false
        }, 5000);
      }
    },
    components: {}
  }
</script>

<style lang="stylus">
  @import '~@/assets/css/index.styl'
  #login
    setMiddleContainer()
    margin: 0 auto
    height: 100%
    .form
      setMiddleContent()
      setMiddleContentVertical()
      width:400px
      .input_div
        margin:10px 0
        input
          width: 100%
          height:40px
          padding-left:20px
          border:1px solid #ddd
      .submit
        margin-top:20px
        vertical(40px)
        color()
        bgColor(blue)
        cursor:pointer
      .router
        margin-top:10px
</style>
