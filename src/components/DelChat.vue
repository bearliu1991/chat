<template>
  <div class="del_chat" @click="delChat">删除聊天</div>
</template>

<script>
  import { mapState } from "vuex"
  export default {
    name: "DelChat",
    data() {
      return {}
    },
    computed: {
      ...mapState({
        allMsg: state => state.chat.allMsg
      })
    },
    props: ['menuItem', 'id'],
    methods: {
      delChat() {
        let idx = this.menuItem.id
        if (this.id !== undefined) {
          this.$store.dispatch('chat/deleteMsg', {id: this.id, msgId: idx})
        } else {
          this.$store.dispatch('chat/delContact', {idx})
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
