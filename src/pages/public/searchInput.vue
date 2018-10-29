<template>
  <div id="search_input">
    <span class="icon seach_icon">&#xe7d4;</span>
    <input :class="isFocus ? 'focus' : ''" type="text" placeholder="搜索"
           @focus="focus" @blur="blur" @change="getArr" v-model="inputVal">
    <i class="icon clear" @click="clear" v-show="inputVal">&#xe617;</i>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "index",
    data() {
      return {
        isFocus: false,
        inputVal: ''
      }
    },
    computed: {
      ...mapState({
        records: state => state.chat.contactRecord
      })
    },
    methods: {
      focus() {
        this.isFocus = true
      },
      blur() {
        this.isFocus = false
        if (this.inputVal) {

        }
      },
      clear() {
        this.inputVal = ''
        this.$store.commit('chat/SHOW_SEARCH_RES', false)
        this.$store.commit("chat/SEARCH_ACTIVE")
      },
      async getArr() {
        let val = this.inputVal.trim()
        if (val) {
          let res = await this.searchUser()
          let data = res.data
          if (data.code === 1) {
            this.$store.commit('chat/CHAT_RES', data.data)
            this.$store.commit('chat/SHOW_SEARCH_RES', true)
          }
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'
  #search_input
    relative()
    width: 197px
    float: left
    margin-right: 10px
    .seach_icon
      absolute()
      font-size: 12px
      left: 7px
      top: 8px
    input
      width: 197px
      height: 25px
      bgColor(#dbd9d8)
      padding-left: 25px
      radius(3px)
      &.focus
        bgColor(#fff)
    .clear
      absolute()
      right: 4px
      top: 7px
      cursor()
</style>
