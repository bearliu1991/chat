<template>
    <div id="translate" @click="translate">翻译</div>
</template>

<script>
  import { mapState } from "vuex"
  export default {
    name: "Translate",
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
      translate() {
        let id = this.menuItem.id
        if (this.id !== undefined && (id !== undefined)) {
          let msgArr = this.allMsg[this.id] ? this.allMsg[this.id].msgs : []
          if (msgArr.length) {
            let index = msgArr.findIndex((n) => n.id === id)
            let obj = msgArr[index]
            if (obj.translate) {
              return false
            } else {
              this.$store.dispatch('chat/translate', {id: this.id, msgId: msgArr[index].id, index: index})
            }
          }
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
