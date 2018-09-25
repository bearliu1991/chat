<template>
  <div id="msg_filter">
    <ul>
      <li v-for="(val, key, index) in chooses" :key='index' @click="setIndex(key)">
        <span class="chat icon" v-if="filter(key)">&#xe659;</span>
        <span class="chat icon" v-else></span>
        <i>{{val}}</i>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "msgFilter",
    data() {
      return {
        isChoose: true,
        chooses: { '0': '聊天内容', '1': '粉丝轨迹', '2': '客服操作', '3': '系统通知' }
      }
    },
    computed: {
      ...mapState({
        allChator: state => state.chat.allChator,
        allMsg: state => state.chat.allMsg
      })
    },
    props: ['id'],
    methods: {
      filter(key) {
        let msgTypes = this.allChator[this.id + ''].msgTypes
        if (msgTypes) {
          return msgTypes.findIndex(item => key + '' === item) > -1
        } else {
          return true
        }
      },
      setIndex(key) {
        this.$store.commit('chat/SET_MSG_TYPE', {id: this.id, key: key})
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'
  #msg_filter
    width:100px
    height:120px
    left:-40px
    ul
      height:110px
      setColumn()
      li
        flex:1
        setMiddle()
        .icon
          square(15px)
          border:1px solid #ddd
          mr(5px)
</style>
