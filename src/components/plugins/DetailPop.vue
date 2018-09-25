<template>
    <div id="detail_pop">
        <span class="close btn" @click="close">X</span>
        <i class="left_arrow arrow btn" :class="!hasPre && 'disable'" @click.stop='showOther(false)'>&lt;</i>
        <div class="img cursor">
          <img :width="imgWidth" ref="img" :src='obj.info' v-if="obj.msgType === 1" @mousewheel.stop="imgEnlarge($event)" @click.stop="nothing">
        </div>
        <div class="video cursor">
          <video :src="obj.info" controls v-if="obj.msgType === 4"></video>
        </div>
        <i class="right_arrow arrow btn" :class="!hasNext && 'disable'" @click.stop='showOther(true)'>&gt;</i>
    </div>
</template>

<script>
  // import { mapState } from 'vuex';
  export default {
    name: "detailPop",
    data() {
      return {
        imgWidth: 'auto',
        imgHeight: 'auto',
        step: 40,
        filterObj: null,
        hasPre: false,
        hasNext: false
      }
    },
    props: ['sourceObj', 'msgDatas'],
    computed: {
      obj () {
        if (this.filterObj) {
          return this.filterObj
        } 
        return this.sourceObj
      }
    },
    created() {
      this.btnDisable()
    },
    mounted() {
      this.imgWidth = this.$refs.img ? this.$refs.img.clientWidth : 100
    },
    methods: {
      nothing() {},
      // 查找上一个
      showOther(bool) {
        let allMsg = this.msgDatas
        let arr = []
        for (let val of allMsg) {
          if (val.msgType === 1 || (val.msgType === 4)) {
            arr.push(val)
          }
        }
        let idx = arr.findIndex((item) => item.id - 0 === this.obj.id)
        if (bool) {
          if (idx >= arr.length - 1) {
            return false
          } else {
            this.filterObj = arr[idx - 0 + 1]
            this.btnDisable()
          }
        } else {
          if (idx <= 0) {
            return false
          } else {
            this.filterObj = arr[idx - 1]
            this.btnDisable()
          }
        }
      },
      imgEnlarge(e) {
        let width = this.$refs.img.clientWidth
        let height = this.$refs.img.clientHeight
        let maxH = document.getElementsByTagName('body')[0].clientHeight
        let maxW = document.getElementsByTagName('body')[0].clientWidth
        if (e.deltaY < 0) {
          if (this.imgWidth <= maxW * 0.7 && (height <= maxH * 0.7)) {
            this.imgWidth = width + this.step
          } else {
            return false
          }
        } else {
          if (this.imgWidth >= maxW * 0.1 && (height >= maxH * 0.1)) {
            this.imgWidth = width - this.step
          } else {
            return false
          }
        }
      },
      close() {
        this.$emit('close', false)
      },
      btnDisable() {
        let allMsg = this.msgDatas
        let arr = []
        for (let key of Object.keys(allMsg)) {
          if (allMsg[key].msgType === 1 || (allMsg[key].msgType === 4)) {
            arr.push(allMsg[key])
          }
        }
        let idx = arr.findIndex((item) => item.id - 0 === this.obj.id)
        this.hasPre = idx > 0
        this.hasNext = idx < arr.length - 1
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'
  #detail_pop
    // width:70%
    // height:70%
    relative()
    .btn
      square(40px)
      bgColor(rgba(0, 0, 0, 0.5))
      radius(50px)
      color()
      cursor()
      &.disable
        color(#999)
    .close
      absolute()
      fn(40px)
      right -20px
      top:-20px
    .arrow
      absolute()
      top:50%
      mt(-20px)
      fn(40px)
    .left_arrow
      left -40px
    .right_arrow
      right -40px
</style>
