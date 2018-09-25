<template>
    <div id="hover">
      <div class="con_ret"></div>
      <div class="con">
        <slot></slot>
      </div>
    </div>
</template>

<script>
  export default {
    name: "hover",
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'
  #hover
    absolute()
    top:0
    bottom:0
    right:0
    left:0
    .con_ret
      width:15px
      height:15px
      transform:rotate(45deg)
      inline()
      z-index:0
      margin:0 auto
      box-shadow:0 0 4px 2px #ddd
      bgColor(#fff)
    .con
      absolute()
      bgColor(#fff)
      top:22px
      bottom:0
      left:0
      right:0
      z-index:1
      margin-top:-15px
      boxCommon()
</style>
