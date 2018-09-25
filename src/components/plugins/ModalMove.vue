<template>
  <div id="modal_move" ref="modal" :style="{left: left + 'px', top: top + 'px', width: parentW + 'px', height:parentH + 'px'}"
       @click="showMe">
    <div class="wrap">
      <div class="title" ref="title" @mousedown="frameMove" :style="{cursor: moveClass}">
        <ul class="controls">
          <li class="icon">口</li>
          <li class="icon">—</li>
          <li class="icon" @click.stop="hideModalChat">X</li>
        </ul>
      </div>
      <slot></slot>
    </div>
    <div class="resizeL" @mousedown="resize($event, true)"></div>
    <div class="resizeT" @mousedown="resize($event, false, true)"></div>
    <div class="resizeR" @mousedown="resize($event, false, false, true)"></div>
    <div class="resizeB" @mousedown="resize($event, false, false, false, true)"></div>
    <div class="resizeLT" @mousedown="resize($event, true, true)"></div>
    <div class="resizeTR" @mousedown="resize($event, false, true, true)"></div>
    <div class="resizeBR" @mousedown="resize($event, false, false, true, true)"></div>
    <div class="resizeLB" @mousedown="resize($event, true, false, false, true)"></div>
  </div>
</template>

<script>
  export default {
    name: "modalMove",
    data() {
      return {
        isDown: false,
        moveClass: 'move',
        left: 0,
        top: 0,
        modal: {},
        parentW: 700,
        parentH: 700,
        showModal: false,
        dragMinWidth: 600,
        dragMaxWidth: 1200,
        dragMinHeight: 600,
        dragMaxHeight: 1200
      }
    },
    props: ['activeIdx'],
    mounted () {
      this.init()
    },
    methods: {
      hideModalChat() {
        this.$store.commit('chat/CHAT_ID', this.activeIdx)
        this.$store.commit('chat/CLOSE_MODAL', this.activeIdx)
      },
      // 初始化弹窗位置
      init() {
        this.modal = this.getElem('modal')
        this.left = (document.documentElement.clientWidth - this.modal.offsetWidth) / 2
        this.top = (document.documentElement.clientHeight - this.modal.offsetHeight) / 2
      },
      // 获取元素
      getElem(refName) {
        return this.$refs[refName]
      },
      // 改变大小函数
      resize(evObj, isLeft, isTop, isRight, isBottom) {
        let handle = evObj.target
        let self = this
        handle.onmousedown = function (event) {
          let domEvent = event || window.event
          let downX = domEvent.clientX
          let downY = domEvent.clientY
          let temParentW = self.getElem('modal').clientWidth
          let temParentH = self.getElem('modal').clientHeight

          document.onmousemove = function (e) {
            let moveEvent = e || window.event
            let moveX = moveEvent.clientX - downX
            let moveY = moveEvent.clientY - downY

            if (isLeft || isRight) {
              self.parentW = isLeft ? temParentW - moveX : temParentW + moveX
              if (self.parentW < self.dragMinWidth || self.parentW > self.dragMaxWidth) {
                self.parentW = self.parentW < self.dragMinWidth ? self.dragMinWidth : self.dragMaxWidth
                // return false
              }
              self.left = isLeft && moveEvent.clientX
            }
            if (isTop || isBottom) {
              self.parentH = isTop ? temParentH - moveY : temParentH + moveY
              if (self.parentH < self.dragMinHeight || self.parentH > self.dragMaxHeight) {
                self.parentH = self.parentH < self.dragMinHeight ? self.dragMinHeight : self.dragMaxHeight
                // return false
              }
              self.top = isTop && moveEvent.clientY
            }
            return false
          }
          document.onmouseup = function () {
            document.onmousemove = null
            document.onmouseup = null
          }
          return false
        }
      },
      showMe() {
        this.$emit('setZindex', this.activeIdx)
      },
      frameMove(event) {
        let self = this
        let elem = this.modal
        this.isDown = true
        this.moveClass = 'move'
        let disX = event.clientX - elem.offsetLeft
        let disY = event.clientY - elem.offsetTop
        document.onmousemove = function (ev) {
          let oevent = ev || event
          let leftVal = oevent.clientX - disX
          let topVal = oevent.clientY - disY
          let maxLeft = document.getElementsByTagName('body')[0].clientWidth - elem.offsetWidth / 2
          let maxTop = document.getElementsByTagName('body')[0].clientHeight - 100
          leftVal + elem.offsetWidth / 2 < 0 && (leftVal = -elem.offsetWidth / 2)
          topVal + 30 < 0 && (topVal = -30)
          leftVal > maxLeft && (leftVal = maxLeft)
          topVal > maxTop && (topVal = maxTop)
          self.left = leftVal
          self.top = topVal
          return false
        }
        document.onmouseup = function () {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'
  #modal_move
    fixed()
    bgColor()
    boxShadow(0 0 5px 2px #ddd)
    z-index: 99
    .wrap
      radius(5px)
      padding: 10px
      padt(0)
      flex_()
      height:100%
      width: 100%
      flex-direction: column
      .title
        alignR()
        border-bottom: 1px solid #ddd
        .controls
          height:30px
          setEnd()
          li
            margin: 0 5px
            cursor()
            
  #modal_move
    .resizeL, .resizeT, .resizeR, .resizeB, .resizeLT, .resizeTR, .resizeLB, .resizeBR
      absolute()
      background: #000
      overflow: hidden
      opacity: 0
    .resizeL, .resizeR
      top: 0
      width: 20px
      height: 100%
      cursor(w-resize)
    .resizeL
      left: -10px
    .resizeR
      right: -10px
    .resizeT, .resizeB
      width: 100%
      height: 20px
      cursor(n-resize)
    .resizeT
      top: -10px
    .resizeB
      bottom: -10px
    .resizeLT, .resizeTR, .resizeLB
      width: 20px
      height: 20px
      background: #FF0
    .resizeLT
      top: -10px
      left: -10px
      cursor(nw-resize)
    .resizeTR
      top: -10px
      right: -10px
      cursor(ne-resize)
    .resizeLB
      left: -10px
      bottom: -10px
      cursor(ne-resize)
    .resizeBR
      right: -10px
      bottom: -10px
      width: 20px
      height: 20px
      cursor(nw-resize)
</style>
