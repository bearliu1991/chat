<template>
    <div id="transfer_to_text" @click="transText">转换成文字</div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "TransferToText",
    data() {
      return {}
    },
    props: ['menuItem', 'id'],
    computed: {
      ...mapState({
        allMsg: state => state.chat.allMsg
      })
    },
    methods: {
      transText() {
        let id = this.menuItem.id
        if (this.id !== undefined && (id !== undefined)) {
          let msgArr = this.allMsg[this.id] ? this.allMsg[this.id].msgs : []
          if (msgArr.length) {
            let index = msgArr.findIndex((n) => n.id === id)
            let obj = msgArr[index]
            if (obj.transText) {
              return false
            } else {
              this.$store.dispatch('chat/transText', {id: this.id, msgId: msgArr[index].id, index: index})
            }
          }
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
