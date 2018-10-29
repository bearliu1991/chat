<template>
    <div id="selfdefine_pop" v-show="showPop" @hide="hide" @click="hide">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "detailPop",
    data() {
      return {
          isShow: false
      }
    },
    model: {
        prop: 'showPop',
        event: 'close'
    },
    props: ['showPop'],
    computed: {

    },
    methods: {
      hide() {
          this.$emit('close', false)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'
  #selfdefine_pop
    fixed()
    top: 0
    left: 0
    right: 0
    bottom: 0
    bgColor(rgba(0, 0, 0, 0.5))
    setMiddle()
    z-index:9999999
</style>
