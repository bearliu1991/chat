<template>
    <div id="notice">
      <i class="icon fans" v-if="infoType === 1">&#xe6b4;</i>
      <i class="icon system" v-if="infoType === 2">&#xe669;</i>
      <i class="icon customer" v-if="infoType === 3">&#xe616;</i>
      <span><slot></slot></span>
    </div>
</template>

<script>
  export default {
    name: "notice",
    data() {
      return {}
    },
    props: ['infoType', 'msgType'],
    methods: {}
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'
  #notice
    max-width:80%
    white-space:pre
    /*word-break:nowrap*/
    clear()
    square(18px)
    padding:0 20px
    radius(3px)
    margin:4px auto
    bgColor(#dad8d8)
    color()
    i
      margin-right:5px
    .fans
      color(skyblue)
    .system
      color(red)
    .customer
      color(yellow)
</style>
