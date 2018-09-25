<template>
  <div id="chat_frame" @mousewheel.stop="doNoting">
    <div class="chat_left">
      <ChatTitle :dataId='dataId' @hideRightBar='hideRightBar'></ChatTitle>
      <ChatDetail :dataId='dataId'></ChatDetail>
      <InputFrame></InputFrame>
    </div>
    <div class="chat_right">
      <UserInfo v-show='showUserInfo'></UserInfo>
    </div>
  </div>
</template>

<script>
  import ChatTitle from './chatTitle'
  import ChatDetail from './chatDetail'
  import InputFrame from './inputFrame'
  import UserInfo from './userInfo'
  import Ueditor from "../public/Ueditor"
  // import {mapState} from 'vuex'

  export default {
    name: "chat_frame",
    data() {
      return {
        filter : false,
        showUserInfo: true
      }
    },
    props: ['dataId'],
    components: {ChatTitle, InputFrame, ChatDetail, UserInfo, Ueditor},
    methods: {
      hideRightBar() {
        this.showUserInfo = !this.showUserInfo
      },
      doNoting() {}
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'
  .slide-fade-enter-active
    transition: all .8s ease
  .slide-fade-leave-active
    transition: all 0s cubic-bezier(1.0, 0.5, 0.8, 1.0)
  .slide-fade-enter, .slide-fade-leave-to
    transform: translateX(10px)
    opacity: 0

  #chat_frame
    relative()
    width: 100%
    height: 100%
    flex:1
    flex_()
    bgColor(#f5f5f5)
    .chat_left
      relative()
      bgColor(#efefef)
      flex:1
      .top
        height:58px
      .middle
        absolute()
        right:0
        left:0
        top:58px
        bottom:200px
        // height: calc(100% - 258px)
        border-top: 1px solid #ddd
        border-bottom: 1px solid #ddd
        overflow-y:auto
        overflow-x: hidden
      .end
        absolute()
        bottom:0
        left:0
        right:0
        height: 200px
        bgColor(#fff)
    .chat_right
      width:234px
      padding:8px
      bgColor(#fafafa)
      border-left:1px solid #ddd
</style>
