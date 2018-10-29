<template>
  <div id="addInfo"
  @mouseover="getSelectionObj"
  @click="addInfo">{{type=='name'?'添加到姓名':type=='phone'?'添加到手机号':'添加到备注'}}</div>
</template>

<script>
  export default {
    name: "addInfo",
    props: {
      type: {
        default: 'name',
        type:String
      },
      id: {
        default: 0
      },
      menuItem: {
        type:Object
      }
    },
    data() {
      return {
        message: null
      }
    },
    computed: {
      info() {
        return this.message === null ? this.menuItem.info : this.message
      }
    },
    methods: {
      addInfo() {
          this.$store.dispatch('chat/setInfo', {
            type: this.type,
            id: this.id,
            info: this.info
          })
      },
      getSelectionObj() {
        let obj = window.getSelection()
        let selection = obj.toString() || obj.anchorNode.wholeText
        this.message = selection || this.menuItem.info
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'
</style>
