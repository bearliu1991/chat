<template>
  <div id="editor">
    <span class="text" v-if="!showInput" @click="editor">{{info}}</span>
    <input class="ipt" ref="ipt" v-if="showInput" type="text" v-model="inputInfo" @blur="blur">
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  props: {
    type: {
      default: "name",
      type: String
    },
    propInfo: {
      default: "",
      type: [String, Number]
    }
  },
  data() {
    return {
      showInput: false,
      inputInfo: null
    };
  },
  methods: {
    editor() {
      this.showInput = true
      this.inputInfo = this.info
      this.$nextTick(() => {
        this.$refs.ipt.focus()
      });
    },
    blur() {
      this.showInput = false
      this.$store.dispatch('chat/changeInfo', {id: this.chatId, type: this.type, info: this.inputInfo})
    }
  },
  computed: {
    ...mapState({
      allChator: state => state.chat.allChator,
      chatId: state => state.chat.chatId
    }),
    info() {
      return this.propInfo
    }
  },
  watch: {
    // inputInfo(val) {
    //   this.info = val
    // },
    // info(val) {
    //   this.inputInfo = val
    // }
  }
};
</script>

<style lang="stylus" scoped>
#editor
  vertical-align middle
  height 28px
  max-width 146px
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
  .text
    cursor pointer
    position relative
    padding 3px
    padding-left 0
    border solid 1px #fafafa
    border-radius 2px
    &:hover
      border solid 1px #00c1de
  .ipt
    display inline-block
    height 22px
    line-height 22px
    padding 3px
    padding-left 0
    background-color #fafafa
    border solid 1px #fafafa
</style>
