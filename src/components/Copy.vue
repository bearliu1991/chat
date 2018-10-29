<template>
  <div id="copy"
  @mouseover="getSelectionObj"
  @click="doCopy">复制</div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: "copy",
    data() {
      return {
        message: ''
      }
    },
    props: ['menuItem'],
    computed: {
      ...mapState({
        contextmenuInfo: state => state.chat.contextmenuInfo
      })
    },
    methods: {
      doCopy() {
        let self = this
        this.$copyText(this.message).then(function (e) {
          window.localStorage.copySelectionString = e.text;
          self.$root.Bus.$emit("close", false)
        }, function (e) {
          console.log(e)
        })
      },
      getSelectionObj() {
        switch (this.contextmenuInfo.msgType) {
          case 0:
            let obj = window.getSelection()
            let selection = obj.toString() || obj.anchorNode.wholeText
            this.message = selection || this.menuItem.info
            break
          case 1:
            this.message = '<p>woshi图片</p>'
            break
          case 2:
            this.message = '<p>woshit图文</p>'
            break
          case 3:
            this.message = '<p>woshi音频你</p>'
            break
          case 4:
            this.message = '<p>woshi视频</p>'
            break
          case 5:
            this.message = '<p>woshi链接</p>'
            break
          default:
            break
        }
      }
    }
  }
</script>

<style lang="stylus">
</style>
