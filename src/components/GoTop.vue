<template>
    <div id="go_top" @click="goTop">
      <span v-if="menuItem && menuItem.isTop">取消</span>置顶
    </div>
</template>

<script>
  export default {
    name: "GoTop",
    data() {
      return {}
    },
    props: ['menuItem'],
    methods: {
      goTop() {
        this.$store.dispatch('chat/reorder', this.menuItem.id)
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
