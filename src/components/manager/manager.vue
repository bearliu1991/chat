<template>
    <div id="manager">
      <Left class="app_left"></Left>
      <div class="app_right">
        <transition name="fade">
          <router-view/>
        </transition>
      </div>
    </div>
</template>

<script>
  import Left from '@/components/left'
  export default {
    name: "left",
    data() {
      return {}
    },
    components: {Left},
    methods: {}
  }
</script>

<style lang="stylus" scoped>
  #manager
    height:100%
    overflow hidden
    .app_left
      width:68px
      float: left
    .app_right
      height: 100%
      float: left
      width: calc(100% - 68px)
    &::after
      clear: both
      display: block
      content: ''
</style>
