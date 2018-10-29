<template>
  <i id="icon" v-show="isShow" class="icon">&#xe637;</i>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    name: "index",
    props: ['item'],
    data() {
      return {}
    },
    computed: {
      ...mapState({
        fileUrls: state => state.chat.fileUrls
      }),
      isShow() {
        if (this.fileUrls.length && this.item) {
          return this.fileUrls.findIndex(n => n.id === this.item.id) > -1
        }
        return false
      }    
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'
  #icon
    absolute()
    square(20px)
    line-height:20px !important
    bottom:0
    right:0
    fn(20px)
    color(green)
</style>
