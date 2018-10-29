<template>
    <div id="new_win" @click="newWin">
      <span>在独立窗口打开</span>
    </div>
</template>

<script>
  export default {
    name: "NewWin",
    data() {
      return {}
    },
    props: ['menuItem'],
    methods: {
      newWin() {
        this.$store.commit('chat/NEW_Win', this.menuItem.id)
        this.$store.commit('chat/CHAT_ID', this.menuItem.id)
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
