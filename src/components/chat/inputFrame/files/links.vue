<template>
  <div id="links">
    <div target="_blank" v-for="(item, idx) in linksArr" href="javascript:void(0)" 
    class="wrap" :key="idx + 'small'" @click.stop="chooseFile(item)">
      <PicText :data="item">
        <Icon :item='item'></Icon>
      </PicText>
    </div>
  </div>
</template>
<script>
  export default {
    name: "links",
    data() {
      return {
        list: []
      }
    },
    props: ['linksArr'],
    methods: {
      chooseFile(item) {
        this.$store.commit('chat/FILE_URLS', item)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'
  #links
    width: 100%
    height:100%
    .wrap
      fl()
      relative()
      ml(3%)
      width: 46%
      .bigIcon
        absolute()
        bottom:5px
        right:0
</style>
