<template>
  <ul id="audios">
    <li class="line" v-for="(item, index) in audiosArr" :key="index" @click.stop="chooseFile(item)">
      <div class="left">
        <AudioPlayer :item="item" class="player"></AudioPlayer>
        <span>{{item.name}}</span>
      </div>
      <span>{{item.time}}</span>
      <i>{{item.createTime}}</i>
      <Icon :item='item'></Icon>
    </li>
  </ul>
</template>
<script>
  // import {mapState} from 'vuex'
  export default {
    name: "audios",
    data() {
      return {}
    },
    props: ['audiosArr'],
    methods: {
      chooseFile(item) {
        this.$store.commit('chat/FILE_URLS', item)
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'
  .line
    flex_()
    >div
      flex:1
      setMiddle()
      .player
        border:none !important
    >span
      width:25%
    >i
      width:25%

  #audios
    .line
      relative()
      height: 55px
      border-bottom: 2px solid #f7f7f7
      >span, >i
        line-height:53px
</style>
