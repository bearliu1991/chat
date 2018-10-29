<template>
  <div id="videos">
    <ul class="cont">
      <li class="line" v-for="(item, index) in videosArr" :key="index" @click="chooseFile(item)" @dblclick="showDetailPop(item)">
        <div>
          <div class="wrap">
            <video :src="item.src" width="50px" height="35px" controls></video>
            <!-- <VideoPlayer :item='item'></VideoPlayer> -->
          </div>
          <span>jskjoweojh.mp4</span>
        </div>
        <span>未知时长</span>
        <i>2018年05月28日</i>
        <Icon :item="item"></Icon>
      </li>
    </ul>
    <SelfDefinePop v-model="showPop" v-if='showPop'>
      <DetailPop :sourceObj="sourceObj" :msgDatas="videosArr"></DetailPop>
    </SelfDefinePop>
  </div>
</template>

<script>
  // import {mapState} from 'vuex'
  export default {
    name: "index",
    data() {
      return {
        activeArr: [],
        showPop: false,
        sourceObj: null
      }
    },
    props: ['videosArr'],
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
<style lang="css">
  @import '../../../../assets/css/plugin.reset.css'
</style>
<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'
  .line
    flex_()
    relative()
    >div
      flex:1
    >span
      width:25%
    >i
      width:25%

  #videos
    .line
      height: 55px
      border-bottom: 2px solid #f7f7f7
      >span, >i
        line-height:53px
      >div
        setMiddle()
        height: 55px
        div
          relative()
          width: 80px
          height: 45px
          mr(10px)
          video
            object-fit: fill
            mt(10px)
          i
            absolute()
            vertical(20px)
            width: 20px
            top: 50%
            left: 50%
            bgColor(red)
            mt(-10px)
            ml(-10px)
            cursor()
</style>
