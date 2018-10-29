<template>
  <div id="pop" v-show="isPop" :style="{top: position.y + 'px', left: position.x + 'px'}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "pop",
    data() {
      return {}
    },
    model:{
      prop: 'isPop',
      event: 'close'
    },
    created() {},
    props: ['isPop', 'position'],
    methods: {}
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'
  #pop
    position:fixed
    boxShadow(0 0 5px 1px #ddd)
    bgColor(#fff)
</style>
