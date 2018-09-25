<template>
  <div id="chat">
    <ContactRecord></ContactRecord>
    <div class="nothing" v-if="chatId < 0 || (newWinRecord.length > 0)">
      <span>我是占位符</span>
    </div>
    <div class="right_wrap" v-else>
      <ChatFrame :dataId="chatId"></ChatFrame>
    </div>
  </div>
</template>

<script>
  import ContactRecord from './contactRecord'
  import ChatFrame from './chatFrame'
  // import UserInfo from './userInfo'
  import {mapState} from 'vuex'

  export default {
    name: 'home',
    data() {
      return {
        status: 1
      }
    },
    computed: {
      ...mapState({
        newWinRecord: state => state.chat.newWinRecord,
        chatId: state => state.chat.chatId
      })
    },
    created() {},
    components: {ContactRecord, ChatFrame},
    methods: {}
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'
  #chat
    flex_()
    height: 100%
    .right_wrap
      flex:1
      height: 100%
      flex_()
    .nothing
      flex: 1
      fn(40px)
      bgColor(#fff)
      setMiddle()
</style>
