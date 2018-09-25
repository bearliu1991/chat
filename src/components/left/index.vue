<template>
  <div id="left">
    <div class="left_portrait">
      <Poptip width="240" trigger="click" placement="right-start">
        <div class="innner_portrait" @mouseover="getData"></div>
        <div class="api" slot="content">
          <PortraitCont></PortraitCont>
        </div>
      </Poptip>
    </div>
    <div class="username" v-show="userInfo && userInfo.nickName">hello,{{userInfo && userInfo.nickName}}</div>
    <a href="javascript:void(0)" class="go_out" v-show="userInfo && userInfo.nickName" @click="submit">注销</a>
    <div class="routes">
      <router-link class="icon" v-for="(val, key, index) in pathObj" :to="key" :key="index" v-html="val"></router-link>
    </div>
    <div class="settings icon">&#xe60b;</div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import PortraitCont from './leftPortrait'

  export default {
    name: "hello",
    data() {
      return {
        idx: 0,
        pathObj : {'/manager': '&#xe7a8;', '/manager/second': '&#xe67c;', '/manager/third': '&#xe62f;'}
      }
    },
    created() {

    },
    watch : {
      '$route' (to, from) {}
    },
    computed: {
      ...mapState({
        userInfo : state => { return state.public.userInfo }
      })
    },
    components : {PortraitCont},
    methods: {
      async submit () {
        await this.logout()
        this.$router.push('/login')
      },
      getData() {
        this.$store.dispatch('public/getUserPortrait')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'

  #left
    display:flex
    height: 100%
    relative()
    flex-direction:column
    gradientBlue()
    .left_portrait
      margin-top: 35px
      height: 50px
      width:50px
      bgColor(red)
      radius(50%)
      margin:10px auto
      .innner_portrait
        square(50px)
        cursor()
    .username
      color()
    .go_out
      display:inline-block
      bgColor(#fff)
      margin:10px auto
      padding:5px 10px
      radius(5px)
    .routes
      column()
      a
        margin:20px auto
        padding:5px
        fn(24px)
        color(#fff)
        display: block
        &.router-link-active
          color(red)
        &:nth-child(2)
          fn(33px)
    .settings
      left: 28px
      absolute()
      bottom:20px
      color: #fff
      fn(22px)

</style>
