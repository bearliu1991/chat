<template>
  <div id="media">
    <div class="title line">
      <div>名称</div>
      <span>时长</span>
      <i>创建时间</i>
    </div>
    <Audios v-if="comp === 'audio'" :audiosArr="audiosArr"></Audios>
    <Videos v-if="comp === 'video'" :videosArr="videosArr"></Videos>
  </div>
</template>

<script>
  import Videos from './videos'
  import Audios from './audios'
  export default {
    name: "media",
    data() {
      return {}
    },
    props: ['comp', 'audiosArr', 'videosArr'],
    mounted() {},
    components: {Videos, Audios},
    methods: {}
  }
</script>
<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'
  #media
    height: 340px
    center()
    relative()
    .title
      bgColor(#f9f9f9)
      vertical(30px)
    .line
      flex_()
      >div
        flex:1
      >span
        width:25%
      >i
        width:25%
</style>
