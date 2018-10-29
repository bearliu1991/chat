<template>
    <div id="imgs">
      <div v-for="(item, idx) in imgsArr" :key="idx" class="wrap" @click.stop="chooseFile(item)" @dblclick.stop="showDetailPop(item)">
        <img :src="item.info">
        <Icon :item="item"></Icon>
      </div>
      <SelfDefinePop v-model="showPop" v-if='showPop'>
        <DetailPop :sourceObj="sourceObj" :msgDatas="imgsArr"></DetailPop>
      </SelfDefinePop>
    </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    name: "imgs",
    data() {
      return {
        showPop: false,
        sourceObj: null
      }
    },
    props: ['imgsArr'],
    computed: {
      ...mapState({
        fileUrls: state => state.chat.fileUrls
      })
    },
    methods: {
      showDetailPop(item) {
        this.showPop = true
        this.sourceObj = item
      },
      chooseFile(item) {
        this.$store.commit('chat/FILE_URLS', item)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'
  #imgs
    .wrap
      fl()
      width: 21%
      height:80px
      margin:2%
      relative()
      img
        height:100%
        width:100%
</style>
